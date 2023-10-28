class Act1GameScene extends BaseScene {
    constructor() {
        super(COMMON.ACT1GAMESCENE);

        // フラグの設定
        // マップ作成完了フラグ
        this.generateMapFlg = false;
        this.drawPointerFlg = false;

    }

    create() {

        // 各種キーの設定
        this.keys = {
            space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        }

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

        // マウスの状態
        this.pointerDown = false;

        // マウスクリック時のアンカーの変数を設定
        this.anchorPoint = new Phaser.Math.Vector2(0, 0);
        // アンカーの位置に図形を表示
        this.anchorPointUI = this.add.graphics();
        this.ui.add(this.anchorPointUI);
        // アンカー表示のtween
        this.anchorTween = null;

        // ポインタの位置に図形を表示
        this.pointerUI = this.add.graphics();
        this.ui.add(this.pointerUI);
        // ポインタ表示のtween
        this.pointerTween = null;

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

        // スペースキー押下時にジャンプ
        if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
            this.gameManager.player.jump();
        }

        // マウスが押されている場合
        if (this.pointerDown) {
            let curPointer = new Phaser.Math.Vector2(this.input.activePointer.x, this.input.activePointer.y);

            // アンカーポイントと現在の座標との距離を計算
            let mouseDist = Phaser.Math.Distance.BetweenPoints(this.anchorPoint, curPointer);
            if (mouseDist >= CONST_ACT1.POINTER_ACT_DIST) {
                // 画面の左半分をクリックしている場合、左方向に加速する
                let moveDir = (curPointer.x <= this.anchorPoint.x) ? CONST_ACT1.DIRECTION.LEFT : CONST_ACT1.DIRECTION.RIGHT;
                this.gameManager.player.moveX(moveDir);
            } else {
                // 移動を停止する
                this.gameManager.player.stopMovement();
            }
        }

        // UI描画の更新
        this.drawUI();
    }

    /**
     * UIカメラに、UI要素を描画する
     */
    drawUI() {
        // ポインタの描画

        if (this.drawPointerFlg) {
            // 描画をクリア
            this.pointerUI.clear();
            // ポインタの描画
            let pointerCirc = new Phaser.Geom.Circle(this.input.activePointer.x, this.input.activePointer.y, CONST_ACT1.POINTER.RADIUS);
            this.pointerUI.fillStyle(CONST_ACT1.POINTER.COLOR, CONST_ACT1.POINTER.ALPHA);
            this.pointerUI.lineStyle(CONST_ACT1.POINTER.WEIGHT, CONST_ACT1.POINTER.COLOR);
            this.pointerUI.fillCircleShape(pointerCirc);
            this.pointerUI.strokeCircleShape(pointerCirc);
        }
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
        this.anchorPoint.set(this.input.activePointer.x, this.input.activePointer.y);

        // サイズを大きくしつつフェードインする
        this.anchorTween = this.tweens.add({
            targets: { radius: 0, alpha: 0 },
            radius: CONST_ACT1.POINTER_ANCHOR.RADIUS,
            alpha: 1,
            duration: CONST_ACT1.POINTER_ANCHOR.FADEINTIME,
            ease: 'Power2',
            onUpdate: (tween) => {
                let target = tween.targets[0];
                let anchorCirc = new Phaser.Geom.Circle(this.anchorPoint.x, this.anchorPoint.y, target["radius"]);

                // 描画をクリア
                this.anchorPointUI.clear();

                // アンカーポインタの描画
                this.anchorPointUI.fillStyle(CONST_ACT1.POINTER_ANCHOR.COLOR, CONST_ACT1.POINTER_ANCHOR.ALPHA);
                this.anchorPointUI.lineStyle(CONST_ACT1.POINTER_ANCHOR.WEIGHT, CONST_ACT1.POINTER_ANCHOR.COLOR);
                this.anchorPointUI.fillCircleShape(anchorCirc);
                this.anchorPointUI.strokeCircleShape(anchorCirc);

                this.anchorPointUI.setAlpha(target["alpha"]);
            },
            onComplete: () => {
                this.drawPointerFlg = true;
            },
        });
        this.pointerTween = this.tweens.add({
            targets: { radius: 0, alpha: 0 },
            radius: CONST_ACT1.POINTER.RADIUS,
            alpha: 1,
            duration: CONST_ACT1.POINTER.FADEINTIME,
            ease: 'Power2',
            onUpdate: (tween) => {
                let target = tween.targets[0];
                let pointerCirc = new Phaser.Geom.Circle(this.input.activePointer.x, this.input.activePointer.y, target["radius"]);

                // 描画をクリア
                this.pointerUI.clear();

                // アンカーポインタの描画
                this.pointerUI.fillStyle(CONST_ACT1.POINTER.COLOR, CONST_ACT1.POINTER.ALPHA);
                this.pointerUI.lineStyle(CONST_ACT1.POINTER.WEIGHT, CONST_ACT1.POINTER.COLOR);
                this.pointerUI.fillCircleShape(pointerCirc);
                this.pointerUI.strokeCircleShape(pointerCirc);

                this.pointerUI.setAlpha(target["alpha"]);
            }
        });

        // プレイヤーが動いている間のフラグをオンにする
        this.gameManager.player.isMoving = true;

        // 画面クリック時に再度クリックでジャンプ
        if (this.pointerDown) {
            // ジャンプする
            this.gameManager.player.jump();
        }

        // ポインタの状態を変更
        this.pointerDown = true;
    }

    /**
     * 画面からクリックを離した時の挙動
     */
    mousePointerUp() {
        // クリック不可能な状態なら処理終了
        if (!this.generateMapFlg) {
            return;
        }

        // アンカーの図形をクリア
        this.anchorPointUI.clear();
        // アンカーのアニメーションを中止
        if (this.anchorTween != null) {
            this.anchorTween.stop();
        }

        // ポインタの図形をクリア
        this.pointerUI.clear();
        // ポインタのアニメーションを中止
        if (this.pointerTween != null) {
            this.pointerTween.stop();
        }
        this.drawPointerFlg = false;

        // 座標を取得
        let mouseX = this.input.activePointer.x;
        let mouseY = this.input.activePointer.y;

        // 画面の上半分でマウスをリリースした場合、ジャンプする
        // if (mouseY <= SCR_HEIGHT / 2) {
        //     this.gameManager.player.jump();
        // }

        // プレイヤーの移動を停止する
        this.gameManager.player.stopMovement();
        // ポインタの状態を変更
        this.pointerDown = false;
    }

}