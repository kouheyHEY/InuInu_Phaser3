class InfoArea extends BaseArea {
    constructor(scene) {
        super(scene);
        this.scoreText;
        this.timeText;
    }

    createArea() {
        let g = this.scene.add.graphics();
        g.lineStyle(
            GS_SCREEN_COSNT.COMMON_STROKE_WEIGHT,
            GS_SCREEN_COSNT.COMMON_COLOR_STROKE,
            1
        );
        // 情報表示エリア
        g.fillStyle(GS_SCREEN_COSNT.COMMON_COLOR_AREA, 1)
            .fillRect(
                GS_SCREEN_COSNT.X_INFOAREA,
                GS_SCREEN_COSNT.Y_INFOAREA,
                GS_SCREEN_COSNT.W_INFOAREA,
                GS_SCREEN_COSNT.H_INFOAREA,
            ).strokeRect(
                GS_SCREEN_COSNT.X_INFOAREA + GS_SCREEN_COSNT.COMMON_STROKE_WEIGHT / 2,
                GS_SCREEN_COSNT.Y_INFOAREA + GS_SCREEN_COSNT.COMMON_STROKE_WEIGHT / 2,
                GS_SCREEN_COSNT.W_INFOAREA - GS_SCREEN_COSNT.COMMON_STROKE_WEIGHT,
                GS_SCREEN_COSNT.H_INFOAREA - GS_SCREEN_COSNT.COMMON_STROKE_WEIGHT
            );

        // テキストの初期化
        this.scoreText =
            this.scene.add.text(
                GS_TEXT_CONST.X_SCORE,
                GS_TEXT_CONST.Y_SCORE,
                GS_TEXT_CONST.COL_SCORE + "0",
                { fontSize: '32px', fill: '#000', fontFamily: 'Bit12Bold' }
            );

        this.timeText =
            this.scene.add.text(
                GS_TEXT_CONST.X_TIME,
                GS_TEXT_CONST.Y_TIME,
                GS_TEXT_CONST.COL_TIME + "0",
                { fontSize: '32px', fill: '#000', fontFamily: 'Bit12Bold' }
            );
    }

    /**
     * 現在のスコアを更新する
     * @param {int} _score 現在のスコア
     */
    updateScore(_score) {
        this.scoreText.setText(GS_TEXT_CONST.COL_SCORE + `${_score}`);
    }
}