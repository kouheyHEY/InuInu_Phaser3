// ベースエンティティ
class BaseEntity extends Phaser.GameObjects.Sprite {
    constructor(_scene, _x, _y, _texture) {
        super(_scene, _x, _y, _texture);
        _scene.add.existing(this);

        // 共通のプロパティや初期化処理
        this.debugMode = false;
    }

    // その他共通のメソッドを追加
    /**
     * デバッグモードを有効にする
     * @param {Phaser.Game} _game ゲームオブジェクト
     */
    setDebugMode(_game) {
        this.debugMode = _game.config.debug;
    }
}

// ベースシーン
class BaseScene extends Phaser.Scene {
    /**
     * コンストラクタ
     */
    constructor(_sceneName) {
        super({ key: _sceneName });
    }

    /**
     * 文字列を画面上に追加しセットする
     * @param {string} _text 追加する文字列
     * @param {int} _x 文字列のx座標
     * @param {int} _y 文字列のy座標
     * @param {int} _fontSize 文字列のサイズ
     * @param {int} _color 文字列の色
     */
    setText(_text, _x, _y, _fontSize, _color = "#000000") {
        return this.add.text(_x, _y, _text).setFontSize(_fontSize).setFill(_color);
    }

    preload() { }

    create() { }

    update() { }
}

