class FloorManager {
    constructor(scene) {
        // 地面リスト
        this.floorList = [];
        this.floorGroup = scene.physics.add.group();
        // シーンを追加
        this.scene = scene;
        // 速度を設定
        this.floorSpeed = -GSCONST.PLAYER_SPEED;
    }

    /**
     * 各パラメータの初期化
     */
    initParams() {
        this.floorList = [];
        this.floorGroup = this.scene.physics.add.group();
    }

    /**
     * 地面を追加する。
     */
    addFloor() {
        // 追加位置の設定
        let addX = GSCONST.FLOOR_WIDTH / 2;
        if (this.floorList.length != 0) {
            addX = this.floorList[this.floorList.length - 1].x
                + GSCONST.FLOOR_WIDTH
                + this.floorSpeed / COMMON_CONST.FPS
        }

        // 地面の初期化
        let floor = this.scene.add.sprite(
            addX,
            COMMON_CONST.D_HEIGHT - GSCONST.FLOOR_HEIGHT / 2,
            IMG_CONST.FLOOR
        );
        // グループに追加
        this.floorGroup.add(floor);
        // 物理演算を有効化
        this.scene.physics.add.existing(floor);
        this.scene.physics.world.enable(floor);
        floor.body.setSize(GSCONST.FLOOR_WIDTH, GSCONST.FLOOR_HEIGHT);
        // 水平方向のみ移動を有効化
        floor.body.setImmovable(true);
        floor.body.setVelocityX(this.floorSpeed);
        // リストに追加
        this.floorList.push(floor);
    }

    /**
     * 更新処理
     */
    update() {
        // 地面のループ用処理
        this.floorList.forEach(floorSpr => {
            floorSpr.x = Math.round(floorSpr.x);
            floorSpr.y = Math.round(floorSpr.y);

        });
        // 地面が画面外に出た場合
        if (this.floorList[0].x <= - GSCONST.FLOOR_WIDTH / 2) {
            // 新たな地面を追加する
            this.addFloor();
            // 地面を削除
            let firstChild = this.floorGroup.getChildren()[0];
            this.floorGroup.remove(firstChild, true, true);
            this.floorList.splice(0, 1);
        }
    }
}