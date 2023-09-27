class Grid {
    constructor(scene, numRows, numCols, gameManager) {
        this.scene = scene;
        this.numRows = numRows;
        this.numCols = numCols;
        /** @type {GameManager} */
        this.gameManager = gameManager;
        this.icons = [];
        // 消去フラグの配列
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
                    this.icons[i][j] = this.createIcon(i, j, this.getRandomIconType());
                }
            }
        }
    }

    /**
     * アイコンを所定の位置に生成する
     * @param {int} _row 生成する行
     * @param {int} _col 生成する列
     * @param {int} _iconType アイコンの種類
     * @returns 生成したアイコン
     */
    createIcon(_row, _col, _iconType) {
        let gridX = (SCR_WIDTH - this.numCols * ICON.WIDTH) / 2;
        let gridY = (SCR_HEIGHT - this.numRows * ICON.HEIGHT) / 2;

        let x = _col * ICON.WIDTH + gridX + ICON.WIDTH / 2;
        let y = _row * ICON.HEIGHT + gridY + ICON.HEIGHT / 2;

        let icon = new Icon(this.scene, x, y, ICONTYPE[_iconType], _iconType, _row, _col, this);
        return icon;
    }

    /**
     * 消去するアイコンの配列を設定し、消去する
     * @param {int} _selectRow アイコンの行
     * @param {int} _selectCol アイコンの列
     * @param {int} _type アイコンのタイプ
     */
    selectIcon(_selectRow, _selectCol, _type) {
        let deleteType = _type;
        let deleteIconNum = 0;

        this.deleteFlg[_selectRow][_selectCol] = 1;
        this.setDeleteFlg(_selectRow, _selectCol, _type);

        // アイコンを消去する
        deleteIconNum = this.deleteIcons();

        this.gameManager.countDeleteDog(deleteType, deleteIconNum);

        // アイコンを生成する
        this.generateIcons();
    }

    /**
     * アイコンの消去を再帰的に判断する
     * @param {int} _selectRow アイコンの行
     * @param {int} _selectCol アイコンの列
     * @param {int} _type アイコンのタイプ
     */
    setDeleteFlg(_selectRow, _selectCol, _type) {
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
                        this.setDeleteFlg(checkRow, checkCol, _type);
                    }

                }
            }
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
                    deleteIcon.destroy();
                    deleteNum++;
                }
            }
        }

        return deleteNum;
    }

}