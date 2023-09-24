class GameScene extends BaseScene {
    constructor() {
        super(COMMON.GAMESCENE);
    }

    create() {
        console.log("GameScene Start");

        // ゲームの初期化と設定
        this.gameManager = new GameManager(this);
        this.grid = new Grid(this, 4, 6, this.gameManager);

        // お題の表示
        this.gameManager.showRandomDog();

        // 制限時間を表示するテキスト
        this.timerText = this.add.text(16, 16, `Time: ${this.gameManager.currentTime}`, {
            fontSize: '24px',
            fill: '#ffffff',
        });
    }

    update() {
        // ゲームのメインループ（ゲームの状態やアニメーションの更新などをここで行う）
        console.log("UPDATE NOW");
    }

    updateTimerText(time) {
        this.timerText.setText(`Time: ${time}`);
    }
}
