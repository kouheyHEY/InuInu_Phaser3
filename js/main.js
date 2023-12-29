// Phaser3の設定データ
const config = {
    type: Phaser.AUTO,

    // // 画面の幅
    // width: COMMON.D_WIDTH,

    // // 画面の高さ
    // height: COMMON.D_HEIGHT,

    scale: {
        // スケールモードをリサイズに設定
        mode: Phaser.Scale.RESIZE,
        // レンダリングする要素のID
        parent: 'phaser-game',
        // ゲーム画面を中央に配置
        autoCenter: Phaser.Scale.CENTER_BOTH,
        // 画面の幅
        width: COMMON.D_WIDTH,
        // 画面の高さ
        height: COMMON.D_HEIGHT,
    },

    // アンチエイリアス
    // antialias: true,
    pixelArt: false,

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

// プレイヤーのデータの取得
let PLAYER_DATA_JSON = localStorage.getItem(PLAYER_DATA_KEY);
var PLAYER_DATA = null;
// プレイヤーのデータがローカルストレージに存在しない場合は、新規に作成
if (PLAYER_DATA_JSON === null) {
    console.log("START MAKING PLAYERDATA.");
    PLAYER_DATA = {};

    for (let key of PLAYER_DATA_KEY_LIST) {
        PLAYER_DATA[key] = {};
        // 実績一覧を作成
        if (key === ACHIEVE_LIST) {
            // ゲームカテゴリごとの実績
            for (const [key_game] of Object.entries(ACHIEVE_LIST_STR)) {
                PLAYER_DATA[key][key_game] = {};
                // 実績一覧の初期生成
                for (const [key_achieve] of Object.entries(ACHIEVE_LIST_STR[key_game])) {
                    PLAYER_DATA[key][key_game][key_achieve] = false;
                }
            }
        }
    }
    // ローカルストレージに保存
    localStorage.setItem(PLAYER_DATA_KEY, JSON.stringify(PLAYER_DATA));

    console.log("END MAKING PLAYERDATA.");
} else {
    console.log("START LOADING PLAYERDATA.");
    // JSON形式から復元
    PLAYER_DATA = JSON.parse(PLAYER_DATA_JSON);
    console.log("END LOADING PLAYERDATA.");
}

// 画面サイズの取得
var SCR_WIDTH = COMMON.D_WIDTH;
var SCR_HEIGHT = COMMON.D_HEIGHT;

// ゲームインスタンスの作成
const phaser = new Phaser.Game(config);
