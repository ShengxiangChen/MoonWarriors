MW.Explode = cc.Sprite.extend({
    ctor:function () {
        this._super();
        // needed for JS-Bindings compatibility
        cc.associateWithNative(this, cc.Sprite);
    },
    init:function () {
        this._super();
        this.initWithFile(MW.Res.s_hit);
        this.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
        this.setRotation(Math.random() * 360);
        this.setScale(0.75);

        var removeExplode = cc.CallFunc.create(this, function(sender){
            sender.removeFromParentAndCleanup(true);
        });
        var action = cc.Spawn.create(cc.ScaleBy.create(0.3, 2, 2), cc.Sequence.create(cc.FadeOut.create(0.3), removeExplode));
        this.runAction(action);
    }
});

MW.Explode.create = function () {
    var exp = new MW.Explode();
    exp.init();
    return exp;
};