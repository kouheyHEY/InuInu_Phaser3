class Act1GameManager {
    constructor(scene) {
        this.scene = scene;
        // プレイヤー
        this.player = null;
        // 敵グループ
        this.enemyGroup = this.scene.physics.add.group();
        // アイテムグループ
        this.itemGroup = this.scene.physics.add.group();
    }

    /**
     * 各パラメータの初期化
     */
    initParameter() {

    }
}