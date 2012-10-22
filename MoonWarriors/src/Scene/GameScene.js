MW.GameScene = cc.Scene.extend({
    _state:MW.GAME_STATE.PLAYING,
    _time:null,
    _gameLayer:null,
    _uiLayer:null,
    _gameOverLayer:null,
    _bgLayer:null,
    _aliveActor:null,
    _allGameObjects:{},
    ctor:function () {
        this._super();
        cc.associateWithNative();
        this._aliveActor = [];
        this._allGameObjects = {};
    },
    onEnter:function () {
        this._super();

        this.initLayers();
        this.initGame();
       this.setGameOver();
        Explosion.sharedExplosion();
        Enemy.sharedEnemy();

        this.schedule(this.update);
        // schedule
        this.schedule(this.scoreCounter, 1);
    },
    onExit:function () {
        this._super();
        this.removeAllChildrenWithCleanup(true);
        this._gameLayer = null;
        this._uiLayer = null;
        this._gameOverLayer = null;
        this._bgLayer = null;
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

    },
    initLayers:function () {
        this._bgLayer = MW.BackgroundLayer.create();
        this.addChild(this._bgLayer, MW.ZORDER.BG);

        this._gameLayer = MW.GameLayer.create();
        this._gameLayer.setScene(this);
        this.addChild(this._gameLayer, MW.ZORDER.UNIT);

        this._uiLayer = MW.GameUILayer.create();
        this.addChild(this._uiLayer, MW.ZORDER.UI);
    },
    initGame:function () {
        MW.SCORE = 0;
        MW.LIFE = 4;
        this._state = MW.GAME_STATE.PLAYING;

        this._levelManager = new LevelManager(this._gameLayer);

    },
    updateUI:function () {
        if (this._tmpScore < MW.SCORE) {
            this._tmpScore += 5;
        }
        this._lbLife.setString(MW.LIFE);
        this.lbScore.setString("Score: " + this._tmpScore);
    },
    scoreCounter:function () {
        if (this._state == MW.GAME_STATE.PLAYING) {
            this._time++;

            var minute = 0 | (this._time / 60);
            var second = this._time % 60;
            minute = minute > 9 ? minute : "0" + minute;
            second = second > 9 ? second : "0" + second;
            var curTime = minute + ":" + second;
            this._levelManager.loadLevelResource(this._time);
        }
    },
    update:function (dt) {
        if(this._state == MW.GAME_STATE.OVER){
            return;
        }
        this._gameLayer.update(dt);
        this._uiLayer.update(dt);
    },
    setGameOver:function(){
        this._gameOverLayer = GameOver.create();
        this._gameOverLayer.setScene(this);
        this.addChild(this._gameOverLayer,MW.ZORDER.TOP+100);
    },
    menuPlayAgain:function(){

    }
});

MW.GameScene.create = function () {
    return new MW.GameScene();
};