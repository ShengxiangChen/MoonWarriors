/**
 *  Cocos2d-html5 show case : Moon Warriors
 *
 * @Licensed:
 * This showcase is licensed under GPL.
 *
 *  @Authors:
 *  Programmer: Shengxiang Chen (陈升想), Dingping Lv (吕定平), Ricardo Quesada
 *  Effects animation: Hao Wu (吴昊)
 *  Quality Assurance: Sean Lin (林顺)
 *
 *  @Links:
 *  http://www.cocos2d-x.org
 *  http://bbs.html5china.com
 *
 */


MW.GameController = cc.Class.extend({
    _curScene:null,
    _gameState:MW.GAME_STATE.HOME,
    _isNewGame:true,
    _curLevel:MW.LEVEL.STAGE1,
    _selectLevel:MW.LEVEL.STAGE1,
    setCurScene:function (s) {
        if (this._curScene != s) {
            if (this._curScene !== null) {
                this._curScene.onExit();
            }
            this._curScene = s;
            if (this._curScene) {
                cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1, s));
            }
        }
    },
    getCurScene:function () {
        return this._curScene;
    },
    newGame:function () {
        var scene = MW.GameScene.create();
        this.setCurScene(scene);
    },
    backToMenu:function () {
        var scene = MW.StartMenuScene.create();
        this.setCurScene(scene);
    }
});

MW.GameController.getInstance = function () {
    if (!this._instance) {
        this._instance = new MW.GameController();
    }
    return this._instance;           /**/
};

MW.GameController._instance = null;