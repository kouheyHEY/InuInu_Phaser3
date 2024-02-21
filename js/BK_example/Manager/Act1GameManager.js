class Act1GameManager {
    constructor(scene) {
        /** @type {Act1GameScene} */
        this.scene = scene;
        // プレイヤー
        /** @type {Player} */
        this.player = null;
        // 敵グループ
        this.enemyGroup = this.scene.physics.add.group();
        // アイテムグループ
        this.itemGroup = this.scene.physics.add.group();
        // フィールド上の足場のグループ
        this.groundGroup = this.scene.physics.add.staticGroup();
        // レベルアップ時のエフェクトグループ
        this.effectGroup = this.scene.physics.add.group();

        // スキルの対象となるアイテムのインデックス
        this.skillTargetItemIdx = 0;
        this.noseEffect = null;

        // プレイヤーの武器スプライトのグループ
        this.playerWeaponGroup = this.scene.physics.add.group();
        this.playerWeaponAngle = 0;
        this.playerWeaponRotationSpeed = 0;

        // 敵の最大数
        this.enemyNum = CONST_ACT1.ENEMYNUM_MIN;
        // 敵の撃破数
        this.enemyBreakNum = 0;
        // 敵の速度
        this.enemySpeed = CONST_ACT1.STDSPEED.ENEMY;
        // 敵のレベル
        this.enemyLevel = 0;
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

                    this.groundGroup.create(x, y, CONST_ACT1.IMGID.GROUND_BLOCK_NORMAL);

                } else if (dataType == CONST_ACT1.SPRITETYPE_MAP.PLAYER) {
                    // プレイヤーの場合
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

                    this.groundGroup.create(x, y, CONST_ACT1.IMGID.GROUND_OUTSIDE);

                } else if (dataType == CONST_ACT1.SPRITETYPE_MAP.GROUND_INSIDE) {
                    // 足場（内部）の場合

                    this.groundGroup.create(x, y, CONST_ACT1.IMGID.GROUND_INSIDE);

                } else if (dataType == CONST_ACT1.SPRITETYPE_MAP.ITEM_FOOD) {
                    // アイテム（餌）の場合

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
                // プレイヤーのSPを回復する
                this.player.recoverSP(CONST_ACT1.SPRECOVER.ITEM_FOOD);

                // スキル対象のアイテムの更新
                if (this.itemGroup.getChildren()[this.skillTargetItemIdx] === i) {
                    this.chooseRandomItemIdx();
                }

                // アイテムの消滅
                i.destroy();
            }
        });

        // アイテムと足場の衝突
        this.scene.physics.add.collider(this.itemGroup, this.groundGroup);

        // 敵と足場の衝突
        this.scene.physics.add.collider(this.enemyGroup, this.groundGroup, (e, g) => {
            // 上からの衝突の場合
            if (e.body.touching.down) {
                // 接地フラグの設定
                e.onGround = true;
            }
            // 横からの衝突の場合
            if (e.body.touching.left || e.body.touching.right) {
                // 向きの変更
                e.changeDir();
            }
        });

        // スキルエフェクト表示用のスプライトを生成
        this.noseEffect = this.scene.physics.add.sprite(0, 0, CONST_ACT1.IMGID.ICON_ARROW_1);
        this.noseEffect.body.setAllowGravity(false);

        // プレイヤーの武器スプライトを生成する
        // スプライトの初期角度
        this.playerWeaponAngle = CONST_ACT1.WEAPON.INITANGLE;
        let weaponX = this.player.x + CONST_ACT1.WEAPON.RADIUS.BONE * Math.cos(Phaser.Math.DegToRad(this.playerWeaponAngle));
        let weaponY = this.player.y + CONST_ACT1.WEAPON.RADIUS.BONE * Math.sin(Phaser.Math.DegToRad(this.playerWeaponAngle));

        // スプライトを作成
        let weapon = this.scene.physics.add.sprite(weaponX, weaponY, CONST_ACT1.IMGID.WEAPON_BONE);
        this.playerWeaponGroup.add(weapon);
        weapon.body.setAllowGravity(false);

        // スプライトに速度を設定
        this.playerWeaponRotationSpeed = CONST_ACT1.WEAPON.ROTATIONSPEED.BONE
        weapon.body.setAngularVelocity(this.playerWeaponRotationSpeed * 2);

        // 敵と武器の衝突
        this.scene.physics.add.overlap(this.playerWeaponGroup, this.enemyGroup, (weapon, enemy) => {
            // 敵の消滅
            enemy.destroy();
            // プレイヤーのSPの回復
            this.player.recoverSP(CONST_ACT1.SPRECOVER.ENEMY);
            // 敵の撃破数のカウント
            this.enemyBreakNum++;
        });

        // エフェクトグループの作成
        let playerLvUp = new EffectSprite(
            this.scene,
            this.player.x,
            this.player.y,
            CONST_ACT1.IMGID.EFFECT_LEVELUP,
            CONST_ACT1.SPRITETYPE.EFFECT_LEVELUP,
        );
        this.effectGroup.add(playerLvUp);
        playerLvUp.setVisible(false);
        playerLvUp.body.setAllowGravity(false);
    }

    /**
     * 任意の場所にアイテムを生成する。
     * @param {Array} _mapData マップデータ
     * @param {string} _itemType アイテムの種類
     * @param {int} _x 生成するx座標
     * @param {int} _y 生成するy座標
     * @returns {Phaser.Math.Vector2} 生成した座標（生成できない場合はnull）
     */
    generateItem(_mapData, _itemType, _x, _y) {
        // 座標が指定されているか
        let assignedX = (_x != undefined);
        let assignedY = (_y != undefined);

        // 生成する座標を設定
        let generateX = 0;
        let generateY = 0;

        if (!assignedY) {
            generateY = Math.floor(Math.random() * _mapData.length);
        } else {
            generateY = _y;
        }

        if (!assignedX) {
            generateX = Math.floor(Math.random() * _mapData[0].length);
        } else {
            generateX = _x;
        }

        // 他のアイテムと重なっている場合
        while (_mapData[generateY][generateX] != CONST_ACT1.SPRITETYPE_MAP.EMPTY) {
            if (assignedX || assignedY) {
                return null;
            }

            // アイテムを再生成
            generateX = Math.floor(Math.random() * _mapData[0].length);
            generateY = Math.floor(Math.random() * _mapData.length);
        }

        this.itemGroup.add(new Item(
            this.scene,
            (generateX + 0.5) * CONST_ACT1.SIZE.ITEM.WIDTH,
            (generateY + 0.5) * CONST_ACT1.SIZE.ITEM.HEIGHT,
            CONST_ACT1.SPRITETYPE[_itemType],
            CONST_ACT1.IMGID[_itemType]
        ));

        return new Phaser.Math.Vector2(generateX, generateY);
    }

    /**
     * 任意の場所に敵を生成する。
     * @param {Array} _mapData マップデータ
     * @param {int} _x 生成するx座標
     * @param {int} _y 生成するy座標
     * @returns {Phaser.Math.Vector2} 生成した座標（生成できない場合はnull）
     */
    generateEnemy(_mapData, _x, _y) {
        // 座標が指定されているか
        let assignedX = (_x != undefined);
        let assignedY = (_y != undefined);

        // 生成する座標を設定
        let generateX = 0;
        let generateY = 0;

        if (!assignedY) {
            generateY = Math.floor(Math.random() * (_mapData.length - 1));
        } else {
            generateY = _y;
        }

        if (!assignedX) {
            generateX = Math.floor(Math.random() * (_mapData[0].length - 1));
        } else {
            generateX = _x;
        }

        let enemyX = (generateX + 0.5) * CONST_ACT1.SIZE.GROUND.WIDTH;

        // 他のオブジェクトと重なっている場合
        // またはプレイヤーから一定距離内の場合
        while (
            _mapData[generateY][generateX] != CONST_ACT1.SPRITETYPE_MAP.EMPTY ||
            _mapData[generateY + 1][generateX] != CONST_ACT1.SPRITETYPE_MAP.EMPTY ||
            _mapData[generateY][generateX + 1] != CONST_ACT1.SPRITETYPE_MAP.EMPTY ||
            _mapData[generateY + 1][generateX + 1] != CONST_ACT1.SPRITETYPE_MAP.EMPTY ||
            Math.abs(enemyX - this.player.x) <= CONST_ACT1.ENEMY_PLAYER_DIST
        ) {
            if (assignedX || assignedY) {
                return null;
            }

            // 再生成
            generateX = Math.floor(Math.random() * (_mapData[0].length - 1));
            generateY = Math.floor(Math.random() * (_mapData.length - 1));
            enemyX = (generateX + 0.5) * CONST_ACT1.SIZE.GROUND.WIDTH;
        }

        let enemy = new Enemy(
            this.scene,
            (generateX + 0.5) * CONST_ACT1.SIZE.GROUND.WIDTH,
            (generateY + 0.5) * CONST_ACT1.SIZE.GROUND.HEIGHT,
            CONST_ACT1.SPRITETYPE.ENEMY,
            CONST_ACT1.IMGID.ANIM_ENEMY_NORMAL
        );
        this.enemyGroup.add(enemy);
        // 速度の設定
        enemy.body.setVelocityX(this.enemySpeed);

        return new Phaser.Math.Vector2(generateX, generateY);

    }

    /**
     * ランダムにアイテムを1つ選択し、プレイヤーのスキルの対象とする
     * @returns {Item} ランダムに選択されたアイテム
     */
    chooseRandomItemIdx() {
        this.skillTargetItemIdx = Math.floor(Math.random() * this.itemGroup.getLength());
    }

    /**
     * スキルのターゲットとなるアイテムの取得
     * @returns {Item} スキルのターゲットとなっているアイテム
     */
    getSkillTargetItem() {
        return this.itemGroup.getChildren()[this.skillTargetItemIdx];
    }

    /**
     * スキル「ノーズ」によるエフェクトの更新
     */
    updateSkillEffect() {
        // アイテムが存在しない場合、処理を中止する
        if (this.itemGroup.getLength() <= 0) {
            this.noseEffect.setVisible(false);
            return;
        }

        this.noseEffect.setVisible(this.player.usingSkillNose);

        let playerX = this.player.x;
        let playerY = this.player.y;

        // プレイヤーからアイテムへの方向ベクトルを計算
        let directionX = this.itemGroup.getChildren()[this.skillTargetItemIdx].x - playerX;
        let directionY = this.itemGroup.getChildren()[this.skillTargetItemIdx].y - playerY;

        // 方向ベクトルを正規化（長さを1に）
        let length = Math.sqrt(directionX * directionX + directionY * directionY);
        let normalizedDirectionX = directionX / length;
        let normalizedDirectionY = directionY / length;

        // 矢印エフェクトのプレイヤーからアイテムへの向きを設定
        this.noseEffect.setRotation(Math.atan2(normalizedDirectionY, normalizedDirectionX));

        // 矢印エフェクトをプレイヤーからアイテムへの直線上に配置
        this.noseEffect.setPosition(
            playerX + normalizedDirectionX * CONST_ACT1.SKILL_NOSE.EFFECT_POS_DIST,
            playerY + normalizedDirectionY * CONST_ACT1.SKILL_NOSE.EFFECT_POS_DIST
        );
    }

    /**
     * 武器オブジェクトの更新
     */
    updateWeapon() {
        // レベルアップ時
        if (this.player.levelUpFlg) {

            // レベルに応じて武器速度の更新
            this.playerWeaponRotationSpeed =
                CONST_ACT1.WEAPON.ROTATIONSPEED.BONE + this.player.level * CONST_ACT1.WEAPON.ROTATIONSPEED_LVUP_INC;

            // レベルが一定数値以上なら、武器を追加
            if (this.player.level >= CONST_ACT1.WEAPON.DOUBLE_LEVEL && this.playerWeaponGroup.getLength() <= 1) {
                let weaponDeg = this.playerWeaponAngle + 180;
                // プレイヤーの武器スプライトを、すでに存在する武器の対角線上に生成する
                let weaponX = this.player.x + CONST_ACT1.WEAPON.RADIUS.BONE * Math.cos(Phaser.Math.DegToRad(weaponDeg));
                let weaponY = this.player.y + CONST_ACT1.WEAPON.RADIUS.BONE * Math.sin(Phaser.Math.DegToRad(weaponDeg));

                // スプライトを作成
                let weapon = this.scene.physics.add.sprite(weaponX, weaponY, CONST_ACT1.IMGID.WEAPON_BONE);
                this.playerWeaponGroup.add(weapon);
                weapon.body.setAllowGravity(false);

                // スプライトの角度を設定
                weapon.body.rotation = this.playerWeaponGroup.getChildren()[0].body.rotation;

                // uiカメラから武器を除外
                this.scene.uiCamera.ignore(weapon);
            }
        }

        let weaponDeg = this.playerWeaponAngle;
        this.playerWeaponGroup.children.iterate((weapon) => {
            if (this.player.levelUpFlg) {
                weapon.body.setAngularVelocity(this.playerWeaponRotationSpeed * 2);
            }
            // 武器の位置の更新
            let weaponX = this.player.x + CONST_ACT1.WEAPON.RADIUS.BONE * Math.cos(Phaser.Math.DegToRad(weaponDeg));
            let weaponY = this.player.y + CONST_ACT1.WEAPON.RADIUS.BONE * Math.sin(Phaser.Math.DegToRad(weaponDeg));
            weapon.setPosition(weaponX, weaponY);

            weaponDeg += (360 / this.playerWeaponGroup.getLength());

        });

        // 角度の更新
        this.playerWeaponAngle += (this.playerWeaponRotationSpeed / COMMON.FPS);
        if (this.playerWeaponAngle >= 360) {
            this.playerWeaponAngle -= 360;
        }
    }

    /**
     * 敵グループの更新
     */
    updateEnemy() {
        // グループ内の各オブジェクトに対して処理を行う
        this.enemyGroup.children.iterate((enemy) => {
            if ((this.player.x - enemy.x >= 0) == enemy.flipX) {
                enemy.changeDir();
            }
        });
    }

    /**
     * エフェクトの更新
     */
    updateEffect() {
        this.effectGroup.children.iterate((effect) => {
            if (effect.type === CONST_ACT1.SPRITETYPE.EFFECT_LEVELUP) {

                if (this.player.levelUpFlg) {
                    // レベルアップエフェクトを表示
                    effect.setVisible(true);
                    effect.setDepth(1);
                    effect.setPosition(this.player.x, this.player.y);
                    // アニメーションを再生
                    this.scene.tweens.add({
                        targets: { "dist": 0, "effect": effect },
                        dist: CONST_ACT1.EFFECT_LEVELUP.TRANS_DIST,
                        duration: CONST_ACT1.EFFECT_LEVELUP.TIME,
                        ease: 'Linear',
                        onUpdate: (tween) => {
                            let target = tween.targets[0];
                            target["effect"].setPosition(this.player.x, this.player.y - target["dist"]);
                        },
                        onComplete: (tween) => {
                            let target = tween.targets[0];
                            target["effect"].setVisible(false);
                        },
                    });
                }
            }
        });
    }

    /**
     * 全てのオブジェクトの更新
     */
    updateObjects() {
        // プレイヤーの更新
        this.player.update();
        // スキルのエフェクトの更新
        this.updateSkillEffect();
        // 武器の更新
        this.updateWeapon();
        // 敵の更新
        this.updateEnemy();
        // エフェクトの更新
        this.updateEffect();

        // レベルアップ時の更新フラグを更新
        this.player.levelUpFlg = false;
    }
}