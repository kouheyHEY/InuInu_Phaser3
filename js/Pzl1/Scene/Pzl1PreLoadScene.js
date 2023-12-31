class Pzl1PreLoadScene extends BaseScene {
    /**
     * コンストラクタ
     */
    constructor() {
        super(COMMON.PZL1PRELOADSCENE);

        // 各画像の画像IDとファイル名のリスト
        this.preLoadImgList = [
            [CONST_PZL1.IMGID.DOG_SHIBA, CONST_PZL1.IMGNAME.DOG_SHIBA],
            [CONST_PZL1.IMGID.DOG_PAG, CONST_PZL1.IMGNAME.DOG_PAG],
            [CONST_PZL1.IMGID.DOG_DALMATIAN, CONST_PZL1.IMGNAME.DOG_DALMATIAN],
            [CONST_PZL1.IMGID.DOG_CORGI, CONST_PZL1.IMGNAME.DOG_CORGI],
            [CONST_PZL1.IMGID.DOG_LABRADOR, CONST_PZL1.IMGNAME.DOG_LABRADOR],
            [CONST_PZL1.IMGID.ITEM_BONE_SINGLE, CONST_PZL1.IMGNAME.ITEM_BONE_SINGLE],
            [CONST_PZL1.IMGID.ITEM_BONE_DOUBLE, CONST_PZL1.IMGNAME.ITEM_BONE_DOUBLE]
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
            this.load.image(img[0], CONST_PZL1.DIR.DIR_IMG + "/" + img[1]);
        });

        // 各スプライトシートの読み込み
        // 消去アニメーション
        this.load.spritesheet(
            CONST_PZL1.IMGID.ANIM_EFFECT_DELETEICON,
            CONST_PZL1.DIR.DIR_IMG + "/" + CONST_PZL1.IMGNAME.ANIM_EFFECT_DELETEICON,
            {
                frameWidth: CONST_PZL1.ICON.WIDTH,
                frameHeight: CONST_PZL1.ICON.HEIGHT
            }
        );

        // プリロード中に表示するプログレスバーの背景
        this.progressBarBg = this.add.graphics();
        this.progressBarBg.fillStyle(CONST_PZL1.PRELOADBAR.BGCOLOR, 0.8);
        this.progressBarBg.fillRect(
            (SCR_WIDTH - CONST_PZL1.PRELOADBAR.WIDTH) / 2,
            (SCR_HEIGHT - CONST_PZL1.PRELOADBAR.HEIGHT) / 2,
            CONST_PZL1.PRELOADBAR.WIDTH,
            CONST_PZL1.PRELOADBAR.HEIGHT
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
        //     this.scene.start(COMMON_PZL1.PZL1GAMESCENE);
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
        this.progressBar.fillStyle(CONST_PZL1.PRELOADBAR.COLOR, 1);
        this.progressBar.fillRect(
            (SCR_WIDTH - CONST_PZL1.PRELOADBAR.WIDTH) / 2,
            (SCR_HEIGHT - CONST_PZL1.PRELOADBAR.HEIGHT) / 2,
            CONST_PZL1.PRELOADBAR.WIDTH * value,
            CONST_PZL1.PRELOADBAR.HEIGHT
        );
    }

    create() {
    }

    update() {
    }
}