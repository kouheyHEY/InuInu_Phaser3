class FieldManager {
    constructor(scene) {

        // フィールドを表す配列
        this.field = [];
        // シーン
        this.scene;
        // フィールド上の足場のグループ
        this.groundGroup = this.scene.physics.add.group();
    }

    loadMapDataCsv() {

    }

}