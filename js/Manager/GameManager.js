class GameManager {
    constructor(scene) {
        this.scene = scene;
        this.initialTime = 5;
        this.currentTime = this.initialTime;
        this.timer = null;

        // 現在のお題の犬の種類
        this.currentDogType = null;
        // 消去した犬のタイプごとの数
        this.deleteDogNum = {};

        // ゲームの初期化
        this.init();
    }

    init() {
        // ゲーム初期化の処理を追加

        // 制限時間の初期化
        this.resetTimer();
    }

    resetTimer() {
        if (this.timer) {
            this.timer.remove(false); // 既存のタイマーがあれば削除
        }

        // 新しい制限時間の設定
        this.timer = this.scene.time.addEvent({
            delay: 1000, // 1秒ごとにカウントダウン
            callback: () => this.onTimerTick(),
            loop: true,
        });
    }

    onTimerTick() {
        // 制限時間のカウントダウン処理
        this.currentTime--;
        this.scene.updateTimerText(this.currentTime);

        if (this.currentTime <= 0) {
            // 制限時間切れの場合の処理
            this.gameOver();
        }
    }

    showRandomDog() {
        // ランダムな犬のアイコンを画面に表示
        const randomDogType = this.getRandomDogType();
        this.currentDogType = randomDogType;

        // アイコン表示の処理を追加
    }

    getRandomDogType() {
        // ランダムな犬の種類を取得
        const dogTypes = ['dog1', 'dog2', 'dog3']; // 仮の犬の種類のリスト
        return Phaser.Math.RND.pick(dogTypes);
    }


    gameOver() {
        // ゲームオーバー処理を追加
        console.log("GAMEOVER");

        // ゲームオーバー画面を表示
        this.scene.scene.start(COMMON.GAMEOVERSCENE);
    }


}
