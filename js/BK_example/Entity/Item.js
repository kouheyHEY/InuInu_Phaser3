class Item extends PhysSprite {
    constructor(scene, x, y, type, texture) {
        super(scene, x, y, type, texture, CONST_ACT1.SIZE.ITEM.WIDTH, CONST_ACT1.SIZE.ITEM.HEIGHT);

        this.body.setGravityY(CONST_ACT1.GRAVITY);
    }

    update() {
        // 更新処理
    }
}