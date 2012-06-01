var SettingsLayer = cc.Layer.extend({
    init:function () {
        var bRet = false;
        if (this._super()) {
            var sp = cc.Sprite.spriteWithFile(s_loading);
            sp.setAnchorPoint(cc.PointZero());
            this.addChild(sp, 0, 1);

            var cacheImage = cc.TextureCache.sharedTextureCache().addImage(s_menuTitle)
            var title = cc.Sprite.spriteWithTexture(cacheImage, cc.RectMake(0, 0, 134, 34));
            title.setPosition(cc.ccp(winSize.width / 2, winSize.height - 120));
            this.addChild(title);

            cc.MenuItemFont.setFontName("Arial");
            cc.MenuItemFont.setFontSize(18);
            var title1 = cc.MenuItemFont.itemFromString("Sound");
            title1.setIsEnabled(false);

            cc.MenuItemFont.setFontName("Arial");
            cc.MenuItemFont.setFontSize(26);
            var item1 = cc.MenuItemToggle.itemWithTarget(this, this.soundControl,
                cc.MenuItemFont.itemFromString("On"), cc.MenuItemFont.itemFromString("Off"));

            cc.MenuItemFont.setFontName("Arial");
            cc.MenuItemFont.setFontSize(18);
            var title2 = cc.MenuItemFont.itemFromString("Mode");
            title2.setIsEnabled(false);

            cc.MenuItemFont.setFontName("Arial");
            cc.MenuItemFont.setFontSize(26);
            var item2 = cc.MenuItemToggle.itemWithTarget(this, this.modeControl,
                cc.MenuItemFont.itemFromString("Easy"),
                cc.MenuItemFont.itemFromString("Normal"),
                cc.MenuItemFont.itemFromString("Hard"));


            cc.MenuItemFont.setFontName("Arial");
            cc.MenuItemFont.setFontSize(26);
            var label = cc.LabelTTF.labelWithString("Go back", "Arial", 20);
            var back = cc.MenuItemLabel.itemWithLabel(label, this, this.backCallback);
            back.setScale(0.8);

            var menu = cc.Menu.menuWithItems(title1, title2, item1, item2, back);
            menu.alignItemsInColumns(2, 2, 1);
            this.addChild(menu);

            var cp_back = back.getPosition();
            cp_back.y -= 50.0;
            back.setPosition(cp_back);

            bRet = true;
        }

        return bRet;
    },
    backCallback:function (pSender) {
        var scene = cc.Scene.node();
        scene.addChild(SysMenu.node());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.transitionWithDuration(1.2, scene));
    },
    soundControl:function(){
        global.sound = global.sound ? false : true;
        if(!global.sound){
            cc.AudioManager.sharedEngine().end();
        }
    },
    modeControl:function(){
    }
});

SettingsLayer.node = function () {
    var sg = new SettingsLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};