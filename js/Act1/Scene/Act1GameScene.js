class Act1GameScene extends BaseScene {
    constructor() {
        super(COMMON.ACT1GAMESCENE);

        // フラグの設定
        // マップ作成完了フラグ
        this.generateMapFlg = false;

    }

    create() {

        // マネージャの作成
        this.gameManager = new Act1GameManager(this);
        this.fieldManager = new FieldManager(this);

        // パラメータの初期化
        this.gameManager.initParameter();

        // マップの生成
        // マップとなるファイルの選択
        this.fieldManager.loadMapDataFromCsv();

        // マウスボタンが押されたときのイベントを設定
        this.input.on('pointerdown', this.mousePointerDown, this);

        // マウスボタンが離されたときのイベントを設定
        this.input.on('pointerup', this.mousePointerUp, this);

    }

    update() {
        // マップがロードされていない場合、処理を中止
        if (!this.fieldManager.hasMapData()) {
            return;
        }

        // マップからオブジェクトを生成する
        if (!this.generateMapFlg) {
            this.fieldManager.calcFieldSize();
            this.gameManager.generateAllObject(this.fieldManager.field);
            console.log("map generate complete");

            // カメラをプレイヤーに追従させる
            this.mainCamera = this.cameras.main;
            this.mainCamera.startFollow(this.gameManager.player, true);
            this.mainCamera.setBounds(0, 0, this.fieldManager.fieldWidth, this.fieldManager.fieldHeight);

            // プレイヤーの速度設定
            this.gameManager.player.body.setMaxVelocityX(CONST_ACT1.MAXSPEED.PLAYER);
            // プレイヤースプライトが境界線と衝突するように設定
            this.physics.world.setBounds(0, 0, this.fieldManager.fieldWidth, this.fieldManager.fieldHeight);
            this.gameManager.player.setCollideWorldBounds(true);

            this.generateMapFlg = true;
        }
    }

    mousePointerDown() {
        // クリック不可能な状態なら処理終了
        if (!this.generateMapFlg) {
            return;
        }
        let mouseX = this.input.activePointer.x;

        // 移動方向に加速する
        let moveDir = (mouseX <= SCR_WIDTH / 2) ? -1 : 1;

        this.gameManager.player.body.setAccelerationX(moveDir * CONST_ACT1.ACCELERATION.PLAYER);
    }

    mousePointerUp() {
        // クリック不可能な状態なら処理終了
        if (!this.generateMapFlg) {
            return;
        }
        let mouseX = this.input.activePointer.x;
        let mouseY = this.input.activePointer.y;
    }

}