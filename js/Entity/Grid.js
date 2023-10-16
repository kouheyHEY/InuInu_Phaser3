class Grid {
    constructor(scene, numRows, numCols, pzl1GameManager) {
        /** @type {Pzl1GameScene} */
        this.scene = scene;
        this.numRows = numRows;
        this.numCols = numCols;

        this.gridX = (SCR_WIDTH - this.numCols * ICON.WIDTH) / 2;
        this.gridY = (SCR_HEIGHT - this.numRows * ICON.HEIGHT) / 2;

        /** @type {Pzl1GameManager} */
        this.pzl1GameManager = pzl1GameManager;
        this.icons = [];

        // 消去可能フラグ
        this.canDelete = true;

        // 消去済フラグの配列
        this.deleteFlg = [];

        // グリッドの初期化
        this.initGrid();
        this.createGrid();
    }

    /**
     * グリッドを初期化する
     */
    initGrid() {
        this.icons = [];
        this.deleteFlg = [];
    }

    /**
     * グリッドを生成する
     */
    createGrid() {
        // グリッドにアイコンを配置する処理を追加
        for (let row = 0; row < this.numRows; row++) {
            let iconsTmp = [];
            let deleteFlgTmp = [];
            for (let col = 0; col < this.numCols; col++) {

                // アイコンを配列に追加
                const icon = this.createIcon(row, col, this.getRandomIconType());
                iconsTmp.push(icon);

                // アイコンの消去フラグ配列を初期化
                deleteFlgTmp.push(0);
            }
            this.icons.push(iconsTmp);
            this.deleteFlg.push(deleteFlgTmp);
        }

    }

    /**
     * ランダムなアイコンのタイプを取得する
     * @returns アイコンのタイプ（犬のみ）
     */
    getRandomIconType() {
        return Math.floor(Math.random() * DOG_NUM);
    }

    /**
     * 消去するアイコンの配列を設定し、消去する
     * @param {int} _selectRow アイコンの行
     * @param {int} _selectCol アイコンの列
     * @param {int} _type アイコンのタイプ
     */
    async selectIcon(_selectRow, _selectCol, _type) {
        // 消去不可の場合は何もしない
        if (!this.canDelete) {
            return;
        }

        // 選択したアイコン
        let selectedIcon = this.icons[_selectRow][_selectCol];

        // 消去処理中は消去不可にする
        this.canDelete = false;

        // 自身を消去する
        this.deleteFlg[_selectRow][_selectCol] = 1;

        // アイコン削除用フラグの設定
        let deleteResult = this.setDeleteFlg(_selectRow, _selectCol, _type);
        let createItemFlg = deleteResult.createBoneSingleFlg || deleteResult.createBoneDoubleFlg;

        // アイテム消去時、エフェクトを適用する
        if (Pzl1GameManager.isItem(selectedIcon.type)
            && !createItemFlg
        ) {
            // エフェクトアニメーションの再生
            this.scene.tweens.add({
                targets: selectedIcon,
                scale: ITEMDELETE.SCALE,
                duration: ITEMDELETE.TIME,
                ease: 'Power1',
            }, this.scene);
            await this.wait(ITEMDELETE.TIME);
        }

        // アイコンを消去する
        this.deleteIcons(_selectRow, _selectCol, createItemFlg);

        // アイテムを生成する
        if (deleteResult.createBoneSingleFlg) {
            this.generateItem(_selectRow, _selectCol, ITEMTYPE_ID.ITEM_BONE_SINGLE);
        }
        if (deleteResult.createBoneDoubleFlg) {
            this.generateItem(_selectRow, _selectCol, ITEMTYPE_ID.ITEM_BONE_DOUBLE);
        }

        // アイテムを生成する場合
        // アイコン落下アニメーションの再生
        setTimeout(() => {
            this.fallIcons();
        }, ICONDELETE.TIME / 2);

        // アイコンを生成する
        // setTimeout(() => {
        //     this.generateIcons();
        // }, ICONDELETE.TIME + ICONFALL.TIME);
        setTimeout(() => {
            this.generateIcons();
        }, ICONFALL.TIME);

        // 消去可能に戻す
        setTimeout(() => {
            this.canDelete = true;
        }, DELETE_INTERVAL);
    }

    /**
     * アイコンの消去を再帰的に判断する
     * @param {int} _selectRow アイコンの行
     * @param {int} _selectCol アイコンの列
     * @param {int} _type 消去するアイコンのタイプ
     * @returns {Object} returnResult 削除フラグ設定結果
     * @returns {int} returnResult.deleteNum 削除数
     * @returns {boolean} returnResult.createBoneSingleFlg BoneSingleアイテム生成用フラグ
     * @returns {boolean} returnResult.createBoneDoubleFlg BoneDoubleアイテム生成用フラグ
     */
    setDeleteFlg(_selectRow, _selectCol, _type) {
        let returnResult = {
            deleteNum: 0,
            createBoneSingleFlg: false,
            createBoneDoubleFlg: false,
        };

        // アイテムがBoneDoubleの場合、ランダムに数種類のアイコンを消去する
        if (_type == ITEMTYPE_ID.ITEM_BONE_DOUBLE) {
            // 消去タイプの配列を生成する
            let deleteTypeList = [];


            // 消去するタイプをランダムに決定する
            while (deleteTypeList.length < DELETE_TYPE_NUM.ITEM_BONE_DOUBLE) {
                // 消去するタイプを、盤面上のアイコンのタイプから決定
                let rndRow = Math.floor(Math.random() * this.numRows);
                let rndCol = Math.floor(Math.random() * this.numCols);
                let deleteType = this.icons[rndRow][rndCol].type;

                // アイテムならやり直し
                if (Pzl1GameManager.isItem(deleteType)) {
                    continue;
                }

                // 消去するタイプが重複していればやり直し
                if (deleteTypeList.includes(deleteType)) {
                    continue;
                }

                // 消去タイプの配列に消去タイプを追加する
                deleteTypeList.push(deleteType);
            }

            // アイコンを消去する
            deleteTypeList.forEach(type => {
                this.setDeleteFlgOfType(type);
            });

            return returnResult;
        }


        for (let i = -1; i <= 1; i++) {
            let checkRow = _selectRow + i;
            // 範囲外だった場合
            if (checkRow < 0 || checkRow >= this.numRows) {
                continue;
            }

            for (let j = -1; j <= 1; j++) {
                let checkCol = _selectCol + j;
                // 範囲外だった場合
                if (checkCol < 0 || checkCol >= this.numCols) {
                    continue;
                }

                let deleteIconType = this.icons[checkRow][checkCol].type;

                if (Pzl1GameManager.isItem(_type)) {
                    // 消去アイコンがアイテムの場合

                    if (i == 0 && j == 0) {
                        continue;
                    }

                    // アイテムがBoneSingleの場合
                    if (_type == ITEMTYPE_ID.ITEM_BONE_SINGLE) {
                        // 自分自身の周囲はすべて消去する
                        this.deleteFlg[checkRow][checkCol] = 1;

                        // 同じアイテムが上下左右に隣接している場合
                        if (
                            deleteIconType == ITEMTYPE_ID.ITEM_BONE_SINGLE &&
                            (i == 0 ^ j == 0)
                        ) {
                            // BoneDoubleを生成するフラグを設定する
                            returnResult.createBoneDoubleFlg = true;

                        }
                    }
                } else {
                    // 消去アイコンが犬の場合

                    // 上下左右の隣接したアイコンの場合
                    if (i == 0 ^ j == 0) {
                        // すでにフラグが設定済みの場合
                        if (this.deleteFlg[checkRow][checkCol] == 1) {
                            continue;
                        }

                        // 消去アイコンとタイプが同じアイコンの場合
                        if (this.icons[checkRow][checkCol].type == _type) {
                            this.deleteFlg[checkRow][checkCol] = 1;
                            returnResult.deleteNum++;
                            returnResult.deleteNum += this.setDeleteFlg(checkRow, checkCol, _type).deleteNum;
                        }
                    }

                }
            }
        }

        // アイテムの生成フラグの設定
        returnResult.createBoneSingleFlg =
            (returnResult.deleteNum + 1 >= ICON_NUM.ITEM_BONE_SINGLE)
            && !Pzl1GameManager.isItem(_type);

        // 消去結果を返却
        return returnResult;
    }

    /**
     * 消去フラグ配列に基づいてアイコンを消去する
     * @param {int} _selectRow タップしたアイコンの行
     * @param {int} _selectCol タップしたアイコンの列
     * @param {boolean} _createItemFlg アイテム生成フラグ
     * @returns 消去したアイコンの数
     */
    deleteIcons(_selectRow, _selectCol, _createItemFlg) {
        // 消去数
        let deleteNum = 0;

        let selectIconX = this.icons[_selectRow][_selectCol].x;
        let selectIconY = this.icons[_selectRow][_selectCol].y;

        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                if (this.deleteFlg[i][j] == 1) {
                    this.deleteFlg[i][j] = 0;

                    /** @type {Icon} */
                    let deleteIcon = this.icons[i][j];

                    // アイコン消去時の移動先の座標
                    let targetX = deleteIcon.x;
                    let targetY = deleteIcon.y;

                    // 消去したアイコンをカウントする
                    this.pzl1GameManager.countDeleteDog(deleteIcon.type, 1);

                    if (_createItemFlg) {
                        // アイテムを生成する場合

                        // 消去と同時にアイテムの場所に移動させる
                        targetX = selectIconX;
                        targetY = selectIconY;

                    } else {
                        if (i == _selectRow && j == _selectCol && Pzl1GameManager.isItem(deleteIcon.type)) {
                            // アイテム消去エフェクトの前に、スケールをもとに戻す

                            // 一旦tweenを停止
                            let targetTween = this.scene.tweens.getTweensOf(deleteIcon)[0];
                            if (targetTween) {
                                targetTween.stop();
                            }

                            // スケールをもとに戻す
                            deleteIcon.setScale(1);

                        }
                        // アニメーションを開始する
                        deleteIcon.startAnimation();

                    }

                    // 消去時アニメーションの設定
                    this.scene.tweens.add({
                        targets: deleteIcon,
                        x: targetX,
                        y: targetY,
                        alpha: 0,
                        duration: ICONDELETE.TIME,
                        ease: 'Power2',
                    }, this.scene);

                    // 消去時アニメーションが終了次第アイコンを消去
                    setTimeout(() => {
                        deleteIcon.destroy();
                    }, ICONDELETE.TIME);

                    this.icons[i][j] = null;

                    deleteNum++;
                }
            }
        }

        return deleteNum;
    }

    /**
     * 消去された場所にアイコンを生成する
     */
    generateIcons() {
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {

                // アイコンがすでにある場合
                if (this.icons[i][j] != null) {
                    continue;
                }

                let newIcon = this.createIcon(i, j, this.getRandomIconType(), true);
                this.icons[i][j] = newIcon;

                // フェードイン
                this.scene.tweens.add({
                    targets: newIcon,
                    alpha: 1,
                    scale: 1,
                    y: newIcon.y + ICONFADEIN.YDIST,
                    duration: ICONFADEIN.TIME,
                    ease: 'Power2',
                }, this.scene);

            }
        }
    }

    /**
     * 指定した場所にアイテムを生成する
     * 
     */
    generateItem(_itemRow, _itemCol, _itemType) {

        // アイテムを生成
        let item = this.createItem(_itemRow, _itemCol, _itemType, true);
        item.setAlpha(0);

        this.icons[_itemRow][_itemCol] = item;

        // アイテムをフェードイン
        this.scene.tweens.add({
            targets: item,
            alpha: 1,
            scale: 1,
            duration: ICONFADEIN.TIME,
            ease: 'Power2',
        }, this.scene);

    }

    /**
     * アイコンを所定の位置に生成する
     * @param {int} _row 生成する行
     * @param {int} _col 生成する列
     * @param {int} _iconType アイコンの種類
     * @param {boolean} _fadeIn フェードインするか
     * @returns 生成したアイコン
     */
    createIcon(_row, _col, _iconType, _fadeIn = false) {

        let x = _col * ICON.WIDTH + this.gridX + ICON.WIDTH / 2;
        let y = _row * ICON.HEIGHT + this.gridY + ICON.HEIGHT / 2;

        // アイコンの設定をする
        let icon = new Icon(this.scene, x, y, ICONTYPE[_iconType], _iconType, _row, _col, this);
        // アニメーションの設定をする
        icon.setAnimation();

        // フェードインする場合
        if (_fadeIn) {
            icon.y = y - ICONFADEIN.YDIST;
            icon.setAlpha(0);
            icon.setScale(0.5);
        }
        return icon;
    }

    /**
     * アイテムを所定の位置に生成する
     * @param {int} _row 生成する行
     * @param {int} _col 生成する列
     * @param {int} _itemType アイテムの種類
     * @param {boolean} _fadeIn フェードインするか
     * @returns 生成したアイコン
     */
    createItem(_row, _col, _itemType, _fadeIn = false) {
        let x = _col * ICON.WIDTH + this.gridX + ICON.WIDTH / 2;
        let y = _row * ICON.HEIGHT + this.gridY + ICON.HEIGHT / 2;

        let item = new Icon(this.scene, x, y, ICONTYPE[_itemType], _itemType, _row, _col, this);
        // アニメーションの設定をする
        item.setAnimation();

        // フェードインする場合
        if (_fadeIn) {
            // item.y = y - ICONFADEIN.YDIST;
            item.setAlpha(0);
            item.setScale(0.1);
        }
        return item;
    }

    /**
     * アイコンを下方向へ移動させる
     */
    fallIcons() {
        for (let i = this.numRows - 1; i >= 0; i--) {
            for (let j = 0; j < this.numCols; j++) {
                /** @type {Icon} */
                let icon = this.icons[i][j];
                if (icon) {
                    // 移動先の座標
                    let moveRow = 0;
                    for (let iconRow = i + 1; iconRow < this.numRows; iconRow++) {
                        if (this.icons[iconRow][j] == null) {
                            moveRow++;
                        } else {
                            break;
                        }
                    }

                    // 移動する場合
                    if (moveRow > 0) {
                        // 移動先の座標
                        let targetY = icon.y + moveRow * ICON.HEIGHT;

                        // アニメーションの設定
                        this.scene.tweens.add({
                            targets: icon,
                            y: targetY,
                            duration: ICONFALL.TIME,
                            ease: 'Power2',
                        }, this.scene);

                        // アイコンの座標の変更
                        icon.row = i + moveRow;
                        this.icons[i + moveRow][j] = icon;
                        this.icons[i][j] = null;
                    }
                }
            }
        }
    }

    /**
     * 特定のタイプのアイコンの消去フラグを設定する
     * @param {int} _type 消去するアイコンのタイプ
     */
    setDeleteFlgOfType(_type) {
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                if (this.icons[i][j].type == _type) {
                    this.deleteFlg[i][j] = 1;
                }
            }
        }
    }

    /**
     * 一定時間待機する
     * @param {int} ms 待機時間
     */
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
