class GameScene extends BaseScene {
    constructor() {
        super({ key: COMMON.GAMESCENE });
        console.log("HELLO!!!!!!!!!!");
    }

    create() {
        // ゲームの初期化と設定
        this.gameManager = new GameManager(this);
        this.grid = new Grid(this, 5, 7);

        // お題の表示
        this.gameManager.showRandomDog();

        // 制限時間の設定
        this.initialTime = 60; // 初期制限時間（秒）
        this.currentTime = this.initialTime;

        // 制限時間を表示するテキスト
        this.timerText = this.add.text(16, 16, `Time: ${this.initialTime}`, {
            fontSize: '24px',
            fill: '#ffffff',
        });

        // 制限時間をカウントダウン
        this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true,
        });
    }

    update() {
        // ゲームのメインループ（ゲームの状態やアニメーションの更新などをここで行う）
    }

    updateTimer() {
        // 制限時間の更新
        this.currentTime--;

        if (this.currentTime >= 0) {
            this.timerText.setText(`Time: ${this.currentTime}`);
        } else {
            // 制限時間が終了した場合のゲームオーバー処理
            this.gameManager.gameOver();
        }
    }
}
