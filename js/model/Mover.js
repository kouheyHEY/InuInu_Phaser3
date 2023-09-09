class Mover extends Phaser.GameObjects.Sprite {
    /**
     * コンストラクタ
     * @param {Phaser.Scene} scene シーン名
     * @param {int} x 初期x座標
     * @param {int} y 初期y座標
     */
    constructor(scene, x, y, objName) {
        super(scene, x, y, objName);
    }

    /**
     * 右への移動処理
     */
    moveRight() {
    }

    /**
     * 左への移動処理
     */
    moveLeft() {
    }

    /**
     * ジャンプする
     */
    jump() {
    }

    /**
     * 更新処理
     */
    update() {

    }

    /**
     * アニメーションを設定する
     */
    setAnimation() { }
}