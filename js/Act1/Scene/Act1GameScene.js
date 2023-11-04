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

        // プレイヤーのSPゲージの表示
        this.playerSPBarBG = this.add.graphics();
        this.playerSPBarBG.fillStyle(CONST_ACT1.PLAYER_SPBAR.BGCOLOR, 0.8);
        this.playerSPBarBG.fillRect(
            CONST_ACT1.PLAYER_SPBAR.X,
            CONST_ACT1.PLAYER_SPBAR.Y,
            CONST_ACT1.PLAYER_SPBAR.WIDTH,
            CONST_ACT1.PLAYER_SPBAR.HEIGHT
        );
        this.ui.add(this.playerSPBarBG);

        this.playerSPBar = this.add.graphics();
        this.ui.add(this.playerSPBar);

        this.playerSPLabel = this.setText(
            CONST_ACT1.PLAYER_SPBAR.LABEL,
            CONST_ACT1.PLAYER_SPBAR.LABELX,
            CONST_ACT1.PLAYER_SPBAR.LABELY,
            CONST_ACT1.PLAYER_SPBAR.LABELSIZE,
            CONST_ACT1.PLAYER_SPBAR.LABELCOLOR,
        );
        this.playerSPLabel.setFontFamily(CONST_ACT1.COMMON_ACT1.FONTSTYLE_NORMAL);
        this.ui.add(this.playerSPLabel);

        // プレイヤーのレベルの表示
        this.playerLevel = this.setText(
            CONST_ACT1.PLAYER_LEVEL.LABEL,
            CONST_ACT1.PLAYER_LEVEL.LABELX,
            CONST_ACT1.PLAYER_LEVEL.LABELY,
            CONST_ACT1.PLAYER_LEVEL.LABELSIZE,
            CONST_ACT1.PLAYER_LEVEL.LABELCOLOR,
        );
        this.playerLevel.setFontFamily(CONST_ACT1.COMMON_ACT1.FONTSTYLE_NORMAL);
        this.ui.add(this.playerLevel);

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
            this.uiCamera.ignore(this.gameManager.noseEffect);
            this.uiCamera.ignore(this.gameManager.playerWeapon);

            // プレイヤースプライトが境界線と衝突するように設定
            this.physics.world.setBounds(0, 0, this.fieldManager.fieldWidth, this.fieldManager.fieldHeight);
            this.gameManager.player.setCollideWorldBounds(true);

            this.generateMapFlg = true;
            return;
        }

        // 各スプライトの状態の更新
        this.gameManager.updateObjects();

        // プレイヤーのスキルゲージの更新
        let playerSP = this.gameManager.player.sp;
        this.playerSPBar.clear();

        let spBarWidth = (playerSP / this.gameManager.player.maxSp) * CONST_ACT1.PLAYER_SPBAR.WIDTH;
        this.playerSPBar.fillStyle(CONST_ACT1.PLAYER_SPBAR.COLOR);
        this.playerSPBar.fillRect(
            CONST_ACT1.PLAYER_SPBAR.X,
            CONST_ACT1.PLAYER_SPBAR.Y,
            spBarWidth,
            CONST_ACT1.PLAYER_SPBAR.HEIGHT
        );
        // プレイヤーのレベルの表示
        this.playerLevel.setText(CONST_ACT1.PLAYER_LEVEL.LABEL + `${this.gameManager.player.level}`);

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

                this.gameManager.player.usingSkillNose = false;
            } else {
                // 移動を停止する
                this.gameManager.player.stopMovement();
                // スキルを使用する
                this.gameManager.player.useSkillNose();
            }
        }

        // プレイヤー以外のオブジェクトの更新
        // アイテムの数が一定数未満になった場合
        if (this.gameManager.itemGroup.getLength() < CONST_ACT1.ITEMNUM_MIN) {
            // 新たにアイテムを生成
            this.gameManager.generateItem(this.fieldManager.field, Phaser.Math.RND.pick(CONST_ACT1.ITEMTYPELIST));
            this.uiCamera.ignore(this.gameManager.itemGroup);
        }

        // 敵の数が一定数未満になった場合
        if (this.gameManager.enemyGroup.getLength() < this.gameManager.enemyNum) {
            // 新たに敵を生成
            this.gameManager.generateEnemy(this.fieldManager.field);
            this.uiCamera.ignore(this.gameManager.enemyGroup);
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
     * ポインタを初回描画する
     */
    drawPointer() {
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

        // ポインタの描画
        this.drawPointer();

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

        // プレイヤーの移動を停止する
        this.gameManager.player.stopMovement();
        // スキル使用フラグを変更する
        this.gameManager.player.usingSkillNose = false;
        // ポインタの状態を変更
        this.pointerDown = false;
    }
}