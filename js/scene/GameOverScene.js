class GameOverScene extends BaseScene {
    constructor() {
        super(COMMON.GAMEOVERSCENE);
    }

    create() {
        // ゲームオーバーテキストを画面中央に配置
        const gameOverText = this.add.text(SCR_WIDTH / 2, SCR_HEIGHT / 2 - 50, 'Game Over', {
            fontSize: '48px',
            fill: '#ffffff',
        }).setOrigin(0.5);

        // リトライボタンを画面中央に配置
        const retryButton = this.add.text(SCR_WIDTH / 2, SCR_HEIGHT / 2 + 50, 'Retry', {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: {
                x: 20,
                y: 10
            },
        }).setOrigin(0.5);

        // ボタンにクリックイベントを追加
        retryButton.setInteractive();
        retryButton.on('pointerup', () => {
            this.scene.start('GameScene'); // ゲームを再開
        });
    }
}
