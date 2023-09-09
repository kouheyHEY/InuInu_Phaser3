// Phaser3の設定データ
const config = {
    type: Phaser.AUTO,

    // 画面の幅
    width: COMMON_CONST.D_WIDTH,

    // 画面の高さ
    height: COMMON_CONST.D_HEIGHT,

    // アンチエイリアス
    antialias: true,

    // シーン設定
    scene: [
        GameLoadScene,
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
            // 重力の方向と強さ
            gravity: {
            }
        }
    },
}

// ゲームの開始
const phaser = new Phaser.Game(config);

function preload() {
}

function create() {
}

function update() {
}