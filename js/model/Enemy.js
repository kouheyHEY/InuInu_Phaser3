class Enemy extends Mover {
    /**
     * コンストラクタ
     * @param {Phaser.Scene} scene シーン名
     * @param {int} x 初期x座標
     * @param {int} y 初期y座標
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy');

        // 敵の物理エンジンの設定
        scene.physics.world.enable(this);
        scene.add.existing(this);
        // 物理演算エリアの設定
        this.body.setSize(GSCONST.ENEMY_WIDTH, GSCONST.ENEMY_HEIGHT);
        this.body.setOffset(0, 0);

        // 画面外に出ないよう設定
        this.body.setCollideWorldBounds(true);
        // 重力の設定
        this.body.gravity.y = GSCONST.GRAVITY;

        // 敵の初期速度の設定
        this.speed = 0;
        this.jumpSpeed = GSCONST.ENEMY_JUMP_SPEED;

        // 各フラグ
        this.onGroundFlg = false;
    }

    /**
     * 右への移動処理
     */
    moveRight() {
        this.body.setVelocityX(this.speed);
    }

    setAnimation() {
        // アニメーション設定
        this.anims.create({
            key: ANIM_CONST.ENEMY_RIGHT_ANIM,
            frames: this.anims.generateFrameNumbers(
                IMG_CONST.ENEMY_RIGHT,
                { start: 0, end: 1 }
            ),
            frameRate: 15,
            repeat: -1
        });

        // 敵のアニメーションを再生する
        this.anims.play(ANIM_CONST.ENEMY_RIGHT_ANIM);
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
     * 敵と地面の衝突判定
     * @param {Enemy} enemy 敵
     * @param {Phaser.GameObjects.Sprite} floor 地面
     */
    collideToFloor() {
        if (!this.onGroundFlg) {
            // 敵のy方向速度を0にする
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
     * 敵とアイテムの衝突判定
     * @param {Item} item アイテム
     * @return chdSpdAmt プレイヤーの速度変化量
     */
    collideToItem(item) {
        let itemName = item.texture.key;
        let chgSpdAmt = 0;

        if (itemName == IMG_CONST.BREAD) {
            // パンと衝突した場合
            // プレイヤーのスピードダウン
            chgSpdAmt = -GSCONST.CHG_SPEED_RATE;
        } else if (itemName == IMG_CONST.MINICOW) {
            // ミニ牛と衝突した場合
            // プレイヤーのスピードアップ
            chgSpdAmt = GSCONST.CHG_SPEED_RATE;
        } else if (itemName == IMG_CONST.BREADCRUMS) {
            // パン粉と衝突した場合
            // プレイヤーのスピードアップ
            chgSpdAmt = GSCONST.CHG_SPEED_RATE;
        } else if (itemName == IMG_CONST.MILK) {
            // ミルクと衝突した場合
            // プレイヤーのスピードダウン
            chgSpdAmt = -GSCONST.CHG_SPEED_RATE;
        }

        return chgSpdAmt;
    }

    update() {
        // 着地時
        if (this.onGroundFlg) {
            // y方向速度を0にする
            this.body.setVelocityY(0);
        }
    }

}