// プログラム上のスプライトのタイプ
CONST_ACT1.SPRITETYPE = {
    PLAYER: "PLAYER",
    ENEMY: "ENEMY",
    GROUND_OUTSIDE: "GROUND_OUTSIDE",
    GROUND_INSIDE: "GROUND_INSIDE",
    GROUND_BLOCK_NORMAL: "GROUND_BLOCK_NORMAL"
};

// マップデータの各オブジェクトを表す文字列
CONST_ACT1.SPRITETYPE_MAP = {
    EMPTY: "0",
    PLAYER: "p",
    ENEMY: "e",
    GROUND_OUTSIDE: "1",
    GROUND_INSIDE: "2",
    GROUND_BLOCK_NORMAL: "3"
}

// ファイル選択時のinput要素を生成するdivタグのID
CONST_ACT1.INPUT_ID = "input-dummyId";

// マップファイルのファイル名リスト
CONST_ACT1.INPUT_MAP = [
    "map_0101.csv"
];

// スプライト物理演算用の各プロパティ
CONST_ACT1.MAXSPEED = {
    PLAYER: 384,
};

CONST_ACT1.ACCELERATION = {
    PLAYER: 512
}