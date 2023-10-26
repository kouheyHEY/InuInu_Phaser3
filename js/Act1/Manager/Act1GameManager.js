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
        this.groundGroup = this.scene.physics.add.staticGroup();
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

                    this.groundGroup.create(x, y, CONST_ACT1.IMGID.GROUND_BLOCK_NORMAL);

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

                    // プレイヤーの速度設定
                    this.player.body.setMaxVelocityX(CONST_ACT1.MAXSPEED.PLAYER);

                } else if (dataType == CONST_ACT1.SPRITETYPE_MAP.GROUND_OUTSIDE) {
                    // 足場（表面）の場合
                    console.log("generate ground_outside");

                    this.groundGroup.create(x, y, CONST_ACT1.IMGID.GROUND_OUTSIDE);

                } else if (dataType == CONST_ACT1.SPRITETYPE_MAP.GROUND_INSIDE) {
                    // 足場（内部）の場合
                    console.log("generate ground_inside");

                    this.groundGroup.create(x, y, CONST_ACT1.IMGID.GROUND_INSIDE);

                } else if (dataType == CONST_ACT1.SPRITETYPE_MAP.ITEM_FOOD) {
                    // アイテム（餌）の場合
                    console.log("generate item_food");

                    this.itemGroup.add(new Item(
                        this.scene,
                        x,
                        y,
                        CONST_ACT1.SPRITETYPE.ITEM_FOOD,
                        CONST_ACT1.IMGID.ITEM_FOOD
                    ));
                }
            }
        }

        // 衝突判定の設定
        // プレイヤーと足場の衝突
        this.scene.physics.add.collider(this.player, this.groundGroup, (p, g) => {
            // 上からの衝突の場合
            if (p.body.touching.down) {
                // 接地フラグの設定
                p.onGround = true;
            }
        });

        // プレイヤーとアイテムの衝突
        this.scene.physics.add.overlap(this.player, this.itemGroup, (p, i) => {

            // フードの場合
            if (i.type == CONST_ACT1.SPRITETYPE.ITEM_FOOD) {
                // プレイヤーの体力を回復する
                this.player.recoverHP(CONST_ACT1.HPRECOVER.ITEM_FOOD);
                // アイテムの消滅
                i.destroy();
            }
        });

    }
}