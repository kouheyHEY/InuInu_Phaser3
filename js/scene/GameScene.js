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

        // 制限時間を表示するテキスト
        this.timerText = this.setText(`Time: ${this.gameManager.currentTime}`, 16, 16, 36, COMMON.FONTCOLOR_DEFAULT);
        this.timerText.setFontFamily(COMMON.FONTSTYLE_NORMAL);
    }

    update() {
        // ゲームのメインループ（ゲームの状態やアニメーションの更新などをここで行う）
        console.log("UPDATE NOW");
    }

    updateTimerText(time) {
        this.timerText.setText(`Time: ${time}`);
    }
}
