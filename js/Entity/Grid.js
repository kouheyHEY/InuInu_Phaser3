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
        // グリッドにアイコンを配置する処理を追加
        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.numCols; col++) {
                const x = col * iconWidth; // アイコンの幅を考慮
                const y = row * iconHeight; // アイコンの高さを考慮
                const iconType = getRandomIconType(); // ランダムなアイコンの種類を取得

                const icon = new Icon(this.scene, x, y, iconType);
                this.icons.push(icon);
            }
        }
    }

    getRandomIconType() {
        // ランダムなアイコンの種類を取得する処理を追加
    }


}
