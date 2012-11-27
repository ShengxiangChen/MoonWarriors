MW.GameScene = cc.Scene.extend({
    _state:MW.GAME_STATE.PLAYING,
    _time:null,
    _levelManager:null,
    _gameLayer:null,
    _uiLayer:null,
    _gameOverLayer:null,
    _bgLayer:null,
    _aliveActor:null,
    _allGameObjects:{},
    _tmpScore:0,
    ctor:function () {
        this._super();
        cc.associateWithNative();
        this._aliveActor = [];
        this._allGameObjects = {};
    },
    onEnter:function () {
        this._super();
        this.addSpriteFrames();
        this.initLayers();
        this.initGame();

        this.schedule(this.update);
        this.schedule(this.scoreCounter, 1);
    },
    onExit:function () {
        this._super();
        this.unschedule(this.update);
        this.unschedule(this.scoreCounter);

        this.removeAllChildrenWithCleanup(true);
        this._gameLayer = null;
        this._uiLayer = null;
        this._gameOverLayer = null;
        this._bgLayer = null;

        this._time = null;
        this._levelManager = null;
        this._aliveActor = null;
    },
    getUILayer:function () {
        return this._uiLayer;
    },
    getGameLayer:function () {
        return this._gameLayer;
    },
    getBgLayer:function () {
        return this._bgLayer;
    },
    getGameState:function () {
        return this._state;
    },
    setGameState:function (v) {
        this._state = v;
    },
    getScore:function () {
        return this._tmpScore;
    },
    setScore:function (v) {
        this._tmpScore = v;
    },
    addSpriteFrames:function () {
        var cache = cc.SpriteFrameCache.getInstance();
        cache.addSpriteFrames(MW.Res.s_bullet_plist);
        cache.addSpriteFrames(MW.Res.s_Enemy_plist, MW.Res.s_Enemy);
        cache.addSpriteFrames(MW.Res.s_explosion_plist);

        var animFrames = [];
        var str = "";
        for (var i = 1; i < 35; i++) {
            str = "explosion_" + (i < 10 ? ("0" + i) : i) + ".png";
            var frame = cache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = cc.Animation.create(animFrames, 0.04);
        cc.AnimationCache.getInstance().addAnimation(animation, "Explosion");
    },
    removeSpriteFrames:function () {

    },
    getActors:function (groupTag) {
        var tArray = [];
        var iter = this._allGameObjects[groupTag];
        if (!iter) {
            this._allGameObjects[groupTag] = tArray;
        }
        return iter || tArray;
    },
    addActor:function (actor) {
        this.addActorIntoAllObjects(actor);
        this._aliveActor.push(actor);
        actor.setScene(this);
        if (actor && !actor.getParent()) {
            this._gameLayer.addChild(actor, actor.getZOrder());
        }
    },
    removeActor:function (actor) {
        if (actor) {
            this._gameLayer.removeChild(actor, true);
        }
        cc.ArrayRemoveObject(this._aliveActor, actor);
        this.removeActorFromAllObjects(actor);
    },
    addActorIntoAllObjects:function (actor) {
        var ret = false;
        var AGroup = actor._group;
        if (!this._allGameObjects[AGroup]) {
            this._allGameObjects[AGroup] = [];
        }
        else {
            for (var i = 0; i < this._allGameObjects[AGroup].length; i++) {
                if (actor == this._allGameObjects[AGroup][i]) {
                    ret = true;
                }
            }
        }
        if (!ret) {
            this._allGameObjects[AGroup].push(actor);
        }
    },
    removeActorFromAllObjects:function (actor) {
        var AGroup = actor._group;
        for (var i = 0; i < this._allGameObjects[AGroup].length; i++) {
            if (actor == this._allGameObjects[AGroup][i]) {
                this._allGameObjects[AGroup].splice(i, 1);
                return;
            }
        }
        cc.Assert(0, "can not find actor array!");
    },
    removeAllActor:function () {
        var tmpActor;
        var shipBulletsArray = this.getActors("ShipBullet");
        var i;
        for (i = shipBulletsArray.length - 1; i >= 0; i--) {
            tmpActor = shipBulletsArray[i];
            tmpActor.setUpdatebySelf(false);
            tmpActor.removeSelfFromScene();
        }

        var enemyBulletsArray = this.getActors("EnemyBullet");
        for (i = enemyBulletsArray.length - 1; i >= 0; i--) {
            tmpActor = enemyBulletsArray[i];
            tmpActor.removeSelfFromScene();
        }

        var enemiesArray = this.getActors("Enemy");
        for (i = enemiesArray.length - 1; i >= 0; i--) {
            tmpActor = enemiesArray[i];
            tmpActor.removeSelfFromScene();
        }

        var ships = this.getActors("Ship");
        for (i = ships.length - 1; i >= 0; i--) {
            tmpActor = ships[i];
            tmpActor.removeSelfFromScene();
        }

    },
    initLayers:function () {
        this._bgLayer = MW.BackgroundLayer.create();
        this.addChild(this._bgLayer, MW.ZORDER.BG);

        this._gameLayer = MW.GameLayer.create();
        this._gameLayer.setScene(this);
        this.addChild(this._gameLayer, MW.ZORDER.UNIT);

        this._uiLayer = MW.GameUILayer.create();
        this._uiLayer.setScene(this);
        this.addChild(this._uiLayer, MW.ZORDER.UI);
    },
    initGame:function () {
        MW.SCORE = 0;
        MW.LIFE = 1;
        this._state = MW.GAME_STATE.PLAYING;
        this._levelManager = new LevelManager(this._gameLayer);

    },
    scoreCounter:function () {
        if (this._state == MW.GAME_STATE.OVER) {
            return;
        }
        this._time++;

        var minute = 0 | (this._time / 60);
        var second = this._time % 60;
        minute = minute > 9 ? minute : "0" + minute;
        second = second > 9 ? second : "0" + second;
        var curTime = minute + ":" + second;
        this._levelManager.loadLevelResource(this._time);

    },
    update:function (dt) {
        if (this._state == MW.GAME_STATE.OVER) {
            return;
        }
        this._gameLayer.update(dt);
        this._uiLayer.update(dt);
        this._bgLayer.update(dt);
    },
    setGameOver:function () {
        this._state = MW.GAME_STATE.OVER;
        this._gameOverLayer = MW.GameOverLayer.create();
        this._gameOverLayer.setScene(this);
        this.addChild(this._gameOverLayer, MW.ZORDER.TOP + 100);
    },
    menuPlayAgain:function () {
        this.initGame();
        this._gameLayer.onEnter();
    }
});

MW.GameScene.create = function () {
    return new MW.GameScene();
};