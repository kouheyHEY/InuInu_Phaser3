class Act1GameScene extends BaseScene {
    constructor() {
        super(COMMON.ACT1GAMESCENE);
    }

    create() {

        // ゲームマネージャの作成
        this.gameManager = new Act1GameManager(this);
        this.gameManager.initParameter();

        // 物理演算を有効化する
        // phaser.physics.startSystem(Phaser.Physics.ARCADE);

        // TODO: DEBUG
        let mapName = FileUtil.getFileName();
    }

    update() {
        // ゲームのメインの更新処理
    }
}