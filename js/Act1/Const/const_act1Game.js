// プログラム上のスプライトのタイプ
CONST_ACT1.SPRITETYPE = {
    PLAYER: "PLAYER",
    ENEMY: "ENEMY",
    ITEM_FOOD: "ITEM_FOOD",
    GROUND_OUTSIDE: "GROUND_OUTSIDE",
    GROUND_INSIDE: "GROUND_INSIDE",
    GROUND_BLOCK_NORMAL: "GROUND_BLOCK_NORMAL"
};

CONST_ACT1.ITEMTYPELIST = [
    "ITEM_FOOD"
];

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

// マップ上のアイテムの最低数
CONST_ACT1.ITEMNUM_MIN = 1;
// 敵の最低数
CONST_ACT1.ENEMYNUM_MIN = 10;
// 敵の最高数
CONST_ACT1.ENEMYNUM_MAX = 100;
// 敵の数の増加間隔（フレーム）
CONST_ACT1.ENEMYNUM_INC_FRAME = COMMON.FPS * 20;

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
// ポインタの図形
CONST_ACT1.POINTER = {
    COLOR: 0xF4F4F4,
    ALPHA: 0.8,
    RADIUS: 20,
    WEIGHT: 2,
    FADEINTIME: 200,
}

// スキルポイントの初期値
CONST_ACT1.SP = 1000;
// スキルポイントの減少値
CONST_ACT1.SPCOST = {
    NOSE: 1,
}
// スキルポイントの回復量
CONST_ACT1.SPRECOVER = {
    ITEM_FOOD: 200,
}
// スキルポイントのゲージ
CONST_ACT1.PLAYER_SPBAR = {
    LABEL: "SP:",
    LABELX: 20,
    LABELY: 20,
    LABELSIZE: 20,
    LABELCOLOR: "#ffffff",
    X: 60,
    Y: 20,
    WIDTH: 200,
    HEIGHT: 20,
    COLOR: 0x80ff00,
    BGCOLOR: 0x808080,
};
CONST_ACT1.SKILL_NOSE = {
    EFFECT_POS_DIST: 64,
}
// レベルアップに必要なSPの増加量
CONST_ACT1.SP_LVUP_INC = 20;

// レベルの表示
CONST_ACT1.PLAYER_LEVEL = {
    LABEL: "LEVEL:",
    LABELX: 270,
    LABELY: 20,
    LABELSIZE: 20,
    LABELCOLOR: "#ffffff",
};

// プレイヤーの武器の各プロパティ
CONST_ACT1.WEAPON = {
    RADIUS: {
        BONE: 128,
    },
    ROTATIONSPEED: {
        BONE: 90,
    },
    ROTATIONSPEED_LVUP_INC: 15,
    INITANGLE: 0,
    DOUBLE_LEVEL: 10,
}

// スプライト物理演算用の各プロパティ
// 重力
CONST_ACT1.GRAVITY = 1024;
// 上限速度
CONST_ACT1.MAXSPEED = {
    PLAYER: 384,
    ENEMY: 256,
};
// 最低速度
CONST_ACT1.MINSPEED = {
    PLAYER: 10,
}
// 基準速度
CONST_ACT1.STDSPEED = {
    ENEMY: 15
}
// 加速度
CONST_ACT1.ACCELERATION = {
    PLAYER: 512
}
// 減速率
CONST_ACT1.DRAG = {
    PLAYER: 0.01,
}
// ジャンプ速度
CONST_ACT1.JUMPSPEED = {
    PLAYER: 512,
    ENEMY: 256,
}

// スプライトの向き
CONST_ACT1.DIRECTION = {
    RIGHT: 1,
    LEFT: -1
}
