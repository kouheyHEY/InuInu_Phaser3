class PhysSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type, texture, width, height) {
        super(scene, x, y, texture);

        // 物理演算の有効化
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        // スプライトのタイプ
        this.type = type;

        this.body.setSize(width, height);
        this.body.setOffset(0, 0);

    }

    /**
     * 更新処理を行う
     */
    update() {

    }
}