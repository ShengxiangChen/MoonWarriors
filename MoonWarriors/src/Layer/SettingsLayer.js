MW.SettingsLayer = cc.Layer.extend({
    ctor:function () {
        cc.associateWithNative(this, cc.Layer);
    },
    init:function () {
        this._super();

        var sp = cc.Sprite.create(MW.Res.s_mainMenuBg);
        sp.setAnchorPoint(cc.p(0, 0));
        this.addChild(sp, MW.ZORDER.BG);

        var cacheImage = cc.TextureCache.getInstance().addImage(MW.Res.s_menuTitle);
        var title = cc.Sprite.createWithTexture(cacheImage, cc.rect(0, 0, 134, 34));
        title.setPosition(cc.p(MW.ScreenWidth / 2, MW.ScreenHeight - 120));
        this.addChild(title, MW.ZORDER.UI);

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(18);
        var title1 = cc.MenuItemFont.create("Sound");
        title1.setEnabled(false);

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(26);
        var item1 = cc.MenuItemToggle.create(
            cc.MenuItemFont.create("On"),
            cc.MenuItemFont.create("Off"));
        item1.setCallback(this, this.soundControl);

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(18);
        var title2 = cc.MenuItemFont.create("Mode");
        title2.setEnabled(false);

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(26);
        var item2 = cc.MenuItemToggle.create(
            cc.MenuItemFont.create("Easy"),
            cc.MenuItemFont.create("Normal"),
            cc.MenuItemFont.create("Hard"));
        item2.setCallback(this, this.modeControl);


        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(26);

        var back = cc.MenuItemLabel.create(cc.LabelTTF.create("Go back", "Arial", 20), this, this.backToMenu);
        back.setScale(0.8);

        var menu = cc.Menu.create(title1, title2, item1, item2, back);
        menu.alignItemsInColumns(2, 2, 1);
        this.addChild(menu);

        back.setPosition(cc.pAdd(back.getPosition(), cc.p(0, -50)));

        return true;
    },
    backToMenu:function (pSender) {
        this.removeAllChildrenWithCleanup(true);
        this.removeFromParentAndCleanup(true);
    },
    soundControl:function () {
        MW.SOUND = MW.SOUND ? false : true;
        if (!MW.SOUND) {
            cc.AudioEngine.getInstance().stopBackgroundMusic();
        }
    },
    modeControl:function () {
    }
});

MW.SettingsLayer.create = function () {
    var sg = new MW.SettingsLayer();
    if (sg && sg.init()) {
        return sg;
    }
};
