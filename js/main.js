// Phaser3の設定データ
const config = {
    type: Phaser.AUTO,

    // 画面の幅
    width: COMMON.D_WIDTH,

    // 画面の高さ
    height: COMMON.D_HEIGHT,

    scale: {
        mode: Phaser.Scale.RESIZE, // スケールモードをリサイズに設定
        parent: 'phaser-game', // レンダリングする要素のID
        autoCenter: Phaser.Scale.CENTER_BOTH // ゲーム画面を中央に配置
    },

    // アンチエイリアス
    antialias: true,

    // シーン設定
    scene: [
        Stt1TitleScene,
        Pzl1PreLoadScene,
        Pzl1GameScene,
        Pzl1GameOverScene,
        Act1PreLoadScene,
        Act1GameScene,
        Act1GameOverScene
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
            gravity: {
                y: CONST_ACT1.GRAVITY,
            },
            // スプライトに緑の枠を表示
            // 物理演算ボディに紫の枠を表示
            // debug: true,
        },
    },

}

var SCR_WIDTH = COMMON.D_WIDTH;
var SCR_HEIGHT = COMMON.D_HEIGHT;

const phaser = new Phaser.Game(config);
