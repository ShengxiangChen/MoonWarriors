MW.Explosion = cc.Sprite.extend({
    tmpWidth:0,
    tmpHeight:0,
    ctor:function () {
        // needed for JS-Bindings compatibility
        cc.associateWithNative( this, cc.Sprite );

        var pFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame("explosion_01.png");
        this.initWithSpriteFrame(pFrame);

        var cs = this.getContentSize();
        this.tmpWidth = cs.width;
        this.tmpHeight = cs.height;

        var animation = cc.AnimationCache.getInstance().getAnimation("Explosion");
        this.runAction(cc.Sequence.create(
            cc.Animate.create(animation),
            cc.CallFunc.create(this, this.destroy)
        ));
        this.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
    },
    destroy:function () {
        this.removeFromParentAndCleanup(true);
    }
});

