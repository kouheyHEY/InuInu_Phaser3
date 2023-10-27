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

        // ui要素の作成
        this.ui = this.add.group();

        // プレイヤーのHPゲージの表示
        this.playerHPBarBG = this.add.graphics();
        this.playerHPBarBG.fillStyle(CONST_ACT1.PLAYER_HPBAR.BGCOLOR, 0.8);
        this.playerHPBarBG.fillRect(
            CONST_ACT1.PLAYER_HPBAR.X,
            CONST_ACT1.PLAYER_HPBAR.Y,
            CONST_ACT1.PLAYER_HPBAR.WIDTH,
            CONST_ACT1.PLAYER_HPBAR.HEIGHT
        );
        this.ui.add(this.playerHPBarBG);

        this.playerHPBar = this.add.graphics();
        this.ui.add(this.playerHPBar);

        this.playerHPLabel = this.setText(
            CONST_ACT1.PLAYER_HPBAR.LABEL,
            CONST_ACT1.PLAYER_HPBAR.LABELX,
            CONST_ACT1.PLAYER_HPBAR.LABELY,
            CONST_ACT1.PLAYER_HPBAR.LABELSIZE,
            CONST_ACT1.PLAYER_HPBAR.LABELCOLOR,
        );
        this.playerHPLabel.setFontFamily(CONST_ACT1.COMMON_ACT1.FONTSTYLE_NORMAL);
        this.ui.add(this.playerHPLabel);

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

            this.mainCamera.ignore(this.ui);

            // ui用のカメラも作成する
            this.uiCamera = this.cameras.add(0, 0, SCR_WIDTH, SCR_HEIGHT);

            this.uiCamera.ignore(this.gameManager.player);
            this.uiCamera.ignore(this.gameManager.enemyGroup);
            this.uiCamera.ignore(this.gameManager.groundGroup);
            this.uiCamera.ignore(this.gameManager.itemGroup);

            // プレイヤースプライトが境界線と衝突するように設定
            this.physics.world.setBounds(0, 0, this.fieldManager.fieldWidth, this.fieldManager.fieldHeight);
            this.gameManager.player.setCollideWorldBounds(true);

            this.generateMapFlg = true;
            return;
        }

        // プレイヤーの更新
        this.gameManager.player.update();

        // プレイヤーのHPゲージの更新
        let playerHP = this.gameManager.player.hp;
        this.playerHPBar.clear();

        let hpBarWidth = (playerHP / this.gameManager.player.maxHp) * CONST_ACT1.PLAYER_HPBAR.WIDTH;
        this.playerHPBar.fillStyle(CONST_ACT1.PLAYER_HPBAR.COLOR);
        this.playerHPBar.fillRect(
            CONST_ACT1.PLAYER_HPBAR.X,
            CONST_ACT1.PLAYER_HPBAR.Y,
            hpBarWidth,
            CONST_ACT1.PLAYER_HPBAR.HEIGHT
        );
    }

    /**
     * 画面をクリックした時の挙動
     */
    mousePointerDown() {
        // クリック不可能な状態なら処理終了
        if (!this.generateMapFlg) {
            return;
        }
        // 座標を取得
        let mouseX = this.input.activePointer.x;

        // 画面の左半分をクリックした場合、左方向に加速する
        let moveDir = (mouseX <= SCR_WIDTH / 2) ? CONST_ACT1.DIRECTION.LEFT : CONST_ACT1.DIRECTION.RIGHT;
        this.gameManager.player.moveX(moveDir);

        // プレイヤーが動いている間のフラグをオンにする
        this.gameManager.player.isMoving = true;
    }

    /**
     * 画面からクリックを離した時の挙動
     */
    mousePointerUp() {
        // クリック不可能な状態なら処理終了
        if (!this.generateMapFlg) {
            return;
        }

        // 座標を取得
        let mouseX = this.input.activePointer.x;
        let mouseY = this.input.activePointer.y;

        // 画面の上半分でマウスをリリースした場合、ジャンプする
        if (mouseY <= SCR_HEIGHT / 2) {
            this.gameManager.player.jump();
        }

        // プレイヤーが動いている間のフラグをオフにする
        this.gameManager.player.isMoving = false;
        // 加速を中止する
        this.gameManager.player.stopAcceleration();
    }

}