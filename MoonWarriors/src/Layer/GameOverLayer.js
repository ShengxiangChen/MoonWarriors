MW.GameOverLayer = cc.Layer.extend({
    ctor:function () {
        // needed for JS-Bindings compatibility
        cc.associateWithNative(this, cc.Layer);
    },
    setScene:function (scene) {
        this._scene = scene;
    },
    getScene:function () {
        return this._scene;
    },
    onEnter:function () {
        this._super();

        this._initBgAndLogo();
        this._setScore();
        this._initDownLoad();

        var playAgain = cc.MenuItemSprite.create(
            cc.Sprite.create(MW.Res.s_menu, cc.rect(378, 0, 126, 33)),
            cc.Sprite.create(MW.Res.s_menu, cc.rect(378, 33, 126, 33)),
            this, this.onPlayAgain);
        playAgain.setPosition(cc.p(0, -10));
        var menu = cc.Menu.create(playAgain);
        this.addChild(menu, 1, 2);

        if (MW.SOUND) {
            cc.AudioEngine.getInstance().playBackgroundMusic(MW.Res.s_mainMainMusic);
        }

    },
    _initBgAndLogo:function () {
        var bg = cc.Sprite.create(MW.Res.s_mainMenuBg);
        bg.setAnchorPoint(MW.AnchorPoint.BottomLeft);
        this.addChild(bg, MW.ZORDER.BG);

        var logo = cc.Sprite.create(MW.Res.s_gameOver);
        logo.setPosition(cc.pAdd(MW.VisibleRect.top(), cc.p(0, -135)));
        this.addChild(logo, MW.ZORDER.UI);

        var cocos2dhtml5 = cc.Sprite.create(MW.Res.s_cocos2dhtml5);
        cocos2dhtml5.setPosition(cc.pAdd(MW.VisibleRect.center(), cc.p(0, -90)));
        this.addChild(cocos2dhtml5, MW.ZORDER.UI);
    },
    _setScore:function () {
        var lbScore = cc.LabelTTF.create("Your Score:" + MW.SCORE, "Arial Bold", 16);
        lbScore.setPosition(cc.pAdd(MW.VisibleRect.center(), cc.p(0, 40)));
        lbScore.setColor(cc.c3b(250, 179, 0));
        this.addChild(lbScore, MW.ZORDER.UI);
    },
    _initDownLoad:function () {
        var b1 = cc.LabelTTF.create("Download Cocos2d-html5", "Arial", 14);
        var b2 = cc.LabelTTF.create("Download This Sample", "Arial", 14);
        var menu1 = cc.MenuItemLabel.create(b1, this, function () {
            window.open("http://www.cocos2d-x.org/projects/cocos2d-x/wiki/Cocos2d-html5");
        });
        var menu2 = cc.MenuItemLabel.create(b2, this, function () {
            window.open("https://github.com/ShengxiangChen/MoonWarriors");
        });
        var cocos2dMenu = cc.Menu.create(menu1, menu2);
        cocos2dMenu.alignItemsVerticallyWithPadding(10);
        cocos2dMenu.setPosition(cc.pAdd(MW.VisibleRect.center(), cc.p(0, -170)));
        this.addChild(cocos2dMenu);
    },
    onPlayAgain:function () {
        this.removeAllChildrenWithCleanup(true);
        this.removeFromParentAndCleanup(true);
        this._scene.menuPlayAgain();
    }
});

MW.GameOverLayer.create = function () {
    var layer = new MW.GameOverLayer();
    if (layer && layer.init()) {
        return layer;
    }
};