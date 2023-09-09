class Item extends Phaser.GameObjects.Sprite {
    /**
     * コンストラクタ
     * @param {string} scene シーン名
     * @param {int} x 初期x座標
     * @param {int} y 初期y座標
     * @param {string} objName オブジェクトID
     */
    constructor(scene, x, y, objName) {
        super(scene, x, y, objName);

        // 物理エンジンの設定
        scene.physics.world.enable(this);
        scene.add.existing(this);
        // 物理演算エリアの設定
        this.body.setSize(GSCONST.ITEM_WIDTH, GSCONST.ITEM_HEIGHT);
        this.body.setOffset(0, 0);

        // 重力の設定
        // this.body.gravity.y = GSCONST.GRAVITY;
    }
}