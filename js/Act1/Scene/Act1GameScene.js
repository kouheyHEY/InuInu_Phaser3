class Act1GameScene extends BaseScene {
    constructor() {
        super(COMMON.ACT1GAMESCENE);

        // 物理演算を有効化する
        this.physics.startSystem(Phaser.Physics.ARCADE);
    }

    create() {
        // プレイヤーの作成
        this.player = new Player(
            this,
            CONST_ACT1.SIZE.PLAYER.WIDTH, 100, CONST_ACT1.SPRITETYPE.PLAYER, CONST_ACT1.IMGID.ANIM_PLAYER_STOP);
        // スプライトに物理プロパティを設定
        this.physics.arcade.enable(sprite1);
    }

    update() {
        // ゲームのメインの更新処理
    }
}