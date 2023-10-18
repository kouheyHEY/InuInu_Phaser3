class Stt1TitleScene extends BaseScene {
    /**
     * コンストラクタ
     */
    constructor() {
        super(COMMON.STT1TITLESCENE);

        // 各画像の画像IDとファイル名のリスト
        this.preLoadImgList = [
            [CONST_STT1.IMGID.BUTTON_DOGPUZZLE, CONST_STT1.IMGNAME.BUTTON_DOGPUZZLE],
            [CONST_STT1.IMGID.BUTTON_DOGRUN, CONST_STT1.IMGNAME.BUTTON_DOGRUN],
            [CONST_STT1.IMGID.BUTTON_DOGPUZZLE_PUSH, CONST_STT1.IMGNAME.BUTTON_DOGPUZZLE_PUSH],
            [CONST_STT1.IMGID.BUTTON_DOGRUN_PUSH, CONST_STT1.IMGNAME.BUTTON_DOGRUN_PUSH],
        ];
    }

    preload() {
        // タイトル画面で使うリソースのプリロード
        // SCR_WIDTHとSCR_HEIGHTの更新
        SCR_WIDTH = phaser.scale.width;
        SCR_HEIGHT = phaser.scale.height;

        // 各画像の読み込み
        this.preLoadImgList.forEach(img => {
            console.log(img[0] + ", " + img[1]);
            this.load.image(img[0], CONST_STT1.DIR.DIR_IMG + "/" + img[1]);
        });
    }

    create() {
        // Pzl1GameScene に遷移するボタン
        const buttonPzl1 = this.add.sprite(
            SCR_WIDTH / 2,
            CONST_STT1.POSITION.BUTTON.Y,
            CONST_STT1.IMGID.BUTTON_DOGPUZZLE
        ).setInteractive();

        buttonPzl1.on('pointerover', () => {
            buttonPzl1.setTexture(CONST_STT1.IMGID.BUTTON_DOGPUZZLE_PUSH);
        });

        buttonPzl1.on('pointerout', () => {
            buttonPzl1.setTexture(CONST_STT1.IMGID.BUTTON_DOGPUZZLE);
        });

        buttonPzl1.on('pointerdown', () => {
            this.scene.start(COMMON.PZL1PRELOADSCENE);
        });

        // Act1GameScene に遷移するボタン
        const buttonAct1 = this.add.sprite(
            SCR_WIDTH / 2,
            CONST_STT1.POSITION.BUTTON.Y + CONST_STT1.SIZE.BUTTON.HEIGHT + CONST_STT1.POSITION.BUTTON.SPACE,
            CONST_STT1.IMGID.BUTTON_DOGRUN
        ).setInteractive();

        buttonAct1.on('pointerover', () => {
            buttonAct1.setTexture(CONST_STT1.IMGID.BUTTON_DOGRUN_PUSH);
        });

        buttonAct1.on('pointerout', () => {
            buttonAct1.setTexture(CONST_STT1.IMGID.BUTTON_DOGRUN);
        });

        buttonAct1.on('pointerdown', () => {
            this.scene.start(COMMON.ACT1PRELOADSCENE);
        });
    }
}