MW.BackgroundLayer = cc.Layer.extend({
    _backSky:null,
    _backSkyHeight:0,
    _backSkyRe:null,
    _backTileMap:null,
    _backTileMapHeight:0,
    _backTileMapRe:null,
    _isBackSkyReload:false,
    _isBackTileReload:false,
    ctor:function () {
        cc.associateWithNative(this, cc.Layer);
    },
    init:function () {
        this._initBackground();
        return true;
    },
    setScene:function (scene) {
        this._scene = scene;
    },
    getScene:function () {
        return this._scene;
    },
    _initBackground:function () {
        // bg
        this._backSky = cc.Sprite.create(MW.Res.s_bg01);
        this._backSky.setAnchorPoint(cc.p(0, 0));
        this._backSkyHeight = this._backSky.getContentSize().height;
        this.addChild(this._backSky, -10);

        //tilemap
        this._backTileMap = cc.TMXTiledMap.create(MW.Res.s_level01);
        this.addChild(this._backTileMap, -9);
        this._backTileMapHeight = this._backTileMap.getMapSize().height * this._backTileMap.getTileSize().height;

        this._backSkyHeight -= 48;
        this._backTileMapHeight -= 200;
        //this._backSky.runAction(cc.MoveBy.create(3, cc.p(0, -48)));
       // this._backTileMap.runAction(cc.MoveBy.create(3, cc.p(0, -200)));

        //this.schedule(this.update);
    },
    update:function (dt) {
        this._backSky.setPosition(cc.pSub(this._backSky.getPosition(),cc.p(0,16 * dt)));
        if(this._backSkyRe){
            this._backSkyRe.setPosition(cc.pSub(this._backSkyRe.getPosition(),cc.p(0,16 * dt)));
        }

        this._backTileMap.setPosition(cc.pAdd(this._backTileMap.getPosition(),cc.p(0,-200/3 * dt)));
        if(this._backTileMapRe){
            this._backTileMapRe.setPosition(cc.pSub(this._backTileMap.getPosition(),cc.p(0,-200/3 * dt)));
        }

      /*  this._backSky.runAction(cc.MoveBy.create(3, cc.p(0, -48)));
        this._backTileMap.runAction(cc.MoveBy.create(3, cc.p(0, -200)));*/
        //this._backSkyHeight -= 48;
        //this._backTileMapHeight -= 200;
        var pos = this._backSky.getContentSize().height + this._backSky.getPosition().y;
        if (pos <= MW.ScreenHeight) {
            if (!this._isBackSkyReload) {
                this._backSkyRe = cc.Sprite.create(MW.Res.s_bg01);
                this._backSkyRe.setAnchorPoint(cc.p(0, 0));
                this.addChild(this._backSkyRe, -10);
                this._backSkyRe.setPosition(cc.p(0, MW.ScreenHeight));
                this._isBackSkyReload = true;
            }
        }
        if (pos<=0) {
            this.removeChild(this._backSky, true);
            this._backSky = this._backSkyRe;
            this._backSkyRe = null;
            this._isBackSkyReload = false;
        }

        pos = this._backTileMap.getContentSize().height + this._backTileMap.getPosition().y;
        if (pos <= MW.ScreenHeight) {
            if (!this._isBackTileReload) {
                this._backTileMapRe = cc.TMXTiledMap.create(MW.Res.s_level01);
                this.addChild(this._backTileMapRe, -9);
                this._backTileMapRe.setPosition(cc.p(0, MW.ScreenHeight));
                this._isBackTileReload = true;
            }
            //this._backTileMapRe.runAction(cc.MoveBy.create(3, cc.p(0, -200)));
        }
        if (pos<=0) {
            //this._backTileMapHeight = this._backTileMapRe.getMapSize().height * this._backTileMapRe.getTileSize().height;
            this.removeChild(this._backTileMap, true);
            this._backTileMap = this._backTileMapRe;
            this._backTileMapRe = null;
            this._isBackTileReload = false;
        }
    }
});

MW.BackgroundLayer.create = function () {
    var sg = new MW.BackgroundLayer();
    if (sg && sg.init()) {
        return sg;
    }
};
