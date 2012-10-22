MW.AboutLayer = cc.Layer.extend({
    ctor:function () {
        cc.associateWithNative(this, cc.Layer);
    },
    init:function () {
        this._super();

        var sp = cc.Sprite.create(MW.Res.s_mainMenuBg);
        sp.setAnchorPoint(MW.AnchorPoint.BottomLeft);
        this.addChild(sp, MW.ZORDER.BG);

        var title = cc.Sprite.create(MW.Res.s_menuTitle, cc.rect(0, 36, 100, 34));
        title.setPosition(cc.p(MW.ScreenWidth / 2, MW.ScreenHeight - 60));
        this.addChild(title, MW.ZORDER.UI);

        var about = cc.LabelTTF.create("   This showcase utilizes many features from Cocos2d-html5 engine, including: Parallax background, tilemap, actions, ease, frame animation, schedule, Labels, keyboard Dispatcher, Scene Transition. \n    Art and audio is copyrighted by Enigmata Genus Revenge, you may not use any copyrigted material without permission. This showcase is licensed under GPL. \n\nProgrammer: \n Shengxiang Chen\n Dingping Lv \n Effects animation: Hao Wu\n Quality Assurance:  Sean Lin", "Arial", 14, cc.size(MW.ScreenWidth * 0.85, 320), cc.TEXT_ALIGNMENT_LEFT);
        about.setPosition(cc.p(MW.ScreenWidth / 2, MW.ScreenHeight / 2 - 20));
        about.setAnchorPoint(MW.AnchorPoint.Center);
        this.addChild(about, MW.ZORDER.UI);

        var back = cc.MenuItemLabel.create(cc.LabelTTF.create("Go back", "Arial", 14), this, this.backToMenu);
        var menu = cc.Menu.create(back);
        menu.setPosition(cc.p(MW.ScreenWidth / 2, 40));
        this.addChild(menu, MW.ZORDER.UI);

        return true;
    },
    backToMenu:function (pSender) {
        this.removeAllChildrenWithCleanup(true);
        this.removeFromParentAndCleanup(true);
    }
});

MW.AboutLayer.create = function () {
    var sg = new MW.AboutLayer();
    if (sg && sg.init()) {
        return sg;
    }
};
