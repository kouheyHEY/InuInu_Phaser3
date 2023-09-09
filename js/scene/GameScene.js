class GameScene extends BaseScene {
    // コンストラクタ
    constructor() {
        super(COMMON_CONST.GAMESCENE);

        // 各パラメータ
        // ブロック（足場）リスト
        this.blockList = [];
        // スコア変数
        this.gameScore = 0;

        // 各フラグ
        // ゲームオーバーフラグ
        this.gameOverFlg = false;
        // ゲーム一時停止フラグ
        this.gamePauseFlg = false;
        // ゲームクリアフラグ
        this.gameClearFlg = false;
        // ゲーム開始フラグ
        this.gameStartFlg = false;

    }

    /**
     * 各パラメータの初期化
     */
    initParameters() {

        // アイテム管理クラス
        this.itemManager = new ItemManager(this);
        this.itemManager.initParams();

        // アイコン管理クラス
        this.iconManager = new IconManager(this);

        // ブロック（足場）リスト
        this.blockList = [];
        this.blockGroup = this.physics.add.group();

        // スコア
        this.gameScore = 0;

        // 地面管理クラス
        this.floorManager = new FloorManager(this);
        this.floorManager.initParams();
        // 床の初期化
        this.floorManager.addFloor();
        this.floorManager.addFloor();

        // プレイヤーの生成
        this.player = new Player(
            this,
            GSCONST.PLAYER_START_X,
            GSCONST.PLAYER_START_Y
        );

        // 敵の生成
        this.enemy = new Enemy(
            this,
            GSCONST.ENEMY_START_X,
            GSCONST.ENEMY_START_Y
        );

        // TODO: ゲーム開始フラグ
        this.gameStartFlg = true;
    }

    /**
     * このシーンで使用する画像の読み込みを行う
     */
    loadImg() { }

    preload() { }

    // 画面生成時の実行関数
    create() {
        // 各エリアを管理するオブジェクト
        this.infoArea = new InfoArea(this);
        this.gameArea = new GameArea(this);

        // 各エリアの描画
        this.infoArea.createArea();
        this.gameArea.createArea();

        // パラメータの初期化
        this.initParameters();

        // アニメーション設定
        this.player.setAnimation();
        // 敵
        this.enemy.setAnimation();

        // 衝突判定のハンドラ設定
        // 衝突はcollider, 重なりはoverlap
        this.physics.add.collider(this.player, this.floorManager.floorGroup, this.colHandlerMoverAndFloor, null, this);
        this.physics.add.overlap(this.player, this.itemManager.playerItemGroup, this.colHandlerMoverAndItem, null, this);
        this.physics.add.overlap(this.player, this.itemManager.enemyItemGroup, this.colHandlerMoverAndItem, null, this);

        this.physics.add.collider(this.enemy, this.floorManager.floorGroup, this.colHandlerMoverAndFloor, null, this);
        this.physics.add.overlap(this.enemy, this.itemManager.playerItemGroup, this.colHandlerMoverAndItem, null, this);
        this.physics.add.overlap(this.enemy, this.itemManager.enemyItemGroup, this.colHandlerMoverAndItem, null, this);

    }

    /**
     * プレイヤーまたは敵と地面の衝突判定
     * @param {Mover} mover プレイヤーまたは敵
     * @param {Phaser.GameObjects.Sprite} floor 地面
     */
    colHandlerMoverAndFloor(mover, floor) {
        mover.collideToFloor();
    }

    /**
     * プレイヤーまたは敵とアイテムの衝突判定
     * @param {Mover} mover プレイヤーまたは敵
     * @param {Item} item アイテム
     */
    colHandlerMoverAndItem(mover, item) {
        // 衝突時の処理
        let chgSpdAmt = mover.collideToItem(item);
        let isMoverPlayer = (mover instanceof Player);

        // アイテムを削除
        this.itemManager.deleteItem(item, true);

        if (mover instanceof Player) {
            // プレイヤーとの衝突の場合

            // スコアの素点
            let scoreBase = GSCONST.SCORE_BASE[item.texture.key];
            // プレイヤーの現在の位置からスコア補正を計算
            // 敵に近いほどスコア補正が大きくなる
            let scoreRate = Math.ceil(
                (GSCONST.LIMIT_X_PLAYER - mover.x) / (GSCONST.LIMIT_X_PLAYER / 4)
            );
            // スコアを計算
            this.gameScore += scoreBase * scoreRate;

            console.log("LIMIT:" + GSCONST.LIMIT_X_PLAYER);
            console.log("MOVER:" + mover.x);

            // スコアを更新して表示
            this.infoArea.updateScore(this.gameScore);

        } else if (mover instanceof Enemy) {
            // 敵との衝突の場合
            // プレイヤーの速度を変更
            this.player.speedChg(chgSpdAmt);
        }

        // 速度変化のアイコンID
        let iconID = (chgSpdAmt > 0) ?
            IMG_CONST.ICON.SPEEDUP : IMG_CONST.ICON.SPEEDDOWN;

        // 速度変化のアイコンをプレイヤーの右上に表示
        this.iconManager.dispIcon(this.player, iconID);

    }

    update(time, delta) {
        // ゲーム開始している場合
        if (this.gameStartFlg) {

            // 地面の更新処理
            this.floorManager.update();
            // アイテムの更新処理
            this.itemManager.update();
            // プレイヤーの更新処理
            this.player.update();
            // アイコンの更新処理
            this.iconManager.update();

            // 画面内のどこかがクリックされた場合
            this.input.on('pointerdown', function (pointer) {
                // プレイヤーがジャンプする
                this.player.jump();
            }, this);
        }

        // ゲームオーバーの場合
        if (this.gameOverFlg) {

        }
        // ゲームクリアした場合
        if (this.gameClearFlg) {

        }
    }
};