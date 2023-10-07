// アイコンの種類
const ICONTYPE = [
    IMGID.DOG_SHIBA,
    IMGID.DOG_PAG,
    IMGID.DOG_DALMATIAN,
    IMGID.DOG_CORGI,
    IMGID.DOG_LABRADOR
]

// 制限時間表示位置
const TIMEINFO = {
    INITTIME: 30,
    X: 16,
    Y: 40
}

// アイコン消去数の表示位置
const DELETEINFO = {
    X: 208,
    WIDTH: 160,
    Y: ICON_DELETEINFO.HEIGHT / 2 + 16,
}

// ボーナスアイコン表示位置
const BONUSINFO = {
    WIDTH: 180,
    Y: ICON_DELETEINFO.HEIGHT / 2 + 16
}

const ICONFADEIN = {
    TIME: 200,
    YDIST: ICON.HEIGHT / 2,
}

const ICONDELETE = {
    TIME: 200,
}

const ICONFALL = {
    TIME: 300,
}