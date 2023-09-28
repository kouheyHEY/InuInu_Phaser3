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
        this.deleteNumTextList = [];
        let deleteInfoX = DELETEINFO.X;
        let deleteInfoY = DELETEINFO.Y;
        let typeID = 0;
        ICONTYPE.forEach(type => {

            let icon = new Icon(this, deleteInfoX, deleteInfoY, type, 0, 0, 0, null, false);

            let deleteNumStr = ` × ${this.gameManager.deleteDogNum[typeID++]}`;
            let deleteNumText = this.setText(deleteNumStr, deleteInfoX + ICON.WIDTH / 2, deleteInfoY, COMMON.FONTSIZE_DELETEINFO, COMMON.FONTCOLOR_DEFAULT);
            deleteNumText.setFontFamily(COMMON.FONTSTYLE_NORMAL);

            deleteInfoX += (ICON.WIDTH + deleteNumText.displayWidth);

            this.deleteNumTextList.push(deleteNumText);
            console.log(deleteInfoX);
        });

        // 制限時間を表示するテキスト
        this.timerText = this.setText(`Time: ${this.gameManager.currentTime}`, 16, 16, COMMON.FONTSIZE_TIMER, COMMON.FONTCOLOR_DEFAULT);
        this.timerText.setFontFamily(COMMON.FONTSTYLE_NORMAL);
    }

    update() {
        // ゲームのメインループ（ゲームの状態やアニメーションの更新などをここで行う）
        console.log("UPDATE NOW");

    }

    updateTimerText(time) {
        this.timerText.setText(`Time: ${time}`);
    }

    updateDeleteInfo(_type, _num) {
        this.deleteNumTextList[_type].setText(` × ${_num}`);
    }
}
