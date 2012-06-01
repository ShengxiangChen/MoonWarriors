var SysMenu = cc.Layer.extend({
    _ship:null,
    init:function () {
        var bRet = false;
        if (this._super) {
            winSize = cc.Director.sharedDirector().getWinSize();
            var sp = cc.Sprite.spriteWithFile(s_loading);
            sp.setAnchorPoint(cc.PointZero());
            this.addChild(sp, 0, 1);

            var logo = cc.Sprite.spriteWithFile(s_logo);
            logo.setAnchorPoint(cc.ccp(0, 0));
            logo.setPosition(cc.ccp(0, 250));
            this.addChild(logo, 10, 1);

            var newGameNormal = cc.Sprite.spriteWithFile(s_menu, cc.RectMake(0, 0, 126, 33));
            var newGameSelected = cc.Sprite.spriteWithFile(s_menu, cc.RectMake(0, 33, 126, 33));
            var newGameDisabled = cc.Sprite.spriteWithFile(s_menu, cc.RectMake(0, 33 * 2, 126, 33));

            var gameSettingsNormal = cc.Sprite.spriteWithFile(s_menu, cc.RectMake(126, 0, 126, 33));
            var gameSettingsSelected = cc.Sprite.spriteWithFile(s_menu, cc.RectMake(126, 33, 126, 33));
            var gameSettingsDisabled = cc.Sprite.spriteWithFile(s_menu, cc.RectMake(126, 33 * 2, 126, 33));

            var aboutNormal = cc.Sprite.spriteWithFile(s_menu, cc.RectMake(252, 0, 126, 33));
            var aboutSelected = cc.Sprite.spriteWithFile(s_menu, cc.RectMake(252, 33, 126, 33));
            var aboutDisabled = cc.Sprite.spriteWithFile(s_menu, cc.RectMake(252, 33 * 2, 126, 33));

            var newGame = cc.MenuItemSprite.itemFromNormalSprite(newGameNormal, newGameSelected, newGameDisabled, this, function () {
                this.onButtonEffect();
                flareEffect(this, this, this.onNewGame);
            });
            var gameSettings = cc.MenuItemSprite.itemFromNormalSprite(gameSettingsNormal, gameSettingsSelected, gameSettingsDisabled, this, this.onSettings);
            var about = cc.MenuItemSprite.itemFromNormalSprite(aboutNormal, aboutSelected, aboutDisabled, this, this.onAbout);

            var menu = cc.Menu.menuWithItems(newGame, gameSettings, about);
            menu.alignItemsVerticallyWithPadding(10);
            this.addChild(menu, 1, 2);
            menu.setPosition(cc.ccp(winSize.width / 2, winSize.height / 2 - 80));
            this.schedule(this.update, 0.1);

           var tmp = cc.TextureCache.sharedTextureCache().addImage(s_ship01);
            this._ship = cc.Sprite.spriteWithTexture(tmp,cc.RectMake(0, 45, 60, 38));
            this.addChild(this._ship, 0, 4);
            this._ship.setPosition(cc.ccp(Math.random() * winSize.width, 0));
            this._ship.runAction(cc.MoveBy.actionWithDuration(2, cc.ccp(Math.random() * winSize.width, this._ship.getPosition().y + winSize.height + 100)));

            /*if (global.sound) {
                cc.AudioManager.sharedEngine().setBackgroundMusicVolume(0.7);
                cc.AudioManager.sharedEngine().playBackgroundMusic(s_mainMainMusic, true);
            }*/
            bRet = true;
        }
        return bRet;
    },
    onNewGame:function (pSender) {
        var scene = cc.Scene.node();
        scene.addChild(GameLayer.node());
        scene.addChild(GameControlMenu.node());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.transitionWithDuration(1.2, scene));
    },
    onSettings:function (pSender) {
        this.onButtonEffect();
        var scene = cc.Scene.node();
        scene.addChild(SettingsLayer.node());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.transitionWithDuration(1.2, scene));
    },
    onAbout:function (pSender) {
        this.onButtonEffect();
        var scene = cc.Scene.node();
        scene.addChild(AboutLayer.node());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.transitionWithDuration(1.2, scene));
    },
    update:function () {
        if (this._ship.getPosition().y > 480) {
            this._ship.setPosition(cc.ccp(Math.random() * winSize.width, 10));
            this._ship.runAction(cc.MoveBy.actionWithDuration(parseInt(5 * Math.random()), cc.ccp(Math.random() * winSize.width, this._ship.getPosition().y + 480)));
        }
    },
    onButtonEffect:function(){
        if (global.sound) {
            var s = cc.AudioManager.sharedEngine().playEffect(s_buttonEffect);
        }
    }
});

SysMenu.node = function () {
    var sg = new SysMenu();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

SysMenu.scene = function () {
    var scene = cc.Scene.node();
    var layer = SysMenu.node();
    scene.addChild(layer);
    return scene;
};
