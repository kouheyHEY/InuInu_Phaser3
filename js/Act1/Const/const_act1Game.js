// プログラム上のスプライトのタイプ
CONST_ACT1.SPRITETYPE = {
    PLAYER: "PLAYER",
    ENEMY: "ENEMY",
    ITEM_FOOD: "ITEM_FOOD",
    GROUND_OUTSIDE: "GROUND_OUTSIDE",
    GROUND_INSIDE: "GROUND_INSIDE",
    GROUND_BLOCK_NORMAL: "GROUND_BLOCK_NORMAL"
};

// マップデータの各オブジェクトを表す文字列
CONST_ACT1.SPRITETYPE_MAP = {
    EMPTY: "0",
    PLAYER: "p",
    ENEMY: "e",
    ITEM_FOOD: "f",
    GROUND_OUTSIDE: "1",
    GROUND_INSIDE: "2",
    GROUND_BLOCK_NORMAL: "3",
}

// ファイル選択時のinput要素を生成するdivタグのID
CONST_ACT1.INPUT_ID = "input-dummyId";
// ポインタを使用したアクションを起こす際の、ポインタの必要移動距離
CONST_ACT1.POINTER_ACT_DIST = 60;
// ポインタのアンカーの図形
CONST_ACT1.POINTER_ANCHOR = {
    COLOR: 0xD0D0D0,
    ALPHA: 0.3,
    RADIUS: 60,
    WEIGHT: 2,
    FADEINTIME: 200,
}

CONST_ACT1.POINTER = {
    COLOR: 0xF4F4F4,
    ALPHA: 0.8,
    RADIUS: 20,
    WEIGHT: 2,
    FADEINTIME: 200,
}

// 体力の初期値
CONST_ACT1.HP = {
    PLAYER: 1000,
};
// 体力の減少値
CONST_ACT1.HPCOST = {
    JUMP: 100,
    MOVE: 1,
}
// 体力の回復量
CONST_ACT1.HPRECOVER = {
    ITEM_FOOD: 400,
}
// 体力ゲージ
CONST_ACT1.PLAYER_HPBAR = {
    LABEL: "HP:",
    LABELX: 20,
    LABELY: 20,
    LABELSIZE: 20,
    LABELCOLOR: "#ffffff",
    X: 60,
    Y: 20,
    WIDTH: 200,
    HEIGHT: 20,
    COLOR: 0x00ff00,
    BGCOLOR: 0x808080,
};

// スプライト物理演算用の各プロパティ
CONST_ACT1.GRAVITY = 768;
CONST_ACT1.MAXSPEED = {
    PLAYER: 384,
};

// 最低速度
CONST_ACT1.MINSPEED = {
    PLAYER: 10,
}
// 加速度
CONST_ACT1.ACCELERATION = {
    PLAYER: 512
}
// 減速率
CONST_ACT1.DRAG = {
    PLAYER: 0.01,
}
CONST_ACT1.JUMPSPEED = {
    PLAYER: 512,
}

// スプライトの向き
CONST_ACT1.DIRECTION = {
    RIGHT: 1,
    LEFT: -1
}
