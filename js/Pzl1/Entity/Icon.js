class Icon extends BaseEntity {
    constructor(scene, x, y, texture, type, row, col, grid = null, clickable = true) {
        super(scene, x, y, texture);
        scene.add.existing(this);

        // アイコンの種類
        this.type = type;

        //　アイコンの位置
        this.row = row;
        this.col = col;

        // グリッド
        /** @type {Grid} */
        this.grid = grid;

        this.clickable = clickable

        // アイコンをタップしたときの処理を追加
        this.setInteractive();
        this.on('pointerdown', this.onIconClicked, this);

        // アイテムかどうかを判別
        this.isItem = false;

        // その他フラグ設定
        this.playableAnimationFlg = false;

    }

    onIconClicked() {
        // アイコンがタップされたときの処理を追加
        if (this.clickable) {
            this.grid.selectIcon(this.row, this.col, this.type);
        }
    }

    setThisItem() {
        this.isItem = true;
    }

    /**
     * アニメーションを設定する
     */
    setAnimation() {
        // アイコン消去時のアニメーションを作成
        this.anims.create({
            key: ANIMKEY.EFFECT_DELETEICON,  // アニメーションの識別キー
            frames: this.anims.generateFrameNumbers(
                IMGID.ANIM_EFFECT_DELETEICON,
                {
                    start: 0,
                    end: ANIMFRAMENUM.EFFECT_DELETEICON
                }
            ),
            frameRate: ANIMFRAME.EFFECT_DELETEICON,
            repeat: 0
        });

        this.playableAnimationFlg = true;
    }

    /**
     * アニメーションを再生する
     */
    startAnimation() {
        // アニメーション再生可能なら再生する
        if (this.playableAnimationFlg) {
            this.anims.play(ANIMKEY.EFFECT_DELETEICON, true);
        }
    }
}
