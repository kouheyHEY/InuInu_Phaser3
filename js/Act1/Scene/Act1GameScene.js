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

            // プレイヤースプライトが境界線と衝突するように設定
            this.physics.world.setBounds(0, 0, this.fieldManager.fieldWidth, this.fieldManager.fieldHeight);
            this.gameManager.player.setCollideWorldBounds(true);

            this.generateMapFlg = true;
            return;
        }

        // プレイヤーの更新
        this.gameManager.player.update();
    }

    mousePointerDown() {
        // クリック不可能な状態なら処理終了
        if (!this.generateMapFlg) {
            return;
        }
        let mouseX = this.input.activePointer.x;

        // 画面の左半分をクリックした場合、左方向に加速する
        let moveDir = (mouseX <= SCR_WIDTH / 2) ? CONST_ACT1.DIRECTION.LEFT : CONST_ACT1.DIRECTION.RIGHT;
        this.gameManager.player.moveX(moveDir);

        this.gameManager.player.moving = true;
    }

    mousePointerUp() {
        // クリック不可能な状態なら処理終了
        if (!this.generateMapFlg) {
            return;
        }
        let mouseX = this.input.activePointer.x;
        let mouseY = this.input.activePointer.y;

        this.gameManager.player.moving = false;
        this.gameManager.player.stopAcceleration();
    }

}