class Grid {
    constructor(scene, numRows, numCols) {
        this.scene = scene;
        this.numRows = numRows;
        this.numCols = numCols;
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
        let gridX = (SCR_WIDTH - this.numCols * ICON.WIDTH) / 2;
        let gridY = (SCR_HEIGHT - this.numRows * ICON.HEIGHT) / 2;
        // グリッドにアイコンを配置する処理を追加
        for (let row = 0; row < this.numRows; row++) {
            let iconsTmp = [];
            let deleteFlgTmp = [];
            for (let col = 0; col < this.numCols; col++) {
                const x = col * ICON.WIDTH + gridX + ICON.WIDTH / 2;
                const y = row * ICON.HEIGHT + gridY + ICON.HEIGHT / 2;

                // ランダムなアイコンの種類を取得
                const iconType = this.getRandomIconType();
                // アイコンを配列に追加
                const icon = new Icon(this.scene, x, y, ICONTYPE[iconType], iconType, row, col, this);
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
     * @returns アイコンのタイプ
     */
    getRandomIconType() {
        let typeNum = ICONTYPE.length;
        return Math.floor(Math.random() * typeNum);
    }

    selectIcon(_selectRow, _selectCol) {
    }

}
