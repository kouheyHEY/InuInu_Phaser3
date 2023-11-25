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
            [CONST_STT1.IMGID.BUTTON_ACHIEVE, CONST_STT1.IMGNAME.BUTTON_ACHIEVE],
            [CONST_STT1.IMGID.BUTTON_DOGPUZZLE_PUSH, CONST_STT1.IMGNAME.BUTTON_DOGPUZZLE_PUSH],
            [CONST_STT1.IMGID.BUTTON_DOGRUN_PUSH, CONST_STT1.IMGNAME.BUTTON_DOGRUN_PUSH],
            [CONST_STT1.IMGID.BUTTON_ACHIEVE_PUSH, CONST_STT1.IMGNAME.BUTTON_ACHIEVE_PUSH],
            // タイトル
            [CONST_STT1.IMGID.TITLE, CONST_STT1.IMGNAME.TITLE]
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

        // デバイスのタイプをチェックして、スケールを設定
        if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
            // スマートフォン版の場合
            this.objScale = CONST_STT1.SIZE.SMALLSCALE;
        } else {
            this.objScale = CONST_STT1.SIZE.LARGESCALE;
        }

        // 背景オブジェクトのグループ
        this.bgIconList = [];
        // 背景オブジェクトの更新タイミングのフレーム
        this.bgIconUpdateFrame = CONST_STT1.SIZE.BGICON.WIDTH / CONST_STT1.BGICON.MOVE_X;
        // 背景を初期描画する
        this.createdBg = false;
        this.createBg();

        // モードの数
        let modeNum = CONST_STT1.MODE_NUM;

        // タイトル背景のサイズを計算
        let bgTitleW =
            CONST_STT1.SIZE.BUTTON.WIDTH * CONST_STT1.BUTTON_COL +
            CONST_STT1.POSITION.BUTTON.SPACE * (CONST_STT1.BUTTON_COL - 1) +
            CONST_STT1.BGTITLE.MARGIN * 2;
        let bgTitleH =
            CONST_STT1.SIZE.BUTTON.HEIGHT * Math.ceil(modeNum / CONST_STT1.BUTTON_COL) +
            CONST_STT1.POSITION.BUTTON.SPACE * (CONST_STT1.BUTTON_COL - 1) +
            CONST_STT1.SIZE.BGTITLE.HEIGHT + CONST_STT1.BGTITLE.MARGIN;

        // タイトルオブジェクト
        this.bgTitleObj = this.add.container();
        this.bgTitleObj.setPosition(SCR_WIDTH / 2, (SCR_HEIGHT - bgTitleH * this.objScale) / 2);

        let bgTitleObjY = 0;
        // タイトル背景の描画
        let bgTitle = this.add.graphics();
        bgTitle.fillStyle(CONST_STT1.BGTITLE.COLOR);
        bgTitle.fillRoundedRect(
            -bgTitleW / 2,
            bgTitleObjY,
            bgTitleW,
            bgTitleH,
            CONST_STT1.BGTITLE.ROUND
        );
        bgTitle.setAlpha(CONST_STT1.BGTITLE.ALPHA);
        this.bgTitleObj.add(bgTitle);

        // タイトルの描画
        let titleSprtie = this.add.sprite(
            0,
            bgTitleObjY,
            CONST_STT1.IMGID.TITLE
        );
        titleSprtie.setOrigin(0.5, 0);
        this.bgTitleObj.add(titleSprtie);
        bgTitleObjY += CONST_STT1.SIZE.BGTITLE.HEIGHT;

        // ボタンのプロパティ
        let buttonPropList = [
            {
                button_normal: CONST_STT1.IMGID.BUTTON_DOGPUZZLE,
                button_push: CONST_STT1.IMGID.BUTTON_DOGPUZZLE_PUSH,
                nextScene: COMMON.ACT1PRELOADSCENE
            },
            {
                button_normal: CONST_STT1.IMGID.BUTTON_DOGRUN,
                button_push: CONST_STT1.IMGID.BUTTON_DOGRUN_PUSH,
                nextScene: COMMON.PZL1PRELOADSCENE
            },
            {
                button_normal: CONST_STT1.IMGID.BUTTON_ACHIEVE,
                button_push: CONST_STT1.IMGID.BUTTON_ACHIEVE_PUSH,
                nextScene: ""
            }
        ];
        this.buttonList = [];

        // ボタンのx座標
        let buttonX = 0;
        // ボタンを生成
        for (let i = 0; i < buttonPropList.length; i++) {

            // ボタンのx座標
            buttonX =
                (CONST_STT1.SIZE.BUTTON.WIDTH + CONST_STT1.POSITION.BUTTON.SPACE) * (i % CONST_STT1.BUTTON_COL) -
                (CONST_STT1.SIZE.BUTTON.WIDTH + CONST_STT1.POSITION.BUTTON.SPACE) * (CONST_STT1.BUTTON_COL - 1) / 2;
            let buttonProp = buttonPropList[i];

            // ボタンインスタンスの生成
            let button = this.add.sprite(
                buttonX,
                bgTitleObjY,
                buttonPropList[i].button_normal
            ).setInteractive().setOrigin(0.5, 0);

            // マウスが重なった時
            button.on('pointerover', () => {
                button.setTexture(buttonProp.button_push);
            });

            // マウスが外れたとき
            button.on('pointerout', () => {
                button.setTexture(buttonProp.button_normal);
            });

            // マウスが押された場合
            if (buttonProp.nextScene !== "") {
                button.on('pointerdown', () => {
                    this.scene.start(buttonProp.nextScene);
                });
            }

            // ボタンリストに追加
            this.buttonList.push(button);
            this.bgTitleObj.add(button);

            bgTitleObjY += (CONST_STT1.SIZE.BUTTON.HEIGHT + CONST_STT1.POSITION.BUTTON.SPACE) * (i % CONST_STT1.BUTTON_COL);
        }

        // タイトルオブジェクトのスケール設定
        this.bgTitleObj.setScale(this.objScale);

    }

    /**
     * 背景を作成する
     */
    createBg() {
        // 背景色の設定
        this.cameras.main.setBackgroundColor(CONST_STT1.BGCOLOR);

        let iconX = -CONST_STT1.SIZE.BGICON.WIDTH * this.objScale / 2;
        let iconY = -CONST_STT1.SIZE.BGICON.HEIGHT * this.objScale / 2;
        let rowCnt = 0;
        while (iconY <= SCR_HEIGHT + CONST_STT1.SIZE.BGICON.HEIGHT) {
            while (iconX <= SCR_WIDTH + CONST_STT1.SIZE.BGICON.WIDTH) {
                // ランダムな背景色を取得
                let bgCol = Phaser.Math.RND.pick(CONST_STT1.BGICON.COLORLIST);
                // ランダムなテクスチャを取得
                let bgTxt = Phaser.Math.RND.pick(CONST_STT1.BGICON.TEXTURELIST);
                let bgIcon = new BgIcon(this, iconX, iconY, bgTxt, bgCol);

                bgIcon.setScale(this.objScale);
                // 背景アイコンを生成
                bgIcon.setDepth(-2);
                this.bgIconList.push(bgIcon);
                iconX += CONST_STT1.SIZE.BGICON.WIDTH * this.objScale * 2;
            }
            rowCnt++;
            // チェック柄となるように配置
            iconX = (rowCnt % 2 - 0.5) * CONST_STT1.SIZE.BGICON.WIDTH * this.objScale;
            iconY += CONST_STT1.SIZE.BGICON.HEIGHT * this.objScale;
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
            icon.x += CONST_STT1.BGICON.MOVE_X * this.objScale;
            icon.y += CONST_STT1.BGICON.MOVE_Y * this.objScale;

            // 表示されないオブジェクトは削除
            if (icon.x >= SCR_WIDTH + CONST_STT1.SIZE.BGICON.WIDTH || icon.y >= SCR_HEIGHT + CONST_STT1.SIZE.BGICON.HEIGHT) {
                this.bgIconList.splice(index, 1);
                icon.destroy();
            }
        });

        // 画面端に到達したタイミングで画面外のオブジェクトを新規作成
        let iconX = -CONST_STT1.SIZE.BGICON.WIDTH * this.objScale / 2;
        let iconY = -CONST_STT1.SIZE.BGICON.HEIGHT * this.objScale / 2;
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
                        bgIcon.setScale(this.objScale);
                        // 背景アイコンを生成
                        bgIcon.setDepth(-2);
                        this.bgIconList.push(bgIcon);

                        iconX += CONST_STT1.SIZE.BGICON.WIDTH * this.objScale * 2;
                    }
                }
                rowCnt++;
                // チェック柄となるように配置
                iconX = (rowCnt % 2 - 0.5) * CONST_STT1.SIZE.BGICON.WIDTH * this.objScale;
                iconY += CONST_STT1.SIZE.BGICON.HEIGHT * this.objScale;
            }
        }
    }
}