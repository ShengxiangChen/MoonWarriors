var additiveSprite = cc.Sprite.extend({
    draw:function (ctx) {
        var context = ctx || cc.renderContext;
        context.globalCompositeOperation = 'lighter';
        this._super(ctx);
    }
});

var flareEffect = function (parent, target, callback) {
    var flare = new additiveSprite();
    flare.initWithFile(s_flare);
    parent.addChild(flare, 10);
    flare.setOpacity(0);
    flare.setPosition(cc.ccp(-30, 297));
    flare.setRotation(-120);
    flare.setScale(0.2);

    var opacityAnim = cc.FadeTo.create(0.5, 255);
    var opacDim = cc.FadeTo.create(1, 0);
    var biggeAnim = cc.ScaleBy.create(0.7, 1.2, 1.2);
    var biggerEase = cc.EaseSineOut.create(biggeAnim);
    var moveAnim = cc.MoveBy.create(0.5, cc.ccp(328, 0));
    var easeMove = cc.EaseSineOut.create(moveAnim);
    var rotateAnim = cc.RotateBy.create(2.5, 90);
    var rotateEase = cc.EaseExponentialOut.create(rotateAnim)
    var bigger = cc.ScaleTo.create(0.5, 1);

    var onComplete = cc.CallFunc.create(target, callback);
    var killflare = cc.CallFunc.create(flare, function () {
        this.getParent().removeChild(this);
    });
    flare.runAction(cc.Sequence.create(opacityAnim, biggerEase, opacDim, killflare, onComplete));
    flare.runAction(easeMove);
    flare.runAction(rotateEase);
    flare.runAction(bigger);
}


var spark = function (ccpoint, parent, scale, duration) {
    scale = scale || 0.3;
    duration = duration || 0.5;
    var one = new additiveSprite();
    one.initWithFile(s_explode1);
    var two = new additiveSprite();
    two.initWithFile(s_explode2);
    var three = new additiveSprite();
    three.initWithFile(s_explode3);
    one.setPosition(ccpoint);
    two.setPosition(ccpoint);
    three.setPosition(ccpoint);
    //parent.addChild(one);
    parent.addChild(two);
    parent.addChild(three);
    one.setScale(scale);
    two.setScale(scale);
    three.setScale(scale);
    three.setRotation(Math.random() * 360);
    var left = cc.RotateBy.create(duration, -45);
    var right = cc.RotateBy.create(duration, 45);
    var scaleBy = cc.ScaleBy.create(duration, 3, 3);
    var fadeOut = cc.FadeOut.create(duration);
    one.runAction(left);
    two.runAction(right);
    one.runAction(scaleBy);
    two.runAction(scaleBy.copy());
    three.runAction(scaleBy.copy());
    one.runAction(fadeOut);
    two.runAction(fadeOut.copy());
    three.runAction(fadeOut.copy());
    setTimeout(function () {
        parent.removeChild(one);
        parent.removeChild(two);
        parent.removeChild(three);
    }, duration * 1000);
}