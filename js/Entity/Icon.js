class Icon extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, type, row, col, grid) {
        super(scene, x, y, texture);
        scene.add.existing(this);

        // アイコンの種類
        this.type = type;

        //　アイコンの位置
        this.row = row;
        this.col = col;

        // グリッド
        /** @type {Grid} */
        this.grid = grid;

        // アイコンをタップしたときの処理を追加
        this.setInteractive();
        this.on('pointerdown', this.onIconClicked, this);
    }

    onIconClicked() {
        // アイコンがタップされたときの処理を追加
        this.grid.selectIcon(this.row, this.col, this.type);
    }
}
