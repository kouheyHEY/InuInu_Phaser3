class Icon extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, type, row, col, grid = null, clickable = true) {
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

        this.clickable = clickable

        // アイコンをタップしたときの処理を追加
        this.setInteractive();
        this.on('pointerdown', this.onIconClicked, this);

        // アイテムかどうかを判別
        this.isItem = false;
    }

    onIconClicked() {
        // アイコンがタップされたときの処理を追加
        if (this.clickable) {
            this.grid.selectIcon(this.row, this.col, this.type);
        }
    }

    setThisItem() {
        this.isItem = true;
    }
}
