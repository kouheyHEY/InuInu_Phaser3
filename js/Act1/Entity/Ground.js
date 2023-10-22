class Ground extends PhysSprite {
    constructor(scene, x, y, type, texture) {
        super(scene, x, y, type, texture, CONST_ACT1.SIZE.GROUND.WIDTH, CONST_ACT1.SIZE.GROUND.HEIGHT);

        // 重力の設定
        this.body.setGravityY(0);
    }

    update() {
        // 更新処理
    }
}