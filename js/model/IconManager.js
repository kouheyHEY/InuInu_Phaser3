class IconManager {
    constructor(_scene) {
        this.scene = _scene;

        // 更新対象のアイコン
        this.updateIconList = [];
    }

    /**
     * 
     * @param {Phaser.GameObject.Sprite} _object アイコンを表示する対象
     * @param {string}  _iconName アイコンの種類 
     */
    dispIcon(_object, _iconName) {
        if (_object == null) {
            // 対象がなしの場合

        } else {
            // 対象がありの場合
            // アイコンを表示する
            let icon = this.scene.add.image(0, 0, _iconName);
            icon.setScale(0.8);
            // 右上に表示するために原点を変更する
            icon.setOrigin(-1.2, 0.5);
            icon.x = _object.body.x;
            icon.y = _object.body.y;

            // アイコンの追尾設定
            icon.update = () => {
                this.homingIcon(_object, icon, _object.body.width, 0);
            }
            this.updateIconList.push(icon);

            // 一定時間後にアイコンを削除する
            let dispDuration = GSCONST.ICON_DISP_DURATION.SPEED;
            this.scene.time.delayedCall(dispDuration, () => {
                icon.destroy();
            });
        }
    }

    /**
     * アイコンをターゲットに追尾させる
     * @param {Phaser.GameObject.Sprite} _target 追尾対象
     * @param {Phaser.GameObject.Image} _icon 対象アイコン
     * @param {int} _offsetX 相対位置X
     * @param {int} _offsetY 相対位置Y
     */
    homingIcon(_target, _icon, _offsetX, _offsetY) {
        _icon.x = _target.body.x;
        _icon.y = _target.body.y;
    }

    update() {
        this.updateIconList.forEach(icon => {
            icon.update();
        });
    }
}