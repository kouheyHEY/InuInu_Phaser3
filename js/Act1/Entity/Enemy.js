class Enemy extends PhysSprite {
    constructor(scene, x, y, type, texture) {
        super(scene, x, y, type, texture, CONST_ACT1.SIZE.ENEMY.WIDTH, CONST_ACT1.SIZE.ENEMY.HEIGHT);

        // 各種フラグ
        this.isMoving = false;
        this.onGround = false;

        // ジャンプパワー
        this.jumpSpeed = CONST_ACT1.JUMPSPEED.ENEMY;

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
            }

            // 最低速度を下回った場合、停止する
            if (Math.abs(this.body.velocity.x) < CONST_ACT1.MINSPEED.PLAYER) {
                this.body.setVelocityX(0);
            }
        } else {
            // 動いている最中はHPを減少させる
            this.consumeHP(CONST_ACT1.HPCOST.MOVE);
        }

        // スキル使用不可状態の場合
        if (!this.usableSkillNose) {
            // 時間経過でSPを回復させる
            this.recoverSP(CONST_ACT1.SPRECOVER.TIME);
        }

        if (this.sp >= this.maxSp) {
            // SPが回復しきったら、スキル使用可能フラグの更新
            this.usableSkillNose = true;
        }
    }

    /**
     * 任意の方向に加速する
     * @param {int} _dir 加速方向
     */
    moveX(_dir) {
        // フラグを設定する
        this.isMoving = true;
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
        // 接地している場合にジャンプする
        if (this.onGround) {
            // エネルギーを消費する
            this.consumeHP(CONST_ACT1.HPCOST.JUMP);
            // 上方向に加速する
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

    /**
     * 移動を停止する
     */
    stopMovement() {
        this.isMoving = false;
        this.stopAcceleration();
    }

    /**
     * hpを、最大値を上限として回復する
     * @param {int} _amount 回復量
     */
    recoverHP(_amount) {
        this.hp = Math.min(this.maxHp, this.hp + _amount);
    }
    /**
     * hpを、最低値を下限として消費する
     * @param {int} _amount 消費量
     */
    consumeHP(_amount) {
        this.hp = Math.max(0, this.hp - _amount);
    }

    /**
     * spを、最大値を上限として回復する
     * @param {int} _amount 回復量
     */
    recoverSP(_amount) {
        this.sp = Math.min(this.maxSp, this.sp + _amount);
    }
    /**
     * spを、最低値を下限として消費する
     * @param {int} _amount 消費量
     */
    consumeSP(_amount) {
        this.sp = Math.max(0, this.sp - _amount);
    }

    /**
     * スキル「ノーズ」を使用する
     * @returns {boolean} スキルが使用できなかった場合false
     */
    useSkillNose() {
        if (this.usableSkillNose) {
            console.log("USE SKILL NOSE");
            this.consumeSP(CONST_ACT1.SPCOST.NOSE);

            if (!this.usingSkillNose) {
                this.usingSkillNose = true;
            }

            if (this.sp <= 0) {
                // スキル使用可能フラグの更新
                this.usableSkillNose = false;
                // スキル使用フラグの更新
                this.usingSkillNose = false;
            }
        }
    }

}