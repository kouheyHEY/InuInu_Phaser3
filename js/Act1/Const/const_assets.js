// 画像ファイルのディレクトリ
CONST_ACT1.DIR = {
    DIR_ASSETS: "../assets",
    DIR_IMG: "../assets/img/dogRunAdv",
    DIR_MAP: "../Data/map"
};

// 各画像ファイルのファイル名
CONST_ACT1.IMGNAME = {
    GROUND_INSIDE: "ground_inside.png",
    GROUND_OUTSIDE: "ground_outside.png",
    GROUND_BLOCK_NORMAL: "ground_block_normal.png",
    ITEM_FOOD: "item_food.png",
    ICON_SKILL_1: "icon_skill_1.png",
    ICON_ARROW_1: "icon_arrow_1.png",
    ANIM_PLAYER_STOP: "dog_shiba_stop.png",
    ANIM_ENEMY_NORMAL: "enemy_1.png",
    WEAPON_BONE: "weapon_bone.png",
};

// 各画像ファイルのファイルID
CONST_ACT1.IMGID = {
    GROUND_INSIDE: "GROUND_INSIDE",
    GROUND_OUTSIDE: "GROUND_OUTSIDE",
    GROUND_BLOCK_NORMAL: "GROUND_BLOCK_NORMAL",
    ITEM_FOOD: "ITEM_FOOD",
    ICON_SKILL_1: "ICON_SKILL_1",
    ICON_ARROW_1: "ICON_ARROW_1",
    ANIM_PLAYER_STOP: "ANIM_PLAYER_STOP",
    ANIM_ENEMY_NORMAL: "ANIM_ENEMY_NORMAL",
    WEAPON_BONE: "WEAPON_BONE",
};

// 各アニメーションの識別用キー
CONST_ACT1.ANIMKEY = {
    PLAYER_STOP: "PLAYER_STOP",
    ENEMY_NORMAL: "ENEMY_NORMAL",
}

CONST_ACT1.ANIMFRAMENUM = {
    PLAYER_STOP: 4,
    ENEMY_NORMAL: 2
}
CONST_ACT1.ANIMFRAMERATE = {
    PLAYER_STOP: 6,
    ENEMY_NORMAL: 4,
}

CONST_ACT1.SIZE = {
    PLAYER:
        { WIDTH: 96, HEIGHT: 96 },
    ENEMY:
        { WIDTH: 64, HEIGHT: 64 },
    WEAPON:
        { WIDTH: 32, HEIGHT: 32 },
    ITEM:
        { WIDTH: 48, HEIGHT: 48 },
    GROUND:
        { WIDTH: 48, HEIGHT: 48 },
    ICON_ARRAY:
        { WIDTH: 24, HEIGHT: 24 },
    ICON_SKILL:
        { WIDTH: 24, HEIGHT: 24 },
};

// マップファイルのファイル名リスト
CONST_ACT1.INPUT_MAP = [
    "map_0101.csv",
    "map_0102.csv",
];
