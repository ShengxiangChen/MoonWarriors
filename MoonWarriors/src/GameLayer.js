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
    isMouseDown:false,
    _beginPos:cc.p(0,0),
    init:function () {
        var bRet = false;
        if (this._super()) {

            // reset global values
            global.bulletNum = 0;
            global.enemyNum = 0;
            global.enemyContainer = [];
            global.ebulletContainer = [];
            global.sbulletContainer = [];
            global.score = 0;
            global.life = 4;

            Explosion.sharedExplosion();
            Enemy.sharedEnemy();
            winSize = cc.Director.getInstance().getWinSize();
            this._levelManager = new LevelManager(this);
            this.initBackground();
            this.screenRect = cc.rect(0, 0, winSize.width, winSize.height + 10);

            // score
            this.lbScore = cc.LabelTTF.create("Score: 0", cc.size(winSize.width / 2, 50), cc.TEXT_ALIGNMENT_RIGHT, "Arial", 14);
            this.addChild(this.lbScore, 1000);
            this.lbScore.setPosition(cc.p(winSize.width - 80, winSize.height - 30));

            // ship life
            var shipTexture = cc.TextureCache.getInstance().addImage(s_ship01);
            var life = cc.Sprite.createWithTexture(shipTexture, cc.rect(0, 0, 60, 38));
            life.setScale(0.6);
            life.setPosition(cc.p(30, 460));
            this.addChild(life, 1, 5);

            // ship Life count
            this._lbLife = cc.LabelTTF.create("0", "Arial", 20);
            this._lbLife.setPosition(cc.p(60, 463));
            this._lbLife.setColor(cc.RED);
            this.addChild(this._lbLife, 1000);

            // ship
            this._ship = new Ship();
            this.addChild(this._ship, this._ship.zOrder, global.Tag.Ship);

            // accept touch now!
            this.setTouchEnabled(true);

            //accept keypad
            this.setKeypadEnabled(true);

            // schedule
            this.schedule(this.update);
            this.schedule(this.scoreCounter, 1);

            if (global.sound) {
                cc.AudioEngine.getInstance().playBackgroundMusic(s_bgMusic, true);
            }

            bRet = true;
        }
        return bRet;
    },
    scoreCounter:function () {
        this._time++;

        var minute = 0 | (this._time / 60);
        var second = this._time % 60;
        minute = minute > 9 ? minute : "0" + minute;
        second = second > 9 ? second : "0" + second;
        var curTime = minute + ":" + second;
        this._levelManager.loadLevelResource(this._time);
    },
    onTouchesBegan:function (touches, event) {
        if (!this.isMouseDown) {
            var touch = touches[0];
            this._beginPos = touch.getLocation(0);
        }
        this.isMouseDown = true;
    },
    onTouchesMoved:function (touches, event) {
        if (this.isMouseDown) {
            var curPos = this._ship.getPosition();
            if(cc.Rect.CCRectIntersectsRect(this._ship.getBoundingBox(),this.screenRect)){
                var touch = touches[0];
                var location = touch.getLocation();

                var move = cc.pSub(location,this._beginPos);
                var nextPos = cc.pAdd(curPos,move);
                this._ship.setPosition(nextPos);
                this._beginPos = location;
                curPos = nextPos;
            }
        }
    },
    onTouchesEnded:function () {
        this.isMouseDown = false;
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
        cc.$("#cou").innerHTML = "Ship:" + 1 + ", Enemy: " + global.enemyContainer.length
            + ", Bullet:" + global.ebulletContainer.length + "," + global.sbulletContainer.length + " all:" + this.getChildren().length;
    },
    checkIsCollide:function () {
        var selChild, bulletChild;
        //check collide
        for(var i = 0; i < global.enemyContainer.length;i++){
            selChild = global.enemyContainer[i];
            for(var j = 0; j < global.sbulletContainer.length; j++) {
                bulletChild = global.sbulletContainer[j];
                if (this.collide(selChild, bulletChild)) {
                    bulletChild.hurt();
                    selChild.hurt();
                }
                if (!cc.Rect.CCRectIntersectsRect(this.screenRect, bulletChild.getBoundingBoxToWorld())) {
                        bulletChild.destroy();
                }
            }
            if (this.collide(selChild, this._ship)) {
                if (this._ship.active) {
                    selChild.hurt();
                    this._ship.hurt();
                }
            }
            if (!cc.Rect.CCRectIntersectsRect(this.screenRect, selChild.getBoundingBoxToWorld())) {
                    selChild.destroy();
            }
        }

        for(var i = 0; i < global.ebulletContainer.length;i++){
            selChild = global.ebulletContainer[i];
            if (this.collide(selChild, this._ship)) {
                if (this._ship.active) {
                    selChild.hurt();
                    this._ship.hurt();
                }
            }
            if (!cc.Rect.CCRectIntersectsRect(this.screenRect, selChild.getBoundingBoxToWorld())) {
                    selChild.destroy();
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
            this.runAction(cc.Sequence.create(
                cc.DelayTime.create(3),
                cc.CallFunc.create(this, this.onGameOver)))
        }
    },
    updateUI:function () {
        if (this._tmpScore < global.score) {
            this._tmpScore += 5;
        }
        this._lbLife.setString(global.life);
        this.lbScore.setString("Score: " + this._tmpScore);
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
        this._backSky = cc.Sprite.create(s_bg01);
        this._backSky.setAnchorPoint(cc.p(0,0));
        this._backSkyHeight = this._backSky.getContentSize().height;
        this.addChild(this._backSky, -10);

        //tilemap
        this._backTileMap = cc.TMXTiledMap.create(s_level01);
        this.addChild(this._backTileMap, -9);
        this._backTileMapHeight = this._backTileMap.getMapSize().height * this._backTileMap.getTileSize().height;

        this._backSkyHeight -= 48;
        this._backTileMapHeight -= 200;
        this._backSky.runAction(cc.MoveBy.create(3, new cc.Point(0, -48)));
        this._backTileMap.runAction(cc.MoveBy.create(3, new cc.Point(0, -200)));

        this.schedule(this.movingBackground, 3);
    },
    movingBackground:function () {
        this._backSky.runAction(cc.MoveBy.create(3, new cc.Point(0, -48)));
        this._backTileMap.runAction(cc.MoveBy.create(3, new cc.Point(0, -200)));
        this._backSkyHeight -= 48;
        this._backTileMapHeight -= 200;

        if (this._backSkyHeight <= winSize.height) {
            if (!this._isBackSkyReload) {
                this._backSkyRe = cc.Sprite.create(s_bg01);
                this._backSkyRe.setAnchorPoint(cc.p(0,0));
                this.addChild(this._backSkyRe, -10);
                this._backSkyRe.setPosition(new cc.Point(0, winSize.height));
                this._isBackSkyReload = true;
            }
            this._backSkyRe.runAction(cc.MoveBy.create(3, new cc.Point(0, -48)));
        }
        if (this._backSkyHeight <= 0) {
            this._backSkyHeight = this._backSky.getContentSize().height;
            this.removeChild(this._backSky,true);
            this._backSky = this._backSkyRe;
            this._backSkyRe = null;
            this._isBackSkyReload = false;
        }

        if (this._backTileMapHeight <= winSize.height) {
            if (!this._isBackTileReload) {
                this._backTileMapRe = cc.TMXTiledMap.create(s_level01);
                this.addChild(this._backTileMapRe, -9);
                this._backTileMapRe.setPosition(new cc.Point(0, winSize.height));
                this._isBackTileReload = true;
            }
            this._backTileMapRe.runAction(cc.MoveBy.create(3, new cc.Point(0, -200)));
        }
        if (this._backTileMapHeight <= 0) {
            this._backTileMapHeight = this._backTileMapRe.getMapSize().height * this._backTileMapRe.getTileSize().height;
            this.removeChild(this._backTileMap,true);
            this._backTileMap = this._backTileMapRe;
            this._backTileMapRe = null;
            this._isBackTileReload = false;
        }
    },
    onGameOver:function () {
        var scene = cc.Scene.create();
        scene.addChild(GameOver.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
        this.getParent().removeChild(this,true);
    }
});

GameLayer.create = function () {
    var sg = new GameLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

GameLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = GameLayer.create();
    scene.addChild(layer, 1);
    return scene;
};
