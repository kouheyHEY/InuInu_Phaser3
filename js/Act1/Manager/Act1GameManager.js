class Act1GameManager {
    constructor(scene) {
        this.scene = scene;
        // プレイヤー
        this.player = null;
        // 敵グループ
        this.enemyGroup = this.scene.physics.add.group();
        // アイテムグループ
        this.itemGroup = this.scene.physics.add.group();
        // フィールド上の足場のグループ
        this.groundGroup = this.scene.physics.add.group();
    }

    /**
     * 各パラメータの初期化
     */
    initParameter() {

        // プレイヤー
        if (this.player != null) {
            this.player.destroy();
        }
        this.player = null;

        // 敵グループ
        this.enemyGroup.clear(true, true);
        // アイテムグループ
        this.itemGroup.clear(true, true);
        // フィールド上の足場のグループ
        this.groundGroup.clear(true, true);
    }

    /**
     * マップデータからオブジェクトを生成する。
     */
    generateAllObject(_mapData) {

        for (let i = 0; i < _mapData.length; i++) {
            for (let j = 0; j < _mapData[i].length; j++) {
                let dataType = _mapData[i][j];
                let x = (j + 0.5) * CONST_ACT1.SIZE.GROUND.WIDTH;
                let y = (i + 0.5) * CONST_ACT1.SIZE.GROUND.HEIGHT;

                if (dataType == CONST_ACT1.SPRITETYPE_MAP.GROUND_BLOCK_NORMAL) {
                    // 足場（ブロック）の場合
                    console.log("generate ground_block");

                    let ground = new Ground(
                        this.scene,
                        x,
                        y,
                        CONST_ACT1.SPRITETYPE.GROUND_BLOCK_NORMAL,
                        CONST_ACT1.IMGID.GROUND_BLOCK_NORMAL
                    );
                    this.groundGroup.add(ground);
                } else if (dataType == CONST_ACT1.SPRITETYPE_MAP.PLAYER) {
                    // プレイヤーの場合
                    console.log("generate player");
                    if (this.player == null) {

                        this.player = new Player(
                            this.scene,
                            x + CONST_ACT1.SIZE.GROUND.WIDTH / 2,
                            y + CONST_ACT1.SIZE.GROUND.HEIGHT / 2,
                            CONST_ACT1.SPRITETYPE.PLAYER,
                            CONST_ACT1.IMGID.ANIM_PLAYER_STOP
                        );
                    }

                } else if (dataType == CONST_ACT1.SPRITETYPE_MAP.GROUND_OUTSIDE) {
                    // 足場（表面）の場合
                    console.log("generate grount_outside");

                    let ground = new Ground(
                        this.scene,
                        x,
                        y,
                        CONST_ACT1.SPRITETYPE.GROUND_OUTSIDE,
                        CONST_ACT1.IMGID.GROUND_OUTSIDE
                    );
                    this.groundGroup.add(ground);
                } else if (dataType == CONST_ACT1.SPRITETYPE_MAP.GROUND_INSIDE) {
                    // 足場（内部）の場合
                    console.log("generate grount_inside");

                    let ground = new Ground(
                        this.scene,
                        x,
                        y,
                        CONST_ACT1.SPRITETYPE.GROUND_INSIDE,
                        CONST_ACT1.IMGID.GROUND_INSIDE
                    );
                    this.groundGroup.add(ground);
                }
            }
        }
    }
}