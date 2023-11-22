class Pzl1GameScene extends BaseScene {
    constructor() {
        super(COMMON.PZL1GAMESCENE);
    }

    create() {
        this.cameras.main.setBackgroundColor(CONST_PZL1.COMMON_PZL1.BGCOLOR_DEFAULT);
        console.log("Pzl1GameScene Start");

        // デバイスのタイプをチェックして、スケールを設定
        if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
            // スマートフォン版の場合
            this.objScale = CONST_STT1.SIZE.SMALLSCALE;
        } else {
            this.objScale = CONST_PZL1.SIZE.LARGESCALE;
        }

        // ゲームの初期化と設定
        this.pzl1GameManager = new Pzl1GameManager(this);
        this.grid = new Grid(this, 5, 6, this.pzl1GameManager);

        // アイコン消去数表示用エリアの設定
        this.createDeleteInfoArea();

        // 制限時間を表示するテキスト
        this.timerText = this.setText(
            `Time: ${this.pzl1GameManager.currentTime}`,
            CONST_PZL1.TIMEINFO.X,
            CONST_PZL1.TIMEINFO.Y * this.objScale,
            CONST_PZL1.COMMON_PZL1.FONTSIZE_TIMER * this.objScale,
            CONST_PZL1.COMMON_PZL1.FONTCOLOR_DEFAULT
        );
        this.timerText.setFontFamily(CONST_PZL1.COMMON_PZL1.FONTSTYLE_NORMAL);
        this.timerText.setOrigin(0, 0.5);

        // 画面右上に、ボーナスとなるアイコンの種類を表示する
        this.createBonusInfoArea();

    }

    createDeleteInfoArea() {

        // 画面上部に消去数を表示する
        this.deleteInfoArea = this.add.group();

        let deleteInfoX = CONST_PZL1.DELETEINFO.X * this.objScale;
        let deleteInfoY = CONST_PZL1.DELETEINFO.Y * this.objScale;
        let typeID = 0;
        let DELETEINFO_X_LIMIT = SCR_WIDTH - CONST_PZL1.DELETEINFO.X * this.objScale;

        for (let i = 0; i < CONST_PZL1.DOG_NUM; i++) {

            // 消去数の表示位置が定義範囲外の場合、位置調整
            if (deleteInfoX + CONST_PZL1.DELETEINFO.WIDTH * this.objScale >= DELETEINFO_X_LIMIT) {
                deleteInfoX = CONST_PZL1.DELETEINFO.X * this.objScale;
                deleteInfoY += CONST_PZL1.ICON_DELETEINFO.HEIGHT * this.objScale;
            }

            // 消去数表示用のアイコンとテキストの設定
            this.createDeleteInfoSet(deleteInfoX, deleteInfoY, typeID++);

            deleteInfoX += CONST_PZL1.DELETEINFO.WIDTH * this.objScale;
        }
    }

    createDeleteInfoSet(_x, _y, _type) {
        let infoSet = this.add.container(_x, _y);

        // アイコンの生成
        let icon = this.add.image(0, 0, CONST_PZL1.ICONTYPE[_type]);
        icon.displayWidth = CONST_PZL1.ICON_DELETEINFO.WIDTH * this.objScale;
        icon.displayHeight = CONST_PZL1.ICON_DELETEINFO.HEIGHT * this.objScale;
        infoSet.add(icon);

        // アイコンの消去数テキストを作成
        let deleteNumText = this.setText(
            ` × ${this.pzl1GameManager.deleteDogNum[_type]}`,
            CONST_PZL1.ICON_DELETEINFO.WIDTH / 2,
            0,
            CONST_PZL1.COMMON_PZL1.FONTSIZE_DELETEINFO * this.objScale,
            CONST_PZL1.COMMON_PZL1.FONTCOLOR_DEFAULT
        );
        deleteNumText.setFontFamily(CONST_PZL1.COMMON_PZL1.FONTSTYLE_NORMAL);
        deleteNumText.setOrigin(0, 0.5);
        infoSet.add(deleteNumText);

        // エリアにアイコンセットを追加
        this.deleteInfoArea.add(infoSet);

        return infoSet;
    }

    createBonusInfoArea() {
        // 画面右上に、ボーナスとなるアイコンの種類を表示する
        let bonusInfoX = SCR_WIDTH - CONST_PZL1.BONUSINFO.WIDTH * this.objScale;
        let bonusInfoY = CONST_PZL1.BONUSINFO.Y * this.objScale;

        // ボーナス表示情報
        this.bonusInfoArea = this.add.container(bonusInfoX, bonusInfoY);

        // ボーナス表示時のテキスト
        let bonusText = this.setText("Bonus:", 0, 0, CONST_PZL1.COMMON_PZL1.FONTSIZE_BONUS * this.objScale, CONST_PZL1.COMMON_PZL1.FONTCOLOR_DEFAULT);
        bonusText.setFontFamily(CONST_PZL1.COMMON_PZL1.FONTSTYLE_NORMAL);
        bonusText.setOrigin(0, 0.5);

        this.bonusInfoArea.add(bonusText);

        // アイコンの表示
        let icon = this.add.image(
            bonusText.displayWidth + CONST_PZL1.ICON_DELETEINFO.WIDTH / 2,
            0,
            CONST_PZL1.ICONTYPE[this.pzl1GameManager.getRandomDogType()]
        );
        icon.displayWidth = CONST_PZL1.ICON_DELETEINFO.WIDTH * this.objScale;;
        icon.displayHeight = CONST_PZL1.ICON_DELETEINFO.HEIGHT * this.objScale;;

        this.bonusInfoArea.add(icon);
    }

    update() {
        // ゲームのメインループ（ゲームの状態やアニメーションの更新などをここで行う）
        console.log("UPDATE NOW");

    }

    updateTimerText(time) {
        this.timerText.setText(`Time: ${time}`);
    }

    updateDeleteInfo(_type, _num) {
        this.deleteInfoArea.getChildren()[_type].list[1].setText(` × ${_num}`);
    }
}
