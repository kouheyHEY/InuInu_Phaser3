class Act1GameOverScene extends BaseScene {
    constructor() {
        super(COMMON.ACT1GAMEOVERSCENE);
    }

    create() {
        this.cameras.main.setBackgroundColor(CONST_PZL1.COMMON_PZL1.BGCOLOR_DEFAULT);
        // ゲームオーバーテキストを画面中央に配置
        const gameOverText = this.setText(
            'Game Over',
            SCR_WIDTH / 2,
            SCR_HEIGHT / 2 - 50,
            CONST_PZL1.COMMON_PZL1.FONTSIZE_GAMEOVER,
            CONST_PZL1.COMMON_PZL1.FONTCOLOR_DEFAULT
        );
        gameOverText.setOrigin(0.5).setFontFamily(CONST_PZL1.COMMON_PZL1.FONTSTYLE_BOLD);

        // リトライボタンを画面中央に配置
        const retryButton = this.setText(
            'Retry',
            SCR_WIDTH / 2,
            SCR_HEIGHT / 2 + 50,
            CONST_PZL1.COMMON_PZL1.FONTSIZE_RETRY,
            CONST_PZL1.COMMON_PZL1.FONTCOLOR_DEFAULT
        );
        retryButton.setOrigin(0.5).setFontFamily(CONST_PZL1.COMMON_PZL1.FONTSTYLE_NORMAL);
        retryButton.setStyle({
            padding: {
                x: 0,
                y: 0
            }
        });

        // ボタンにクリックイベントを追加
        retryButton.setInteractive();
        retryButton.on('pointerup', () => {
            this.scene.start('Pzl1GameScene'); // ゲームを再開
        });
    }
}
