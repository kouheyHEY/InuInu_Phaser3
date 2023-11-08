class EffectSprite extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, type) {
        super(scene, x, y, texture);

        this.scene.add.existing(this);

        // エフェクトのタイプ
        this.type = type;
    }
}