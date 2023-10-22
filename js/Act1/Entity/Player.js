class Player extends PhysSprite {
    constructor(scene, x, y, type, texture) {
        super(scene, x, y, type, texture, CONST_ACT1.SIZE.PLAYER.WIDTH, CONST_ACT1.SIZE.PLAYER.HEIGHT);

        this.anims.create({
            key: CONST_ACT1.ANIMKEY.PLAYER_STOP,
            frames: this.anims.generateFrameNumbers(
                CONST_ACT1.IMGID.ANIM_PLAYER_STOP,
                { start: 0, end: CONST_ACT1.ANIMFRAMENUM.PLAYER_STOP }
            ),
            frameRate: CONST_ACT1.ANIMFRAMERATE.PLAYER_STOP,
            repeat: -1
        });

        this.anims.play(CONST_ACT1.ANIMKEY.PLAYER_STOP);

        // 減速の方法の初期設定
        this.body.setDamping(true);

        // 動いているかどうか
        this.moving = false;

    }

    update() {
        // プレイヤーの更新処理
        if (!this.moving) {
            // 減速させる
            this.body.setDragX(CONST_ACT1.DRAG.PLAYER);

            if (Math.abs(this.body.velocity.x) < CONST_ACT1.MINSPEED.PLAYER) {
                this.body.setVelocityX(0);
            }
        }
    }

    /**
     * 任意の方向に加速する
     * @param {int} _dir 加速方向
     */
    moveX(_dir) {
        super.accelHorizontal(_dir, CONST_ACT1.ACCELERATION.PLAYER);
        this.flipX = (_dir == CONST_ACT1.DIRECTION.LEFT);
    }

    /**
     * 加速を終了する
     */
    stopAcceleration() {
        this.body.setAccelerationX(0);
    }
}