class ItemManager {
    constructor(scene) {
        // シーンの設定
        this.scene = scene;
        this.initParams();

        // 生成予定アイテムリスト
        this.playerItemQueue = [];
        this.enemyItemQueue = [];

        // アイテムの速度
        this.itemSpeed = -GSCONST.PLAYER_SPEED;
    }

    /**
     * 各パラメータの初期化
     */
    initParams() {
        // プレイヤー側のアイテムリスト
        this.playerItemList = [];
        this.playerItemGroup = this.scene.physics.add.group();
        // 敵側のアイテムリスト
        this.enemyItemList = [];
        this.enemyItemGroup = this.scene.physics.add.group();

        // アイテム待ちリスト
        this.playerItemQueue = [];
        this.enemyItemQueue = [];

        // アイテム生成用時間
        this.waitFrame = 0;

        // 生成用アイテムの初期設定
        // 最初に4つアイテムを生成する
        this.addItemToQueueRandom();
        this.addItemToQueueRandom();
        this.addItemToQueueRandom();
        this.addItemToQueueRandom();
    }

    /**
     * アイテムを生成し、待ちリストに追加
     */
    addItemToQueueRandom() {
        // アイテムを確率で生成
        if (Math.random() <= 0.5) {
            // 50%の確率でパンかミニ牛を待ちリストに追加
            this.addItemToQueue(IMG_CONST.BREAD);
        } else {
            this.addItemToQueue(IMG_CONST.MINICOW);
        }
    }

    /**
     * 指定したアイテムを生成し、待ちリストに追加
     * @param {string} itemName 生成するアイテムID
     */
    addItemToQueue(itemName) {
        if (
            itemName == IMG_CONST.BREAD
            || itemName == IMG_CONST.MINICOW
        ) {
            // プレイヤーアイテムの場合
            // プレイヤーアイテム待ちリストに追加
            this.playerItemQueue.push(itemName);

        } else if (
            itemName == IMG_CONST.BREADCRUMS
            || itemName == IMG_CONST.MILK
        ) {
            // 敵アイテムの場合
            // 敵のアイテム待ちリストに追加
            this.enemyItemQueue.push(itemName);
        }
    }

    /**
     * アイテムをアイテムリストに追加
     * @param {string} itemName アイテムID
     */
    addItem(itemName) {
        // アイテムの生成
        let item = new Item(
            this.scene,
            COMMON_CONST.D_WIDTH + GSCONST.ITEM_WIDTH / 2,
            COMMON_CONST.D_HEIGHT - GSCONST.FLOOR_HEIGHT - GSCONST.ITEM_HEIGHT / 2,
            itemName
        );

        // プレイヤー側のアイテムの場合
        if (itemName == IMG_CONST.BREAD
            || itemName == IMG_CONST.MINICOW
        ) {
            // リストに追加
            this.playerItemList.push(item);
            this.playerItemGroup.add(item);
        }
        // 敵側のアイテムの場合
        if (itemName == IMG_CONST.BREADCRUMS
            || itemName == IMG_CONST.MILK
        ) {
            // リストに追加
            this.enemyItemList.push(item);
            this.enemyItemGroup.add(item);
        }

        // 速度の設定
        item.body.setVelocityX(this.itemSpeed);
    }

    /**
     * アイテムを削除する
     * @param {Item} item 削除対象のアイテム
     * @param {boolean} byPlayer プレイヤーとの衝突による削除か否か
     */
    deleteItem(item, byPlayer) {
        let itemName = item.texture.key;
        // プレイヤー側のアイテムの場合
        if (itemName == IMG_CONST.BREAD
            || itemName == IMG_CONST.MINICOW
        ) {
            if (byPlayer) {
                // プレイヤーとの衝突による場合
                // 敵側の待ちリストに新たなアイテムを追加
                if (itemName == IMG_CONST.BREAD) {
                    this.addItemToQueue(IMG_CONST.BREADCRUMS);
                } else if (itemName == IMG_CONST.MINICOW) {
                    this.addItemToQueue(IMG_CONST.MILK);
                }
            } else {
                // プレイヤーとの衝突でない場合
                // 待ちリストにアイテムをランダムで追加
                this.addItemToQueueRandom();
            }
            // 要素を削除
            this.playerItemGroup.remove(item, true, true);
            this.playerItemList = this.playerItemList.filter(elm => elm !== item);
        }
        // 敵側のアイテムの場合
        if (itemName == IMG_CONST.BREADCRUMS
            || itemName == IMG_CONST.MILK
        ) {
            // if (byPlayer) {
            //     // プレイヤーとの衝突による場合
            //     // 待ちリストに新たなアイテムをランダムで追加
            //     this.addItemToQueueRandom();
            // } else {
            //     // プレイヤーとの衝突でない場合
            //     // 待ちリストに同じアイテムを追加
            //     this.addItemToQueue(itemName);
            // }

            // 待ちリストに新たなアイテムをランダムで追加
            this.addItemToQueueRandom();

            // 要素を削除
            this.enemyItemGroup.remove(item, true, true);
            this.enemyItemList = this.enemyItemList.filter(elm => elm !== item);
        }
    }

    /**
     * 更新処理
     */
    update() {
        // アイテムの移動処理
        this.playerItemList.forEach(playerItem => {
            // アイテムが画面外に出た場合
            if (playerItem.x <= -GSCONST.ITEM_WIDTH / 2) {
                // アイテムを削除
                this.deleteItem(playerItem, false);
            }
        });

        this.enemyItemList.forEach(enemyItem => {
            // アイテムが画面外に出た場合
            if (enemyItem.x <= -GSCONST.ITEM_WIDTH / 2) {
                // アイテムを削除
                this.deleteItem(enemyItem, false);
            }
        });

        // 2秒ごとにアイテムの生成を乱数で決定
        this.waitFrame++;
        if (this.waitFrame >= COMMON_CONST.FPS * GSCONST.ITEM_CREATE_INTERVAL) {
            let itemRnd = Math.random();
            if (itemRnd <= GSCONST.ITEM_CREATE_RATE_PLAYER) {
                // プレイヤーアイテムの待ちリストが空でない場合
                if (this.playerItemQueue.length != 0) {
                    // 待ちリストからアイテムを画面に生成
                    this.addItem(this.playerItemQueue[0]);
                    // 待ちリストからアイテムを削除
                    this.playerItemQueue.splice(0, 1);
                }
            } else if (itemRnd <= GSCONST.ITEM_CREATE_RATE_PLAYER + GSCONST.ITEM_CREATE_RATE_ENEMY) {
                // 敵アイテムの待ちリストが空でない場合
                if (this.enemyItemQueue.length != 0) {
                    // 待ちリストからアイテムを画面に生成
                    this.addItem(this.enemyItemQueue[0]);
                    // 待ちリストからアイテムを削除
                    this.enemyItemQueue.splice(0, 1);
                }
            }
            // 待ち時間をリセット
            this.waitFrame = 0;

            // TODO: デバッグ用
            console.log("player queue is ...");
            let playerQueueStr = ""
            this.playerItemQueue.forEach(element => {
                playerQueueStr += element + ", ";
            });
            console.log(playerQueueStr);

            console.log("player list is ...");
            let playerListStr = "";
            this.playerItemList.forEach(element => {
                playerListStr += element.texture.key + ", ";
            });
            console.log(playerListStr);

            console.log("enemy queue is ...");
            let enemyQueueStr = ""
            this.enemyItemQueue.forEach(element => {
                enemyQueueStr += element + ", ";
            });
            console.log(enemyQueueStr);

            console.log("enemy list is ...");
            let enemyListStr = "";
            this.enemyItemList.forEach(element => {
                enemyListStr += element.texture.key + ", ";
            });
            console.log(enemyListStr);
        }

    }

}