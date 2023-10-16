class Pzl1PreLoadScene extends BaseScene {
    /**
     * コンストラクタ
     */
    constructor() {
        super(COMMON.PZL1PRELOADSCENE);

        // 各画像の画像IDとファイル名のリスト
        this.preLoadImgList = [
            [IMGID.DOG_SHIBA, IMGNAME.DOG_SHIBA],
            [IMGID.DOG_PAG, IMGNAME.DOG_PAG],
            [IMGID.DOG_DALMATIAN, IMGNAME.DOG_DALMATIAN],
            [IMGID.DOG_CORGI, IMGNAME.DOG_CORGI],
            [IMGID.DOG_LABRADOR, IMGNAME.DOG_LABRADOR],
            [IMGID.ITEM_BONE_SINGLE, IMGNAME.ITEM_BONE_SINGLE],
            [IMGID.ITEM_BONE_DOUBLE, IMGNAME.ITEM_BONE_DOUBLE]
        ];
    }

    /**
     * Pzl1GameSceneで使用する画像やスプライトシートを読み込む
     */
    preload() {
        // SCR_WIDTHとSCR_HEIGHTの更新
        SCR_WIDTH = phaser.scale.width;
        SCR_HEIGHT = phaser.scale.height;

        // 各画像の読み込み
        this.preLoadImgList.forEach(img => {
            this.load.image(img[0], DIR.DIR_IMG + "/" + img[1]);
        });

        // 各スプライトシートの読み込み
        // 消去アニメーション
        this.load.spritesheet(
            IMGID.ANIM_EFFECT_DELETEICON,
            DIR.DIR_IMG + "/" + IMGNAME.ANIM_EFFECT_DELETEICON,
            {
                frameWidth: ICON.WIDTH,
                frameHeight: ICON.HEIGHT
            }
        );

        // プリロード中に表示するプログレスバーの背景
        this.progressBarBg = this.add.graphics();
        this.progressBarBg.fillStyle(PRELOADBAR.BGCOLOR, 0.8);
        this.progressBarBg.fillRect(
            (SCR_WIDTH - PRELOADBAR.WIDTH) / 2,
            (SCR_HEIGHT - PRELOADBAR.HEIGHT) / 2,
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
            console.log('END LOADING RESOURCES!');
            // ゲームシーンに遷移
            this.scene.start(COMMON.PZL1GAMESCENE);
        });

        // プリロードが完了したときに次のシーンに遷移
        // this.load.on('complete', () => {
        //     this.scene.start(COMMON.PZL1GAMESCENE);
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
            (SCR_WIDTH - PRELOADBAR.WIDTH) / 2,
            (SCR_HEIGHT - PRELOADBAR.HEIGHT) / 2,
            PRELOADBAR.WIDTH * value,
            PRELOADBAR.HEIGHT
        );
    }

    create() {
    }

    update() {
    }
}