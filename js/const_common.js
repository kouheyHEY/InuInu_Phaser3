/* 全シーン共通変数 */
const COMMON = {
    // 画面サイズ（デフォルト）
    D_WIDTH: 720,
    D_HEIGHT: 960,

    // fps
    FPS: 60,

    // シーンのID
    STT1TITLESCENE: "Stt1TitleScene",
    PZL1PRELOADSCENE: "Pzl1PreLoadScene",
    PZL1GAMESCENE: "Pzl1GameScene",
    PZL1GAMEOVERSCENE: "Pzl1GameOverScene",
    ACT1PRELOADSCENE: "Act1PreLoadScene",
    ACT1GAMESCENE: "Act1GameScene",
    ACT1GAMEOVERSCENE: "Act1GameOverScene",

};

// プレイヤーのデータ
const PLAYER_DATA_KEY = "PLAYER_DATA_KEY";
const ACHIEVE_LIST = "ACHIEVE_LIST";
const PLAYER_DATA_KEY_LIST = [
    ACHIEVE_LIST
];
// 実績リスト
const ACHIEVE_LIST_CATEGORY_STR = {
    PZL1: "犬パズル",
    ACT1: "犬ラン"
}

const ACHIEVE_LIST_STR = {
    PZL1: {
        DEL_SHIBA_1: "柴犬を100匹消去する",
        DEL_PUG_1: "パグを100匹消去する",
        DEL_DALM_1: "ダルメシアンを100匹消去する",
        DEL_CORGI_1: "コーギーを100匹消去する",
        DEL_LABRA_1: "ラブラドールを100匹消去する",
        DEL_BONE_S_1: "アイテム（ホネ）を10個消去する",
        DEL_BONE_D_1: "アイテム（ホネホネ）を10個消去する",
        DEL_ALLDOG_1: "全ての種類を合計500匹消去する",
    },
    ACT1: {
        SCORE_1: "50スコアを取得する",
        SCORE_2: "100スコアを取得する",
        SCORE_3: "200スコアを取得する",
        SCORE_4: "500スコアを取得する",
        SCORE_5: "1000スコアを取得する",
        SCORE_6: "5000スコアを取得する",
        SCORE_7: "10000スコアを取得する",
        SCORE_8: "100000スコアを取得する",
        SCORE_9: "1000000スコアを取得する",
        PLAYER_LEVEL_1: "プレイヤーのレベルを5にする",
        PLAYER_LEVEL_2: "プレイヤーのレベルを10にする",
        PLAYER_LEVEL_3: "プレイヤーのレベルを15にする",
        PLAYER_LEVEL_4: "プレイヤーのレベルを20にする",
        PLAYER_JUMP_1: "100回ジャンプする",
        PLAYER_SP_1: "SPを10000消費する",
        ENEMY_LEVEL_1: "敵のレベルを5にする",
        ENEMY_LEVEL_2: "敵のレベルを10にする",
        ENEMY_LEVEL_3: "敵のレベルを20にする",
        ENEMY_LEVEL_4: "敵のレベルを50にする",
        ENEMY_LEVEL_5: "敵のレベルを100にする",
        ENEMY_LEVEL_6: "敵のレベルを150にする",
        ENEMY_LEVEL_7: "敵のレベルを200にする",
    }
};


const CONST_STT1 = {};
const CONST_PZL1 = {};
const CONST_ACT1 = {};
