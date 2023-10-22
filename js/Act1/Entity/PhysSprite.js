class PhysSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type, texture, width, height) {
        super(scene, x, y, texture);

        // 物理演算の有効化
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        // 重力の設定
        this.body.setGravityY(CONST_ACT1.GRAVITY);

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

    /**
     * 移動を停止する
     */
    stop() {
        // 速度を０にする
        this.body.setVelocity(0, 0);
    }

    /**
     * 任意の方向に加速する（水平方向）
     */
    accelHorizontal(_dir, _speed) {
        this.body.setAccelerationX(_dir * _speed);
    }
}