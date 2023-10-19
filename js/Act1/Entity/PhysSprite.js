class PhysSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type, texture) {
        super(scene, x, y, texture);

        // スプライトのタイプ
        this.type = type;

    }

    /**
     * 更新処理を行う
     */
    update() {

    }
}