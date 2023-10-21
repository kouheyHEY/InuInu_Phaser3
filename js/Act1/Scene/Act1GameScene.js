class Act1GameScene extends BaseScene {
    constructor() {
        super(COMMON.ACT1GAMESCENE);

        // フラグの設定
        // マップ作成完了フラグ
        this.generateMapFlg = false;
    }

    create() {

        // マネージャの作成
        this.gameManager = new Act1GameManager(this);
        this.fieldManager = new FieldManager(this);

        // パラメータの初期化
        this.gameManager.initParameter();

        // マップの生成
        // マップとなるファイルの選択
        this.fieldManager.loadMapDataFromCsv();

    }

    update() {
        // マップがロードされていない場合、処理を中止
        if (!this.fieldManager.hasMapData()) {
            return;
        }

        // マップからオブジェクトを生成する
        if (!this.generateMapFlg) {
            this.gameManager.generateAllObject(this.fieldManager.field);
            console.log("map generate complete");
            this.generateMapFlg = true;
        }

    }

    drawMap() {

    }
}