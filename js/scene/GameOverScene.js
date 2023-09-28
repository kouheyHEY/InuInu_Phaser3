class GameOverScene extends BaseScene {
    constructor() {
        super(COMMON.GAMEOVERSCENE);
    }

    create() {
        this.cameras.main.setBackgroundColor(COMMON.BGCOLOR_DEFAULT);
        // ゲームオーバーテキストを画面中央に配置
        const gameOverText = this.setText('Game Over', SCR_WIDTH / 2, SCR_HEIGHT / 2 - 50, COMMON.FONTSIZE_GAMEOVER, COMMON.FONTCOLOR_DEFAULT);
        gameOverText.setOrigin(0.5).setFontFamily(COMMON.FONTSTYLE_BOLD);

        // リトライボタンを画面中央に配置
        const retryButton = this.setText('Retry', SCR_WIDTH / 2, SCR_HEIGHT / 2 + 50, COMMON.FONTSIZE_RETRY, COMMON.FONTCOLOR_DEFAULT);
        retryButton.setOrigin(0.5).setFontFamily(COMMON.FONTSTYLE_NORMAL);
        retryButton.setStyle({
            padding: {
                x: 0,
                y: 0
            }
        });

        // ボタンにクリックイベントを追加
        retryButton.setInteractive();
        retryButton.on('pointerup', () => {
            this.scene.start('GameScene'); // ゲームを再開
        });
    }
}
