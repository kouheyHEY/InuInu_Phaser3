class Pzl1GameManager {
    constructor(scene) {
        /** @type {Pzl1GameScene} */
        this.scene = scene;
        this.initialTime = CONST_PZL1.TIMEINFO.INITTIME;
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
        for (let i = 0; i < CONST_PZL1.DOG_NUM; i++) {
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
            // 実績の確認
            this.checkAchieve();
            // ゲームオーバー処理
            this.gameOver();
        }
    }

    getRandomDogType() {
        // ランダムな犬の種類を取得
        return Math.floor(Math.random() * CONST_PZL1.DOG_NUM);
    }

    /**
     * ゲームオーバー処理を行う
     */
    gameOver() {
        let iconType = 0;
        for (let i = 0; i < CONST_PZL1.DOG_NUM; i++) {
            (CONST_PZL1.ICONTYPE[i] + " : " + this.deleteDogNum[iconType++]);
        }

        // ゲームオーバー処理を追加
        console.log("GAMEOVER");
        this.scene.grid.initGrid();

        // ゲームオーバー画面を表示
        this.scene.scene.start(COMMON.PZL1GAMEOVERSCENE);
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
     * 実績の達成を確認する
     */
    checkAchieve() {
        // 実績一覧
        // PZL1: {
        //     DEL_SHIBA_1: "柴犬を100匹消去する",
        //     DEL_PUG_1: "パグを100匹消去する",
        //     DEL_DALM_1: "ダルメシアンを100匹消去する",
        //     DEL_CORGI_1: "コーギーを100匹消去する",
        //     DEL_LABRA_1: "ラブラドールを100匹消去する",
        //     DEL_BONE_S_1: "アイテム（ホネ）を10個消去する",
        //     DEL_BONE_D_1: "アイテム（ホネホネ）を10個消去する",
        //     DEL_ALLDOG_1: "全ての種類を合計500匹消去する",
        // }

        console.log("ACHIEVE CHECK START.")

        let del_shiba = this.deleteDogNum[CONST_PZL1.ICONTYPE_ID.DOG_SHIBA];
        let del_pag = this.deleteDogNum[CONST_PZL1.ICONTYPE_ID.DOG_PAG];
        let del_dalmatian = this.deleteDogNum[CONST_PZL1.ICONTYPE_ID.DOG_DALMATIAN];
        let del_corgi = this.deleteDogNum[CONST_PZL1.ICONTYPE_ID.DOG_CORGI];
        let del_labrador = this.deleteDogNum[CONST_PZL1.ICONTYPE_ID.DOG_LABRADOR];
        let del_bone_s = this.deleteDogNum[CONST_PZL1.ITEMTYPE_ID.ITEM_BONE_SINGLE];
        let del_bone_d = this.deleteDogNum[CONST_PZL1.ITEMTYPE_ID.ITEM_BONE_DOUBLE];

        if (del_shiba >= 100) {
            PLAYER_DATA[ACHIEVE_LIST][PZL1]["DEL_SHIBA_1"] = true;
            console.log("shiba 100");
        }
        if (del_pag >= 100) {
            PLAYER_DATA[ACHIEVE_LIST][PZL1]["DEL_PAG_1"] = true;
            console.log("pag 100");
        }
        if (del_dalmatian >= 100) {
            PLAYER_DATA[ACHIEVE_LIST][PZL1]["DEL_DALM_1"] = true;
            console.log("dalmatian 100");
        }
        if (del_corgi >= 100) {
            PLAYER_DATA[ACHIEVE_LIST][PZL1]["DEL_CORGI_1"] = true;
            console.log("corgi 100");
        }
        if (del_labrador >= 100) {
            PLAYER_DATA[ACHIEVE_LIST][PZL1]["DEL_LABRA_1"] = true;
            console.log("lablador 100");
        }
        if (del_bone_s >= 10) {
            PLAYER_DATA[ACHIEVE_LIST][PZL1]["DEL_BONE_S_1"] = true;
            console.log("bone_s 10");
        }
        if (del_bone_d >= 10) {
            PLAYER_DATA[ACHIEVE_LIST][PZL1]["DEL_BONE_D_1"] = true;
            console.log("bone_d 10");
        }
        if (del_shiba + del_pag + del_dalmatian + del_corgi + del_labrador >= 500) {
            PLAYER_DATA[ACHIEVE_LIST][PZL1]["DEL_BONE_D_1"] = true;
            console.log("bone_d 10");
        }

        console.log("ACHIEVE CHECK END.");

    }

    /**
     * アイコンがアイテムかどうかを判別する
     * @param {int} _type アイコンのタイプ
     * @returns アイテムかどうか
     */
    static isItem(_type) {
        return _type >= CONST_PZL1.DOG_NUM;
    }

}
