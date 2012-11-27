MW.StartMenuScene = cc.Scene.extend({
    ctor:function () {
        cc.associateWithNative(this, cc.Scene);
    },
    onEnter:function () {
        this._super();
        var layer = MW.StartMenuLayer.create();
        this.addChild(layer);
    }
});

MW.StartMenuScene.create = function () {
    return new MW.StartMenuScene();
};