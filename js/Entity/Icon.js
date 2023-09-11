class Icon extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, type) {
        super(scene, x, y, texture);
        scene.add.existing(this);

        // アイコンの種類
        this.type = type;

        // アイコンをタップしたときの処理を追加
        this.setInteractive();
        this.on('pointerdown', this.onIconClicked, this);
    }

    onIconClicked() {
        // アイコンがタップされたときの処理を追加
        // 例: GameManager.checkSelection(this.type);
    }
}
