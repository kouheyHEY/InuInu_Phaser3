class PreLoadScene extends BaseScene {
    /**
     * コンストラクタ
     */
    constructor() {
        super({ key: COMMON.PRELOADSCENE });
    }

    /**
     * GameSceneで使用する画像やスプライトシートを読み込む
     */
    preload() {
        // 各画像の読み込み
        this.load.image(IMGID.DOG_SHIBA, DIR.DIR_IMG + "/" + IMGNAME.DOG_SHIBA);
        this.load.image(IMGID.DOG_PAG, DIR.DIR_IMG + "/" + IMGNAME.DOG_PAG);

        // 各スプライトシートの読み込み
        // プレイヤー
        // this.load.spritesheet(
        //     IMG.PLAYER_RIGHT,
        //     DIR.DIR_IMG + "/" + IMGNAME.PLAYER_RIGHT,
        //     {
        //         frameWidth: GSCONST.PLAYER_WIDTH,
        //         frameHeight: GSCONST.PLAYER_HEIGHT
        //     }
        // );

        // プリロード中に表示するプログレスバーの背景
        this.progressBarBg = this.add.graphics();
        this.progressBarBg.fillStyle(PRELOADBAR.BGCOLOR, 0.8);
        this.progressBarBg.fillRect(
            (COMMON.D_WIDTH - PRELOADBAR.WIDTH) / 2,
            (COMMON.D_HEIGHT - PRELOADBAR.HEIGHT) / 2,
            PRELOADBAR.WIDTH,
            PRELOADBAR.HEIGHT
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
            console.log('Waiting is done!');
            // ゲームシーンに遷移
            this.scene.start(COMMON.GAMESCENE);
        });

        // プリロードが完了したときに次のシーンに遷移
        // this.load.on('complete', () => {
        //     this.scene.start(COMMON.GAMESCENE);
        // });

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
        this.progressBar.fillStyle(PRELOADBAR.COLOR, 1);
        this.progressBar.fillRect(
            (COMMON.D_WIDTH - PRELOADBAR.WIDTH) / 2,
            (COMMON.D_HEIGHT - PRELOADBAR.HEIGHT) / 2,
            PRELOADBAR.WIDTH * value,
            PRELOADBAR.HEIGHT
        );
    }

    create() {
    }

    update() {
    }
}