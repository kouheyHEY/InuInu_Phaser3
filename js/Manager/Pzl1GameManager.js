class Pzl1GameManager {
    constructor(scene) {
        /** @type {Pzl1GameScene} */
        this.scene = scene;
        this.initialTime = TIMEINFO.INITTIME;
        this.currentTime = this.initialTime;
        this.timer = null;

        // 現在のお題の犬の種類
        this.currentDogType = null;
        // 消去した犬のタイプごとの数
        this.deleteDogNum = [];

        // ゲームの初期化
        this.init();
    }

    init() {
        // 消去したアイコン数の初期化
        for (let i = 0; i < DOG_NUM; i++) {
            this.deleteDogNum.push(0);
        }

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

    getRandomDogType() {
        // ランダムな犬の種類を取得
        return Math.floor(Math.random() * DOG_NUM);
    }

    gameOver() {
        let iconType = 0;
        for (let i = 0; i < DOG_NUM; i++) {
            (ICONTYPE[i] + " : " + this.deleteDogNum[iconType++]);
        }

        // ゲームオーバー処理を追加
        console.log("GAMEOVER");
        this.scene.grid.initGrid();

        // ゲームオーバー画面を表示
        this.scene.scene.start(COMMON.GAMEOVERSCENE);
    }

    /**
     * 消去したアイコンの数を計上する
     * @param {int} _deleteType アイコンのタイプ
     * @param {int} _deleteNum 消去数
     */
    countDeleteDog(_deleteType, _deleteNum) {
        if (Pzl1GameManager.isItem(_deleteType)) {
            return;
        }

        this.deleteDogNum[_deleteType] += _deleteNum;
        this.scene.updateDeleteInfo(_deleteType, this.deleteDogNum[_deleteType]);
    }

    /**
     * アイコンがアイテムかどうかを判別する
     * @param {int} _type アイコンのタイプ
     * @returns アイテムかどうか
     */
    static isItem(_type) {
        return _type >= DOG_NUM;
    }

}
