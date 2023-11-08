class Act1PreLoadScene extends BaseScene {
    /**
     * コンストラクタ
     */
    constructor() {
        super(COMMON.ACT1PRELOADSCENE);

        // 各画像の画像IDとファイル名のリスト
        this.preLoadImgList = [
            [CONST_ACT1.IMGID.GROUND_BLOCK_NORMAL, CONST_ACT1.IMGNAME.GROUND_BLOCK_NORMAL],
            [CONST_ACT1.IMGID.GROUND_INSIDE, CONST_ACT1.IMGNAME.GROUND_INSIDE],
            [CONST_ACT1.IMGID.GROUND_OUTSIDE, CONST_ACT1.IMGNAME.GROUND_OUTSIDE],
            [CONST_ACT1.IMGID.ITEM_FOOD, CONST_ACT1.IMGNAME.ITEM_FOOD],
            [CONST_ACT1.IMGID.ICON_SKILL_1, CONST_ACT1.IMGNAME.ICON_SKILL_1],
            [CONST_ACT1.IMGID.ICON_ARROW_1, CONST_ACT1.IMGNAME.ICON_ARROW_1],
            [CONST_ACT1.IMGID.WEAPON_BONE, CONST_ACT1.IMGNAME.WEAPON_BONE],
            [CONST_ACT1.IMGID.EFFECT_LEVELUP, CONST_ACT1.IMGNAME.EFFECT_LEVELUP],
        ];
    }

    /**
     * Act1GameSceneで使用する画像やスプライトシートを読み込む
     */
    preload() {
        // SCR_WIDTHとSCR_HEIGHTの更新
        SCR_WIDTH = phaser.scale.width;
        SCR_HEIGHT = phaser.scale.height;

        // 各画像の読み込み
        this.preLoadImgList.forEach(img => {
            this.load.image(img[0], CONST_ACT1.DIR.DIR_IMG + "/" + img[1]);
        });

        // 各スプライトシートの読み込み
        // プレイヤーアニメーション
        this.load.spritesheet(
            CONST_ACT1.IMGID.ANIM_PLAYER_STOP,
            CONST_ACT1.DIR.DIR_IMG + "/" + CONST_ACT1.IMGNAME.ANIM_PLAYER_STOP,
            {
                frameWidth: CONST_ACT1.SIZE.PLAYER.WIDTH,
                frameHeight: CONST_ACT1.SIZE.PLAYER.HEIGHT
            }
        );
        // 敵アニメーション
        this.load.spritesheet(
            CONST_ACT1.IMGID.ANIM_ENEMY_NORMAL,
            CONST_ACT1.DIR.DIR_IMG + "/" + CONST_ACT1.IMGNAME.ANIM_ENEMY_NORMAL,
            {
                frameWidth: CONST_ACT1.SIZE.ENEMY.WIDTH,
                frameHeight: CONST_ACT1.SIZE.ENEMY.HEIGHT
            }
        );

        // プリロード中に表示するプログレスバーの背景
        this.progressBarBg = this.add.graphics();
        this.progressBarBg.fillStyle(CONST_ACT1.PRELOADBAR.BGCOLOR, 0.8);
        this.progressBarBg.fillRect(
            (SCR_WIDTH - CONST_ACT1.PRELOADBAR.WIDTH) / 2,
            (SCR_HEIGHT - CONST_ACT1.PRELOADBAR.HEIGHT) / 2,
            CONST_ACT1.PRELOADBAR.WIDTH,
            CONST_ACT1.PRELOADBAR.HEIGHT
        );

        // プリロード中に表示するプログレスバー
        this.progressBar = this.add.graphics();

        // プリロードイベントのリスナーを追加
        this.load.on('progress', (value) => {
            this.updateProgressBar(value);
        });

        // デバッグ用
        // 非同期で待機する例（3秒待機）
        this.wait(3000).then(() => {
            // 待機後の処理
            console.log('END LOADING RESOURCES!');
            // ゲームシーンに遷移
            this.scene.start(COMMON.ACT1GAMESCENE);
        });

    }

    // 非同期で待機するカスタム関数（デバッグ用）
    wait(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }

    updateProgressBar(value) {
        // プログレスバーを更新する
        this.progressBar.clear();
        this.progressBar.fillStyle(CONST_ACT1.PRELOADBAR.COLOR, 1);
        this.progressBar.fillRect(
            (SCR_WIDTH - CONST_ACT1.PRELOADBAR.WIDTH) / 2,
            (SCR_HEIGHT - CONST_ACT1.PRELOADBAR.HEIGHT) / 2,
            CONST_ACT1.PRELOADBAR.WIDTH * value,
            CONST_ACT1.PRELOADBAR.HEIGHT
        );
    }

    create() {
    }

    update() {
    }
}