var GameLayer = cc.Layer.extend({
    _time:null,
    _ship:null,
    _backSky:null,
    _backSkyHeight:0,
    _backSkyRe:null,
    _backTileMap:null,
    _backTileMapHeight:0,
    _backTileMapRe:null,
    _levelManager:null,
    _tmpScore:0,
    _isBackSkyReload:false,
    _isBackTileReload:false,
    lbScore:null,
    screenRect:null,
    explosionAnimation:[],
    init:function () {
        var bRet = false;
        if (this._super()) {
            Explosion.sharedExplosion();
            Enemy.sharedEnemy();

            this._levelManager = new LevelManager(this);
            this.initBackground();
            this.screenRect = new cc.Rect(-20, -20, winSize.width + 40, winSize.height + 40);

            // score
            this.lbScore = cc.LabelTTF.labelWithString("Score: 0", cc.SizeMake(winSize.width / 2, 50), cc.TextAlignmentRight, "Arial", 14);
            this.addChild(this.lbScore, 1000);
            this.lbScore.setPosition(cc.ccp(winSize.width - 100, winSize.height - 15));

            // ship life
            var shipTexture = cc.TextureCache.sharedTextureCache().addImage(s_ship01);
            var life = cc.Sprite.spriteWithTexture(shipTexture, cc.RectMake(0, 0, 60, 38));
            life.setScale(0.6);
            life.setPosition(cc.ccp(30, 460));
            this.addChild(life, 1, 5);

            // ship Life count
            this._lbLife = cc.LabelTTF.labelWithString("0", "Arial", 20);
            this._lbLife.setPosition(cc.ccp(60, 463));
            this._lbLife.setColor(cc.RED());
            this.addChild(this._lbLife, 1000);

            // ship
            this._ship = new Ship();
            this.addChild(this._ship, this._ship.zOrder, global.Tag.Ship);

            // accept touch now!
            this.setIsTouchEnabled(true);

            //accept keypad
            this.setIsKeypadEnabled(true);

            // schedule
            this.schedule(this.update);
            this.schedule(this.checkEnemyAndBulletIsInBound, 5);
            this.schedule(this.timeCounter, 1);

            bRet = true;
        }
        return bRet;
    },
    timeCounter:function () {
        this._time++;

        var minute = 0 | (this._time / 60);
        var second = this._time % 60;
        minute = minute > 9 ? minute : "0" + minute;
        second = second > 9 ? second : "0" + second;
        var curTime = minute + ":" + second;
        this._levelManager.loadLevelResource(this._time);
    },
    ccTouchesEnded:function (pTouches, pEvent) {
        if (pTouches.length <= 0)
            return;

        var touch = pTouches[0];
        var location = touch.locationInView(touch.view());
        //this._ship.runAction(cc.MoveTo.actionWithDuration(1.0, cc.ccp(location.x, location.y)));
    },
    keyDown:function (e) {
        keys[e] = true;
    },
    keyUp:function (e) {
        keys[e] = false;
    },
    update:function (dt) {
        this.checkIsCollide();
        this.removeInactiveUnit(dt);
        this.checkIsReborn();
        this.updateUI();
    },
    checkIsCollide:function () {
        var selChild, bulletChild, layerChildren = this.getChildren();
        //check collide
        for (var i = 0; i < layerChildren.length; i++) {
            selChild = layerChildren[i];
            if (selChild.getTag() == global.Tag.Enemy) {
                for (var j = 0; j < layerChildren.length; j++) {
                    bulletChild = layerChildren[j];
                    if (bulletChild.getTag() == global.Tag.ShipBullet) {
                        if (this.collide(selChild, bulletChild)) {
                            bulletChild.hurt();
                            selChild.hurt();
                        }
                    }
                }
                if (this.collide(selChild, this._ship)) {
                    if (this._ship.active) {
                        selChild.hurt();
                        this._ship.hurt();
                    }
                }
            }
            else if (selChild.getTag() == global.Tag.EnemyBullet) {
                if (this.collide(selChild, this._ship)) {
                    if (this._ship.active) {
                        selChild.hurt();
                        this._ship.hurt();
                    }
                }
            }
        }
    },
    removeInactiveUnit:function (dt) {
        var selChild, layerChildren = this.getChildren();
        for (var i in layerChildren) {
            selChild = layerChildren[i];
            if (selChild) {
                selChild.update(dt);
                if ((selChild.getTag() == global.Tag.Ship) || (selChild.getTag() == global.Tag.ShipBullet) ||
                    (selChild.getTag() == global.Tag.Enemy) || (selChild.getTag() == global.Tag.EnemyBullet)) {
                    if (selChild && !selChild.active) {
                        selChild.destroy();
                    }
                }
            }
        }
    },
    checkIsReborn:function () {
        if (global.life > 0 && !this._ship.active) {
            // ship
            this._ship = new Ship();
            this.addChild(this._ship, this._ship.zOrder, global.Tag.Ship);
        }
        else if (global.life <= 0 && !this._ship.active) {
            this.runAction(cc.Sequence.actions(
                cc.DelayTime.actionWithDuration(3),
                cc.CallFunc.actionWithTarget(this, this.onGameOver)))
        }
    },
    updateUI:function () {
        if (this._tmpScore < global.score) {
            this._tmpScore += 5;
        }
        this._lbLife.setString(global.life);
        this.lbScore.setString("Score: " + this._tmpScore);
    },
    checkEnemyAndBulletIsInBound:function () {
        var layerChildren = this.getChildren();
        for (var i = 0; i < layerChildren.length; i++) {
            var selChild = layerChildren[i];
            if ((selChild.getTag() == global.Tag.Enemy) || (selChild.getTag() == global.Tag.EnemyBullet) || (selChild.getTag() == global.Tag.ShipBullet)) {
                var childRect = selChild.boundingBoxToWorld();
                if (!cc.Rect.CCRectIntersectsRect(this.screenRect, childRect)) {
                    this.removeChild(selChild, true);
                }
            }
        }
    },
    collide:function (a, b) {
        var aRect = a.collideRect();
        var bRect = b.collideRect();
        if (cc.Rect.CCRectIntersectsRect(aRect, bRect)) {
            return true;
        }
    },
    initBackground:function () {
        // bg
        this._backSky = cc.Sprite.spriteWithFile(s_bg01);
        this._backSky.setAnchorPoint(cc.PointZero());
        this._backSkyHeight = this._backSky.getContentSize().height;
        this.addChild(this._backSky, -10);

        //tilemap
        this._backTileMap = cc.TMXTiledMap.tiledMapWithTMXFile(s_level01);
        this.addChild(this._backTileMap, -9);
        this._backTileMapHeight = this._backTileMap.getMapSize().height * this._backTileMap.getTileSize().height;

        this._backSkyHeight -= 48;
        this._backTileMapHeight -= 200;
        this._backSky.runAction(cc.MoveBy.actionWithDuration(3, new cc.Point(0, -48)));
        this._backTileMap.runAction(cc.MoveBy.actionWithDuration(3, new cc.Point(0, -200)));

        this.schedule(this.movingBackground, 3);
    },
    movingBackground:function () {
        this._backSky.runAction(cc.MoveBy.actionWithDuration(3, new cc.Point(0, -48)));
        this._backTileMap.runAction(cc.MoveBy.actionWithDuration(3, new cc.Point(0, -200)));
        this._backSkyHeight -= 48;
        this._backTileMapHeight -= 200;

        if (this._backSkyHeight <= winSize.height) {
            if (!this._isBackSkyReload) {
                this._backSkyRe = cc.Sprite.spriteWithFile(s_bg01);
                this._backSkyRe.setAnchorPoint(cc.PointZero());
                this.addChild(this._backSkyRe, -10);
                this._backSkyRe.setPosition(new cc.Point(0, winSize.height));
                this._isBackSkyReload = true;
            }
            this._backSkyRe.runAction(cc.MoveBy.actionWithDuration(3, new cc.Point(0, -48)));
        }
        if (this._backSkyHeight <= 0) {
            this._backSkyHeight = this._backSky.getContentSize().height;
            this.removeChild(this._backSky);
            this._backSky = this._backSkyRe;
            this._backSkyRe = null;
            this._isBackSkyReload = false;
        }

        if (this._backTileMapHeight <= winSize.height) {
            if (!this._isBackTileReload) {
                this._backTileMapRe = cc.TMXTiledMap.tiledMapWithTMXFile(s_level01);
                this.addChild(this._backTileMapRe, -9);
                this._backTileMapRe.setPosition(new cc.Point(0, winSize.height));
                this._isBackTileReload = true;
            }
            this._backTileMapRe.runAction(cc.MoveBy.actionWithDuration(3, new cc.Point(0, -200)));
        }
        if (this._backTileMapHeight <= 0) {
            this._backTileMapHeight = this._backTileMapRe.getMapSize().height * this._backTileMapRe.getTileSize().height;
            this.removeChild(this._backTileMap);
            this._backTileMap = this._backTileMapRe;
            this._backTileMapRe = null;
            this._isBackTileReload = false;
        }
    },
    onGameOver:function () {
        var scene = cc.Scene.node();
        scene.addChild(GameOver.node());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.transitionWithDuration(1.2, scene));
    }
});

GameLayer.node = function () {
    var sg = new GameLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

GameLayer.scene = function () {
    var scene = cc.Scene.node();
    var layer = GameLayer.node();
    scene.addChild(layer, 1);
    return scene;
};