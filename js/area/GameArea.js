class GameArea extends BaseArea {
    constructor(scene) {
        super(scene);
    }

    createArea() {
        let g = this.scene.add.graphics();
        // ゲームエリア
        g.fillStyle(GS_SCREEN_COSNT.COLOR_GAMEAREA, 1)
            .fillRect(
                GS_SCREEN_COSNT.X_GAMEAREA,
                GS_SCREEN_COSNT.Y_GAMEAREA,
                GS_SCREEN_COSNT.W_GAMEAREA,
                GS_SCREEN_COSNT.H_GAMEAREA,
            );
    }
}