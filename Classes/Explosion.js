var Explosion = additiveSprite.extend({
    tmpWidth:0,
    tmpHeight:0,
    ctor:function () {
        this._super();
        this.tmpWidth = this.getContentSize().width;
        this.tmpHeight = this.getContentSize().height;
        var pFrame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName("explosion_01.png");
        this.initWithSpriteFrame(pFrame);

        var animation = cc.AnimationCache.sharedAnimationCache().animationByName("Explosion");
        this.runAction(cc.Sequence.actions(
            cc.Animate.actionWithAnimation(animation, false),
            cc.CallFunc.actionWithTarget(this, this.destroy)
        ));
    },
    destroy:function () {
        this.getParent().removeChild(this);
    }
});

Explosion.sharedExplosion = function () {
    cc.SpriteFrameCache.sharedSpriteFrameCache().addSpriteFramesWithFile(s_explosion_plist);
    var animFrames = [];
    var str = "";
    for (var i = 1; i < 35; i++) {
        str = "explosion_" + (i < 10 ? ("0" + i) : i) + ".png";
        var frame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName(str);
        animFrames.push(frame);
    }
    var animation = cc.Animation.animationWithFrames(animFrames, 0.04);
    cc.AnimationCache.sharedAnimationCache().addAnimation(animation, "Explosion");
};