// Phaser3の設定データ
const config = {
    type: Phaser.AUTO,

    // 画面の幅
    width: COMMON.D_WIDTH,

    // 画面の高さ
    height: COMMON.D_HEIGHT,

    // アンチエイリアス
    antialias: true,

    // シーン設定
    scene: [
        PreLoadScene,
        GameScene
    ],

    // フレームレート設定
    fps: 60,

    // fps: {
    //     target: 60,
    //     forceSetTimeOut: true
    // },

    physics: {
        default: "arcade",
        arcade: {
            // スプライトに緑の枠を表示
            // 物理演算ボディに紫の枠を表示
            debug: true,
        }
    },
}

// ゲームの開始
const phaser = new Phaser.Game(config);
// PreloadSceneを開始
phaser.scene.add('PreloadScene', COMMON.PRELOADSCENE, true);

function preload() {
}

function create() {
}

function update() {
}