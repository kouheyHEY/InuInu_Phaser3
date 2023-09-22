class Grid {
    constructor(scene, numRows, numCols) {
        this.scene = scene;
        this.numRows = numRows;
        this.numCols = numCols;
        this.icons = [];

        // グリッドの初期化
        this.initGrid();
        this.createGrid();
    }

    initGrid() {
        this.icons = [];
    }

    createGrid() {
        let gridX = (SCR_WIDTH - this.numCols * ICON.WIDTH) / 2;
        let gridY = (SCR_HEIGHT - this.numRows * ICON.HEIGHT) / 2;
        // グリッドにアイコンを配置する処理を追加
        for (let row = 0; row < this.numRows; row++) {
            let iconsTmp = [];
            for (let col = 0; col < this.numCols; col++) {
                const x = col * ICON.WIDTH + gridX + ICON.WIDTH / 2;
                const y = row * ICON.HEIGHT + gridY + ICON.HEIGHT / 2;

                // ランダムなアイコンの種類を取得
                const iconType = this.getRandomIconType();

                const icon = new Icon(this.scene, x, y, ICONTYPE[iconType], iconType, row, col, this);
                iconsTmp.push(icon);
            }
            this.icons.push(iconsTmp);
        }
    }

    getRandomIconType() {
        let typeNum = ICONTYPE.length;
        return Math.floor(Math.random() * typeNum);
    }


}
