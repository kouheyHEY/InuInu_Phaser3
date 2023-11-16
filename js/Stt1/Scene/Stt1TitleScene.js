class Stt1TitleScene extends BaseScene {
    /**
     * コンストラクタ
     */
    constructor() {
        super(COMMON.STT1TITLESCENE);

        // 各画像の画像IDとファイル名のリスト
        this.preLoadImgList = [
            // ボタン用
            [CONST_STT1.IMGID.BUTTON_DOGPUZZLE, CONST_STT1.IMGNAME.BUTTON_DOGPUZZLE],
            [CONST_STT1.IMGID.BUTTON_DOGRUN, CONST_STT1.IMGNAME.BUTTON_DOGRUN],
            [CONST_STT1.IMGID.BUTTON_DOGPUZZLE_PUSH, CONST_STT1.IMGNAME.BUTTON_DOGPUZZLE_PUSH],
            [CONST_STT1.IMGID.BUTTON_DOGRUN_PUSH, CONST_STT1.IMGNAME.BUTTON_DOGRUN_PUSH],
        ];

        // 背景用
        this.preLoadImgList_pzl = [
            [CONST_PZL1.IMGID.DOG_SHIBA, CONST_PZL1.IMGNAME.DOG_SHIBA],
            [CONST_PZL1.IMGID.DOG_PAG, CONST_PZL1.IMGNAME.DOG_PAG],
            [CONST_PZL1.IMGID.DOG_DALMATIAN, CONST_PZL1.IMGNAME.DOG_DALMATIAN],
            [CONST_PZL1.IMGID.DOG_CORGI, CONST_PZL1.IMGNAME.DOG_CORGI],
            [CONST_PZL1.IMGID.DOG_LABRADOR, CONST_PZL1.IMGNAME.DOG_LABRADOR],
            [CONST_PZL1.IMGID.ITEM_BONE_SINGLE, CONST_PZL1.IMGNAME.ITEM_BONE_SINGLE],
            [CONST_PZL1.IMGID.ITEM_BONE_DOUBLE, CONST_PZL1.IMGNAME.ITEM_BONE_DOUBLE]
        ]
    }

    preload() {
        // タイトル画面で使うリソースのプリロード
        // SCR_WIDTHとSCR_HEIGHTの更新
        SCR_WIDTH = phaser.scale.width;
        SCR_HEIGHT = phaser.scale.height;

        // 各画像の読み込み
        this.preLoadImgList.forEach(img => {
            this.load.image(img[0], CONST_STT1.DIR.DIR_IMG + "/" + img[1]);
        });

        this.preLoadImgList_pzl.forEach(img => {
            this.load.image(img[0], CONST_PZL1.DIR.DIR_IMG + "/" + img[1]);
        });
    }

    create() {
        // 背景オブジェクトのグループ
        this.bgIconList = [];
        // 背景オブジェクトの更新タイミングのフレーム
        this.bgIconUpdateFrame = CONST_STT1.SIZE.BGICON.WIDTH / CONST_STT1.BGICON.MOVE_X;
        // 背景を初期描画する
        this.createBg();

        let buttonY = (SCR_HEIGHT - (CONST_STT1.SIZE.BUTTON.HEIGHT) * 2 + CONST_STT1.POSITION.BUTTON.SPACE * 1) / 2;
        // Pzl1GameScene に遷移するボタン
        const buttonPzl1 = this.add.sprite(
            SCR_WIDTH / 2,
            buttonY,
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

        buttonY += CONST_STT1.SIZE.BUTTON.HEIGHT + CONST_STT1.POSITION.BUTTON.SPACE;

        // Act1GameScene に遷移するボタン
        const buttonAct1 = this.add.sprite(
            SCR_WIDTH / 2,
            buttonY,
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

    /**
     * 背景を作成する
     */
    createBg() {
        let iconX = -CONST_STT1.SIZE.BGICON.WIDTH / 2;
        let iconY = -CONST_STT1.SIZE.BGICON.HEIGHT / 2;
        let rowCnt = 0;
        while (iconY <= SCR_HEIGHT + CONST_STT1.SIZE.BGICON.HEIGHT) {
            while (iconX <= SCR_WIDTH + CONST_STT1.SIZE.BGICON.WIDTH) {
                // ランダムな背景色を取得
                let bgCol = Phaser.Math.RND.pick(CONST_STT1.BGICON.COLORLIST);
                // ランダムなテクスチャを取得
                let bgTxt = Phaser.Math.RND.pick(CONST_STT1.BGICON.TEXTURELIST);
                this.bgIconList.push(
                    new BgIcon(this, iconX, iconY, bgTxt, bgCol)
                );
                iconX += CONST_STT1.SIZE.BGICON.WIDTH * 2;
            }
            rowCnt++;
            // チェック柄となるように配置
            iconX = (rowCnt % 2 - 0.5) * CONST_STT1.SIZE.BGICON.WIDTH;
            iconY += CONST_STT1.SIZE.BGICON.HEIGHT;
        }
    }

    update() {
        // 背景を更新する
        this.updateBg();
    }

    /**
     * 背景を更新する
     */
    updateBg() {
        let repeatBgIcon = (phaser.getFrame() % this.bgIconUpdateFrame == 0);
        this.bgIconList.forEach((icon, index) => {
            icon.x += CONST_STT1.BGICON.MOVE_X;
            icon.y += CONST_STT1.BGICON.MOVE_Y;

            // 表示されないオブジェクトは削除
            if (icon.x >= SCR_WIDTH + CONST_STT1.SIZE.BGICON.WIDTH || icon.y >= SCR_HEIGHT + CONST_STT1.SIZE.BGICON.HEIGHT) {
                this.bgIconList.splice(index, 1);
                icon.destroy();
            }
        });

        // 画面端に到達したタイミングで画面外のオブジェクトを新規作成
        let iconX = -CONST_STT1.SIZE.BGICON.WIDTH / 2;
        let iconY = -CONST_STT1.SIZE.BGICON.HEIGHT / 2;
        let rowCnt = 0;
        if (repeatBgIcon) {
            while (iconY <= SCR_HEIGHT + CONST_STT1.SIZE.BGICON.HEIGHT) {
                while (iconX <= SCR_WIDTH + CONST_STT1.SIZE.BGICON.WIDTH) {
                    if (rowCnt != 0 && iconX >= 0) {
                        break;
                    } else {
                        // ランダムな背景色を取得
                        let bgCol = Phaser.Math.RND.pick(CONST_STT1.BGICON.COLORLIST);
                        // ランダムなテクスチャを取得
                        let bgTxt = Phaser.Math.RND.pick(CONST_STT1.BGICON.TEXTURELIST);
                        let bgIcon = new BgIcon(this, iconX, iconY, bgTxt, bgCol);
                        // 背景アイコンを生成
                        bgIcon.setDepth(-1);
                        this.bgIconList.push(bgIcon);

                        iconX += CONST_STT1.SIZE.BGICON.WIDTH * 2;
                    }
                }
                rowCnt++;
                // チェック柄となるように配置
                iconX = (rowCnt % 2 - 0.5) * CONST_STT1.SIZE.BGICON.WIDTH;
                iconY += CONST_STT1.SIZE.BGICON.HEIGHT;
            }
        }
    }
}