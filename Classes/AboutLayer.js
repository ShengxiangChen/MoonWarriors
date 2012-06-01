var AboutLayer = cc.Layer.extend({
    init:function () {
        var bRet = false;
        if (this._super()) {
            var sp = cc.Sprite.spriteWithFile(s_loading);
            sp.setAnchorPoint(cc.PointZero());
            this.addChild(sp, 0, 1);

            var cacheImage = cc.TextureCache.sharedTextureCache().addImage(s_menuTitle)
            var title = cc.Sprite.spriteWithTexture(cacheImage, cc.RectMake(0, 34, 100, 34));
            title.setPosition(cc.ccp(winSize.width / 2, winSize.height - 120));
            this.addChild(title);

            var about = cc.LabelTTF.labelWithString("\n \n This showcase utilizes many features from Cocos2d-html5 engine, including: Parallax background, tilemap, actions, ease, frame animation, schedule, Labels, keyboard Dispatcher, Scene Transition. Art and audio is copyrighted by Enigmata Genus Revenge, you may not use any copyrigted material without permission. This showcase is licensed under GPL",cc.SizeMake(winSize.width * 0.85 ,100),cc.TextAlignmentLeft,"Arial",14)
            about.setPosition(cc.ccp(winSize.width/2,winSize.height/2 + 20));
            this.addChild(about);

            var author = cc.LabelTTF.labelWithString("Programmer: \n Shengxiang Chen",cc.SizeMake(winSize.width * 0.85 ,100),cc.TextAlignmentLeft,"Arial",14)
            author.setPosition(cc.ccp(winSize.width/2,140));
            this.addChild(author);

            author = cc.LabelTTF.labelWithString("Dingping Lv",cc.SizeMake(winSize.width * 0.85 ,100),cc.TextAlignmentCenter,"Arial",14)
            author.setPosition(cc.ccp(winSize.width/2,120));
            this.addChild(author);

            author = cc.LabelTTF.labelWithString("Effects animation: \n Hao Wu",cc.SizeMake(winSize.width * 0.85 ,100),cc.TextAlignmentLeft,"Arial",14)
            author.setPosition(cc.ccp(winSize.width/2,100));
            this.addChild(author);

            author = cc.LabelTTF.labelWithString("Quality Assurance: \n Sean Lin",cc.SizeMake(winSize.width * 0.85 ,80),cc.TextAlignmentLeft,"Arial",14)
            author.setPosition(cc.ccp(winSize.width/2,80));
            this.addChild(author);

            var label = cc.LabelTTF.labelWithString("Go back", "Arial", 14);
            var back = cc.MenuItemLabel.itemWithLabel(label, this, this.backCallback);
            var menu = cc.Menu.menuWithItems(back);
            menu.setPosition(cc.ccp(winSize.width/2,50));
            this.addChild(menu);
            bRet = true;
        }

        return bRet;
    },
    backCallback:function (pSender) {
        var scene = cc.Scene.node();
        scene.addChild(SysMenu.node());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.transitionWithDuration(1.2,scene));
    }
});

AboutLayer.node = function () {
    var sg = new AboutLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};