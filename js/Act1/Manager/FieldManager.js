class FieldManager {
    constructor(scene) {

        // フィールドを表す配列
        this.field = [];
        // シーン
        this.scene = scene;
    }

    /**
     * マップファイルからマップデータを生成する
     * @param {string} _fileName ファイル名
     */
    loadMapDataFromCsv(_fileName = null) {
        // ファイル名が指定されなかった場合
        if (_fileName == null) {
            // ファイルはランダムに選択される
            _fileName = CONST_ACT1.INPUT_MAP[0];
        }

        // 読み込むファイル
        let mapFilePath = CONST_ACT1.DIR.DIR_MAP + "/" + _fileName;

        // ファイル名から配列を生成
        this.field = FileUtil.loadCsvToArray(mapFilePath);
    }

    /**
     * マップデータがロードされているか判定
     * @returns {boolean} true: ロード済
     */
    hasMapData() {
        return this.field.length != 0;
    }

}