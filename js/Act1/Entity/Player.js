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
        this.isMoving = false;
        this.onGround = false;

        // ジャンプパワー
        this.jumpSpeed = CONST_ACT1.JUMPSPEED.PLAYER;

    }

    /**
     * プレイヤーの更新処理
     */
    update() {
        // 動いていない場合
        if (!this.isMoving) {

            if (this.onGround) {
                // 接地している場合
                // 減速させる
                this.body.setDragX(CONST_ACT1.DRAG.PLAYER);
            } else {
                // 接地していない場合
                // 加速を中止する
                this.stopAcceleration();
            }

            // 最低速度を下回った場合、停止する
            if (Math.abs(this.body.velocity.x) < CONST_ACT1.MINSPEED.PLAYER) {
                this.body.setVelocityX(0);
            }
        }

        // console.log("ACCEL : " + this.body.acceleration.x);

        if (this.isMoving) {
            // console.log("moving : " + this.isMoving);
        }
        if (this.onGround) {
            // console.log("onGround : " + this.onGround);
        }
    }

    /**
     * 任意の方向に加速する
     * @param {int} _dir 加速方向
     */
    moveX(_dir) {
        // 減速率を0にする
        this.body.setDragX(1);
        // 加速する
        super.accelHorizontal(_dir, CONST_ACT1.ACCELERATION.PLAYER);
        // スプライトの向きの調整
        this.flipX = (_dir == CONST_ACT1.DIRECTION.LEFT);
    }

    /**
     * ジャンプする
     */
    jump() {
        if (this.onGround) {
            this.body.setVelocityY(-this.jumpSpeed);
            this.onGround = false;
        }
    }

    /**
     * 加速を終了する
     */
    stopAcceleration() {
        this.body.setAccelerationX(0);
    }
}