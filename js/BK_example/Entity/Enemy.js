class Enemy extends PhysSprite {
    constructor(scene, x, y, type, texture) {
        super(scene, x, y, type, texture, CONST_ACT1.SIZE.ENEMY.WIDTH, CONST_ACT1.SIZE.ENEMY.HEIGHT);

        this.anims.create({
            key: CONST_ACT1.ANIMKEY.ENEMY_NORMAL,
            frames: this.anims.generateFrameNumbers(
                CONST_ACT1.IMGID.ANIM_ENEMY_NORMAL,
                { start: 0, end: CONST_ACT1.ANIMFRAMENUM.ENEMY_NORMAL }
            ),
            frameRate: CONST_ACT1.ANIMFRAMERATE.ENEMY_NORMAL,
            repeat: -1
        });

        this.anims.play(CONST_ACT1.ANIMKEY.ENEMY_NORMAL);

        // 各種フラグ
        this.isMoving = false;
        this.onGround = false;

        // ジャンプパワー
        this.jumpSpeed = CONST_ACT1.JUMPSPEED.ENEMY;
        // 向き
        this.flipX = false;

    }

    /**
     * 更新処理
     */
    update() {

    }

    /**
     * 方向転換する
     */
    changeDir() {
        this.flipX = !this.flipX;
        this.body.setVelocityX(-1 * this.body.velocity.x);
    }

    /**
     * ジャンプする
     */
    jump() {
        // 接地している場合にジャンプする
        if (this.onGround) {
            // 上方向に加速する
            this.body.setVelocityY(-this.jumpSpeed);
            this.onGround = false;
        }
    }

    /**
     * 移動を停止する
     */
    stopMovement() {
        this.isMoving = false;
        this.body.setVelocityX(0);
    }
}