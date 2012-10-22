cc.dumpConfig();

MW.StartMenuLayer = cc.Layer.extend({
    _ship:null,
    _menu:null,
    ctor:function () {
        cc.associateWithNative(this, cc.Layer);
    },

    init:function () {
        this._super();
        cc.SpriteFrameCache.getInstance().addSpriteFrames(MW.Res.s_mainMenu_plist);

        //create bg, logo, menu and ship
        this._initBgAndLogo();
        this._initMenu();
        this._initShip();

        //play backgournd music
        MW.PlayBackgroundMusic(MW.Res.s_mainMainMusic, true);

        this.schedule(this.update, 0.1);

        return true;
    },
    onExit:function(){
        this._super();
        cc.SpriteFrameCache.getInstance().removeSpriteFrameByName(MW.Res.s_mainMenu_plist);
        this.removeAllChildrenWithCleanup(true);
        this._ship = null;
        this._menu = null;
    },
    _initBgAndLogo:function () {
        var logo = cc.Sprite.create(MW.Res.s_logo);
        logo.setAnchorPoint(MW.AnchorPoint.Top);
        logo.setPosition(cc.pAdd(MW.VisibleRect.top(), cc.p(0, -92)));
        this.addChild(logo, MW.ZORDER.UI);

        var bg = cc.Sprite.create(MW.Res.s_mainMenuBg);
        bg.setAnchorPoint(MW.AnchorPoint.BottomLeft);
        this.addChild(bg, MW.ZORDER.BG);
    },

    _initMenu:function () {
        var newGame = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("newgame01.png"),
            cc.Sprite.createWithSpriteFrameName("newgame02.png"),
            cc.Sprite.createWithSpriteFrameName("newgame03.png"),
            this, this.onNewGame);

        var gameSettings = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("option01.png"),
            cc.Sprite.createWithSpriteFrameName("option02.png"),
            cc.Sprite.createWithSpriteFrameName("option03.png"),
            this, this.onSettings);

        var about = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("about01.png"),
            cc.Sprite.createWithSpriteFrameName("about02.png"),
            cc.Sprite.createWithSpriteFrameName("about03.png"),
            this, this.onAbout);

        this._menu = cc.Menu.create(newGame, gameSettings, about);
        this._menu.alignItemsVerticallyWithPadding(10);
        this.addChild(this._menu, MW.ZORDER.UI);
        this._menu.setPosition(cc.pAdd(MW.VisibleRect.center(), cc.p(0, -80)));
    },

    _initShip:function () {
        this._ship = cc.Sprite.create(MW.Res.s_ship01, cc.rect(0, 45, 60, 38));
        this._ship.setPosition(cc.p(Math.random() * MW.ScreenWidth, 0));
        this.addChild(this._ship, MW.ZORDER.UNIT);
        var action = cc.MoveBy.create(2, cc.p(Math.random() * MW.ScreenWidth, this._ship.getPosition().y + MW.ScreenHeight + 100));
        this._ship.runAction(action);
    },

    onNewGame:function (sender) {
        this.onButtonEffect();
        MW.GameController.getInstance().newGame();
    },

    onSettings:function (sender) {
        this.onButtonEffect();

        var settingsLayer = MW.SettingsLayer.create();
        this.addChild(settingsLayer,MW.ZORDER.TOP);
    },

    onAbout:function (sender) {
        this.onButtonEffect();

        var about = MW.AboutLayer.create();
        this.addChild(about,MW.ZORDER.TOP);
    },

    update:function () {
        if (this._ship.getPosition().y > 480) {
            var pos = cc.p(Math.random() * MW.ScreenWidth, 10);
            this._ship.setPosition(pos);
            this._ship.runAction(cc.MoveBy.create(
                parseInt(5 * Math.random(), 10),
                cc.p(Math.random() * MW.ScreenWidth, pos.y + 480)));
        }
    },

    onButtonEffect:function () {
        MW.PlayEffect(MW.Res.s_buttonEffect);
    }
});

MW.StartMenuLayer.create = function () {
    var sg = new MW.StartMenuLayer();
    if (sg && sg.init()) {
        return sg;
    }
};