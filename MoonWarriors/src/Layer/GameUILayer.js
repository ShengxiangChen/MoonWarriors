MW.GameUILayer = cc.Layer.extend({
    _tmpScore:0,
    lbScore:null,
    _lbLife:null,
    ctor:function () {
        // needed for JS-Bindings compatibility
        cc.associateWithNative(this, cc.Layer);
    },
    init:function () {
        this._super();

        this._initUI();
        this._initBackBtn();

        return true;
    },
    setScene:function (scene) {
        this._scene = scene;
    },
    getScene:function () {
        return this._scene;
    },
    _initUI:function () {
        // score
        this.lbScore = cc.LabelTTF.create("Score: 0", "Arial", 14, cc.SizeMake(80, 14), cc.TEXT_ALIGNMENT_RIGHT);
        this.lbScore.setAnchorPoint(MW.AnchorPoint.TopRight);
        this.lbScore.setPosition(cc.pAdd(MW.VisibleRect.topRight(),cc.p(-6,-6)));
        this.addChild(this.lbScore, MW.ZORDER.UI);

        // ship life
        var shipLife = cc.Sprite.create(MW.Res.s_ship01, cc.rect(0, 0, 60, 38));
        shipLife.setScale(0.6);
        shipLife.setAnchorPoint(MW.AnchorPoint.TopLeft);
        shipLife.setPosition(cc.pAdd(MW.VisibleRect.topLeft(),cc.p(6,-6)));
        this.addChild(shipLife, MW.ZORDER.UI);

        // ship Life count
        this._lbLife = cc.LabelTTF.create("0", "Arial", 20);
        this._lbLife.setPosition(cc.pAdd(MW.VisibleRect.topLeft(),cc.p(45,-6)));
        this._lbLife.setAnchorPoint(MW.AnchorPoint.TopLeft);
        this._lbLife.setColor(cc.red());
        this.addChild(this._lbLife, MW.ZORDER.UI);
    },
    _initBackBtn:function () {
        cc.MenuItemFont.setFontSize(18);
        cc.MenuItemFont.setFontName("Arial");
        var systemMenu = cc.MenuItemFont.create("Main Menu", this, this.backToMenu);
        systemMenu.setAnchorPoint(MW.AnchorPoint.BottomRight);
        systemMenu.setPosition(cc.pAdd(MW.VisibleRect.bottomRight(),cc.p(-6,4)));
        var menu = cc.Menu.create(systemMenu);
        menu.ignoreAnchorPointForPosition(false);
        this.addChild(menu, MW.ZORDER.UI);
    },

    update:function () {
        if (this._scene.getScore() < MW.SCORE) {
            this._scene.setScore(this._scene.getScore()+5);
        }
        this._lbLife.setString(MW.LIFE);
        this.lbScore.setString("Score: " + this._scene.getScore());
    },
    backToMenu:function (pSender) {
        MW.GameController.getInstance().backToMenu();
    }
});

MW.GameUILayer.create = function () {
    var sg = new MW.GameUILayer();
    if (sg && sg.init()) {
        return sg;
    }
};
