class Player extends Mover {
    /**
     * コンストラクタ
     * @param {Phaser.Scene} scene シーン名
     * @param {int} x 初期x座標
     * @param {int} y 初期y座標
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        // プレイヤーの物理エンジンの設定
        scene.physics.world.enable(this);
        scene.add.existing(this);
        // 物理演算エリアの設定
        this.body.setSize(GSCONST.PLAYER_WIDTH, GSCONST.PLAYER_HEIGHT);
        this.body.setOffset(0, 0);

        // 画面外に出ないよう設定
        this.body.setCollideWorldBounds(true);
        // 重力の設定
        this.body.gravity.y = GSCONST.GRAVITY;

        // プレイヤーの初期速度の設定
        this.speed = 0;
        this.jumpSpeed = GSCONST.PLAYER_JUMP_SPEED;

        // 各フラグ
        this.onGroundFlg = false;
    }

    setAnimation() {
        // アニメーション設定
        this.anims.create({
            key: ANIM_CONST.PLAYER_RIGHT_ANIM,
            frames: this.anims.generateFrameNumbers(
                IMG_CONST.PLAYER_RIGHT,
                { start: 0, end: 3 }
            ),
            frameRate: 10,
            repeat: -1
        });

        // プレイヤーのアニメーションを再生する
        this.anims.play(ANIM_CONST.PLAYER_RIGHT_ANIM);
    }

    /**
     * ジャンプする
     */
    jump() {
        // 着地している場合
        if (this.onGroundFlg) {
            this.onGroundFlg = false;
            this.body.setVelocityY(-this.jumpSpeed);
        }
    }

    /**
     * プレイヤーと地面の衝突判定
     */
    collideToFloor() {
        if (!this.onGroundFlg) {
            // プレイヤーのy方向速度を0にする
            this.onGroundFlg = true;
        }
    }

    /**
     * 移動速度の変更処理
     * @param {int} chgSpdAmt 速度の変化量
     */
    speedChg(chgSpdAmt) {
        this.speed += chgSpdAmt;
        this.body.setVelocityX(this.speed);
    }

    /**
     * プレイヤーとアイテムの衝突判定
     * @param {Item} item アイテム
     * @return {int} spdChgAmt スピードの変化量
     */
    collideToItem(item) {
        let itemName = item.texture.key;
        let spdChgAmt = 0;

        if (itemName == IMG_CONST.BREAD) {
            // パンと衝突した場合
            // スピードアップ
            this.speedChg(GSCONST.CHG_SPEED_RATE);
            spdChgAmt = GSCONST.CHG_SPEED_RATE;
        } else if (itemName == IMG_CONST.MINICOW) {
            // ミニ牛と衝突した場合
            // スピードダウン
            this.speedChg(-GSCONST.CHG_SPEED_RATE);
            spdChgAmt = -GSCONST.CHG_SPEED_RATE;
        } else if (itemName == IMG_CONST.BREADCRUMS) {
            // パン粉と衝突した場合
            // スピードダウン
            this.speedChg(-GSCONST.CHG_SPEED_RATE);
            spdChgAmt = -GSCONST.CHG_SPEED_RATE;
        } else if (itemName == IMG_CONST.MILK) {
            // ミルクと衝突した場合
            // スピードアップ
            this.speedChg(GSCONST.CHG_SPEED_RATE);
            spdChgAmt = GSCONST.CHG_SPEED_RATE;
        }

        return spdChgAmt;
    }

    update() {
        // 着地時
        if (this.onGroundFlg) {
            // y方向速度を0にする
            this.body.setVelocityY(0);
        }
        // 限界まで前進した場合
        if (this.x > GSCONST.LIMIT_X_PLAYER) {
            // 速度を0にする
            this.speed = 0;
            this.body.setVelocityX(this.speed);
            // 座標を調整する
            this.x = GSCONST.LIMIT_X_PLAYER;
        }
    }

}