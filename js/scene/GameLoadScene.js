class GameLoadScene extends Phaser.Scene {
    /**
     * コンストラクタ
     */
    constructor() {
        super({ key: COMMON_CONST.GAMELOADSCENE });
    }

    /**
     * GameSceneで使用する画像やスプライトシートを読み込む
     */
    preload() {
        // 各画像の読み込み
        this.load.image(IMG_CONST.BLOCK, DIR_CONST.DIR_IMG + "/" + IMGNAME_CONST.BLOCK);
        this.load.image(IMG_CONST.FLOOR, DIR_CONST.DIR_IMG + "/" + IMGNAME_CONST.FLOOR);
        this.load.image(IMG_CONST.BREAD, DIR_CONST.DIR_IMG + "/" + IMGNAME_CONST.BREAD);
        this.load.image(IMG_CONST.BREADCRUMS, DIR_CONST.DIR_IMG + "/" + IMGNAME_CONST.BREADCRUMS);
        this.load.image(IMG_CONST.MINICOW, DIR_CONST.DIR_IMG + "/" + IMGNAME_CONST.MINICOW);
        this.load.image(IMG_CONST.MILK, DIR_CONST.DIR_IMG + "/" + IMGNAME_CONST.MILK);

        this.load.image(IMG_CONST.ICON.SPEEDUP, DIR_CONST.DIR_IMG + "/" + IMGNAME_CONST.ICON.SPEEDUP);
        this.load.image(IMG_CONST.ICON.SPEEDDOWN, DIR_CONST.DIR_IMG + "/" + IMGNAME_CONST.ICON.SPEEDDOWN);

        // 各スプライトシートの読み込み
        // プレイヤー
        this.load.spritesheet(
            IMG_CONST.PLAYER_RIGHT,
            DIR_CONST.DIR_IMG + "/" + IMGNAME_CONST.PLAYER_RIGHT,
            {
                frameWidth: GSCONST.PLAYER_WIDTH,
                frameHeight: GSCONST.PLAYER_HEIGHT
            }
        );

        // 敵
        this.load.spritesheet(
            IMG_CONST.ENEMY_RIGHT,
            DIR_CONST.DIR_IMG + "/" + IMGNAME_CONST.ENEMY_RIGHT,
            {
                frameWidth: GSCONST.ENEMY_WIDTH,
                frameHeight: GSCONST.ENEMY_HEIGHT
            }
        );
    }

    create() {
    }

    update() {
        // シーンの切り替え
        this.scene.switch(COMMON_CONST.GAMESCENE);
    }
}