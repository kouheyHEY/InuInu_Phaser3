class Grid {
    constructor(scene, numRows, numCols, gameManager) {
        /** @type {GameScene} */
        this.scene = scene;
        this.numRows = numRows;
        this.numCols = numCols;

        this.gridX = (SCR_WIDTH - this.numCols * ICON.WIDTH) / 2;
        this.gridY = (SCR_HEIGHT - this.numRows * ICON.HEIGHT) / 2;

        /** @type {GameManager} */
        this.gameManager = gameManager;
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

        console.log(this.deleteFlg[1][0]);
    }

    /**
     * ランダムなアイコンのタイプを取得する
     * @returns アイコンのタイプ
     */
    getRandomIconType() {
        let typeNum = ICONTYPE.length;
        return Math.floor(Math.random() * typeNum);
    }

    /**
     * 消去された場所にアイコンを生成する
     */
    generateIcons() {
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                if (this.icons[i][j] == null) {
                    let newIcon = this.createIcon(i, j, this.getRandomIconType(), true);
                    this.icons[i][j] = newIcon;

                    // フェードイン
                    this.scene.tweens.add({
                        targets: newIcon,
                        alpha: 1,
                        y: newIcon.y + ICONFADEIN.YDIST,
                        duration: ICONFADEIN.TIME,
                        ease: 'Power2',
                    }, this.scene);
                }
            }
        }
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

        let icon = new Icon(this.scene, x, y, ICONTYPE[_iconType], _iconType, _row, _col, this);

        // フェードインする場合
        if (_fadeIn) {
            icon.y = y - ICONFADEIN.YDIST;
            icon.setAlpha(0);
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

        let item = new Icon(this.scene, x, y, ITEMTYPE[_itemType], _itemType, _row, _col, this);

        // フェードインする場合
        if (_fadeIn) {
            item.y = y - ICONFADEIN.YDIST;
            item.setAlpha(0);
        }
        return item;
    }

    /**
     * 消去するアイコンの配列を設定し、消去する
     * @param {int} _selectRow アイコンの行
     * @param {int} _selectCol アイコンの列
     * @param {int} _type アイコンのタイプ
     */
    selectIcon(_selectRow, _selectCol, _type) {
        // 消去不可の場合は何もしない
        if (!this.canDelete) {
            return;
        }

        let deleteType = _type;
        let deleteIconNum = 0;

        this.deleteFlg[_selectRow][_selectCol] = 1;
        this.setDeleteFlg(_selectRow, _selectCol, _type, true, 0);

        // アイコンを消去する
        deleteIconNum = this.deleteIcons();

        // アイコン落下アニメーションの再生
        setTimeout(() => {
            this.fallIcons();
        }, ICONDELETE.TIME / 2);

        this.gameManager.countDeleteDog(deleteType, deleteIconNum);

        // アイコンを生成する
        // setTimeout(() => {
        //     this.generateIcons();
        // }, ICONDELETE.TIME + ICONFALL.TIME);
        setTimeout(() => {
            this.generateIcons();
        }, ICONFALL.TIME);
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
                        let targetY = (i + moveRow) * ICON.HEIGHT + this.gridY + ICON.HEIGHT / 2;
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
     * アイコンの消去を再帰的に判断する
     * @param {int} _selectRow アイコンの行
     * @param {int} _selectCol アイコンの列
     * @param {int} _type アイコンのタイプ
     * @param {boolean} _isParent 呼び出し元かどうか
     * @param {int} _deleteNum アイコンの消去数
     * @returns アイコンの消去数
     */
    setDeleteFlg(_selectRow, _selectCol, _type, _isParent = true, _deleteNum) {
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

                // 上下左右の隣接したアイコンの場合
                if (i == 0 ^ j == 0) {
                    // すでにフラグが設定済みの場合
                    if (this.deleteFlg[checkRow][checkCol] == 1) {
                        continue;
                    }

                    // 消去アイコンとタイプが同じアイコンの場合
                    if (this.icons[checkRow][checkCol].type == _type) {
                        this.deleteFlg[checkRow][checkCol] = 1;
                        this.setDeleteFlg(checkRow, checkCol, _type, false, _deleteNum + 1);
                    }
                }
            }
        }

        // 呼び出し元でなければ返却
        if (!_isParent) {
            return _deleteNum;
        }

        console.log(_deleteNum);

        if (_deleteNum >= ITEM_ICON_NUM) {
            this.deleteFlg[checkRow][checkCol] = 0;

            // アイテムを生成
            let item = this.createItem(checkRow, checkCol, ITEMTYPE_ID.ITEM_BONE_SINGLE, true);
            item.setThisItem();

            // アイコンがあった場所をアイテムに変更
            let selectIcon = this.icons[checkRow][checkCol];
            this.icons[checkRow][checkCol] = item;
            selectIcon.destroy();

            console.log("TEST");
        }
    }

    /**
     * 消去フラグ配列に基づいてアイコンを消去する
     * @returns 消去したアイコンの数
     */
    deleteIcons() {
        let deleteNum = 0;
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                if (this.deleteFlg[i][j] == 1) {
                    this.deleteFlg[i][j] = 0;

                    let deleteIcon = this.icons[i][j];
                    this.icons[i][j] = null;

                    // 消去時アニメーションの設定
                    this.scene.tweens.add({
                        targets: deleteIcon,
                        alpha: 0,
                        duration: ICONDELETE.TIME,
                        ease: 'Power2',
                    }, this.scene);

                    // 消去時アニメーションが終了次第アイコンを消去
                    setTimeout(() => {
                        deleteIcon.destroy();
                    }, ICONDELETE.TIME);

                    deleteNum++;
                }
            }
        }

        return deleteNum;
    }
}
