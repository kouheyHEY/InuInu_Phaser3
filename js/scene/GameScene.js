class GameScene extends BaseScene {
    constructor() {
        super(COMMON.GAMESCENE);
    }

    create() {
        this.cameras.main.setBackgroundColor(COMMON.BGCOLOR_DEFAULT);
        console.log("GameScene Start");

        // ゲームの初期化と設定
        this.gameManager = new GameManager(this);
        this.grid = new Grid(this, 4, 6, this.gameManager);

        // お題の表示
        this.gameManager.showRandomDog();

        // 画面上部に消去数を表示する
        this.deleteInfoArea = this.add.group();

        let deleteInfoX = DELETEINFO.X;
        let deleteInfoY = DELETEINFO.Y;
        let typeID = 0;
        let DELETEINFO_X_LIMIT = SCR_WIDTH - DELETEINFO.X;
        ICONTYPE.forEach(type => {

            // 消去数の表示位置が画面外の場合、位置調整
            console.log(deleteInfoX);
            if (deleteInfoX + DELETEINFO.WIDTH >= DELETEINFO_X_LIMIT) {
                deleteInfoX = DELETEINFO.X;
                deleteInfoY += ICON_DELETEINFO.HEIGHT;
            }

            // 消去数表示用のアイコンとテキストの設定
            this.createDeleteInfoSet(deleteInfoX, deleteInfoY, typeID++);

            deleteInfoX += DELETEINFO.WIDTH;
        });

        // 制限時間を表示するテキスト
        this.timerText = this.setText(`Time: ${this.gameManager.currentTime}`, 16, 16, COMMON.FONTSIZE_TIMER, COMMON.FONTCOLOR_DEFAULT);
        this.timerText.setFontFamily(COMMON.FONTSTYLE_NORMAL);

        // TODO: 画面右上に、ボーナスとなるアイコンの種類を表示する
    }

    createDeleteInfoSet(_x, _y, _type) {
        let infoSet = this.add.container(_x, _y);

        // アイコンの生成
        let icon = this.add.image(0, 0, ICONTYPE[_type]);
        icon.displayWidth = ICON_DELETEINFO.WIDTH;
        icon.displayHeight = ICON_DELETEINFO.HEIGHT;
        infoSet.add(icon);

        // アイコンの消去数テキストを作成
        let deleteNumText = this.setText(` × ${this.gameManager.deleteDogNum[_type]}`, ICON_DELETEINFO.WIDTH / 2, 0, COMMON.FONTSIZE_DELETEINFO, COMMON.FONTCOLOR_DEFAULT);
        deleteNumText.setFontFamily(COMMON.FONTSTYLE_NORMAL);
        deleteNumText.setOrigin(0, 0.5);
        infoSet.add(deleteNumText);

        // エリアにアイコンセットを追加
        this.deleteInfoArea.add(infoSet);

        return infoSet;
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
