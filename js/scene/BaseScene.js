class BaseScene extends Phaser.Scene {
    /**
     * コンストラクタ
     */
    constructor(sceneName) {
        super({ key: sceneName });
    }

    /**
     * 各画像やスプライトシートを読み込む
     */
    loadImg() {
        // 各画像の読み込み
        // this.load.image(IMG_REV_ALL, DIR_IMG + "/" + FNAME_IMG_REV_ALL);

        // 各スプライトシートの読み込み
        // this.load.spritesheet("slime", "assets/img/slime_spriteSheet.png", {
        //     frameWidth: UNIT_SIZE,
        //     frameHeight: UNIT_SIZE
        // });
    }

    /**
     * 文字列を画面上に追加しセットする
     * @param {string} _text 追加する文字列
     * @param {int} _x 文字列のx座標
     * @param {int} _y 文字列のy座標
     * @param {int} _fontSize 文字列のサイズ
     * @param {int} _color 文字列の色
     * @param {boolean} _isBold 太字かどうか
     */
    setText(_text, _x, _y, _fontSize, _color, _isBold) {
        return this.add.text(_x, _y, _text).setFontSize(_fontSize).setFill(_color).setFontFamily(_isBold ? "Bit12Bold" : "Bit12");
    }

    preload() {
    }

    create() {
    }

    update() {
    }
}