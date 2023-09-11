class GameManager {
    constructor(scene) {
        this.scene = scene;
        this.score = 0;
        this.timer = null; // 制限時間のタイマー
        this.currentDogType = null; // 現在のお題の犬の種類

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
            this.timer.destroy(); // 既存のタイマーがあれば破棄
        }

        // 新しい制限時間の設定
        this.timer = this.scene.time.addEvent({
            delay: 1000, // 1秒ごとにカウントダウン
            callback: this.onTimerTick,
            callbackScope: this,
            loop: true,
        });
    }

    onTimerTick() {
        // 制限時間のカウントダウン処理

        if (this.timer.getProgress() === 1) {
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
        // 例: const dogTypes = ['dog1', 'dog2', 'dog3'];
        //     return Phaser.Math.RND.pick(dogTypes);
    }

    checkSelection(selectedType) {
        // プレイヤーの選択をチェックし、正しい場合の処理を追加

        if (selectedType === this.currentDogType) {
            // 正しい選択の場合
            this.score += 1; // スコアを加算
            this.resetTimer(); // 制限時間をリセット
            this.showRandomDog(); // 新しいお題を表示
        } else {
            // 間違った選択の場合
            this.gameOver(); // ゲームオーバー処理
        }
    }

    gameOver() {
        // ゲームオーバー処理を追加

        // ゲームオーバー画面を表示
        this.scene.scene.start('GameOverScene', { score: this.score });
    }
}
