class BgIcon extends Phaser.GameObjects.Container {
    /**
     * 任意の場所に背景オブジェクトを生成する
     * @param {Phaser.scene} scene シーン
     * @param {int} x x座標
     * @param {int} y y座標
     * @param {string} texture イメージ
     * @param {int} color 背景色（16進数）
     */
    constructor(scene, x, y, texture, color) {
        super(scene, x, y);

        // 長方形のオブジェクト
        let rectangle = scene.add.graphics();
        rectangle.fillStyle(color);
        // 中心が (0, 0) にくるように調整
        rectangle.fillRoundedRect(
            -CONST_STT1.SIZE.BGICON.WIDTH / 2,
            -CONST_STT1.SIZE.BGICON.HEIGHT / 2,
            CONST_STT1.SIZE.BGICON.WIDTH,
            CONST_STT1.SIZE.BGICON.HEIGHT,
            CONST_STT1.SIZE.BGICON.ROUND
        );

        // 画像
        let image = scene.add.image(0, 0, texture);
        image.setOrigin(0.5, 0.5);

        // Containerに追加
        this.add(rectangle);
        this.add(image);

        // グループにContainerを追加
        scene.add.existing(this);
    }
}
