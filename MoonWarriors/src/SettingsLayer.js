var SettingsLayer = cc.Layer.extend({
    init:function () {
        var bRet = false;
        if (this._super()) {
            var sp = cc.Sprite.create(s_loading);
            sp.setAnchorPoint(cc.PointZero());
            this.addChild(sp, 0, 1);

            var cacheImage = cc.TextureCache.getInstance().addImage(s_menuTitle)
            var title = cc.Sprite.createWithTexture(cacheImage, cc.RectMake(0, 0, 134, 34));
            title.setPosition(cc.p(winSize.width / 2, winSize.height - 120));
            this.addChild(title);

            cc.MenuItemFont.setFontName("Arial");
            cc.MenuItemFont.setFontSize(18);
            var title1 = cc.MenuItemFont.create("Sound");
            title1.setEnabled(false);

            cc.MenuItemFont.setFontName("Arial");
            cc.MenuItemFont.setFontSize(26);
            var item1 = cc.MenuItemToggle.create(this, this.soundControl,
                cc.MenuItemFont.create("On"), cc.MenuItemFont.create("Off"));

            cc.MenuItemFont.setFontName("Arial");
            cc.MenuItemFont.setFontSize(18);
            var title2 = cc.MenuItemFont.create("Mode");
            title2.setEnabled(false);

            cc.MenuItemFont.setFontName("Arial");
            cc.MenuItemFont.setFontSize(26);
            var item2 = cc.MenuItemToggle.create(this, this.modeControl,
                cc.MenuItemFont.create("Easy"),
                cc.MenuItemFont.create("Normal"),
                cc.MenuItemFont.create("Hard"));


            cc.MenuItemFont.setFontName("Arial");
            cc.MenuItemFont.setFontSize(26);
            var label = cc.LabelTTF.create("Go back", "Arial", 20);
            var back = cc.MenuItemLabel.create(label, this, this.backCallback);
            back.setScale(0.8);

            var menu = cc.Menu.create(title1, title2, item1, item2, back);
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
        var scene = cc.Scene.create();
        scene.addChild(SysMenu.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
    soundControl:function(){
        global.sound = global.sound ? false : true;
        if(!global.sound){
            cc.AudioEngine.getInstance().end();
        }
    },
    modeControl:function(){
    }
});

SettingsLayer.create = function () {
    var sg = new SettingsLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
