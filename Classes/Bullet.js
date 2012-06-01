//bullet
var Bullet = additiveSprite.extend({
    active:true,
    xVolocity:0,
    yVolocity:200,
    power:1,
    HP:1,
    moveType:null,
    zOrder:3000,
    attackMode:global.AttackMode.Normal,
    parentType:global.bulletType.Ship,
    ctor:function (bulletSpeed, weaponType, attackMode) {
        this.yVolocity = -bulletSpeed;
        this.attackMode = attackMode;
        cc.SpriteFrameCache.sharedSpriteFrameCache().addSpriteFramesWithFile(s_bullet_plist);
        this.initWithSpriteFrameName(weaponType);
        /*var tmpAction;
         switch (this.attackMode) {
         case global.AttackMode.Normal:
         tmpAction = cc.MoveBy.actionWithDuration(2, cc.ccp(this.getPosition().x, 400));
         break;
         case global.AttackMode.Tsuihikidan:
         tmpAction = cc.MoveTo.actionWithDuration(2, GameLayer.node()._ship.getPosition());
         break;
         }
         this.runAction(tmpAction);*/

    },
    update:function (dt) {
        var newX = this.getPositionX(), newY = this.getPositionY();
        newX -= this.xVolocity * dt;
        newY -= this.yVolocity * dt;
        this.setPosition(cc.ccp(newX, newY));
        if (this.HP <= 0) {
            this.active = false;
        }
    },
    destroy:function () {
        var explode = new additiveSprite();
        explode.initWithFile(s_hit);
        explode.setPosition(this.getPosition());
        explode.setRotation(Math.random()*360);
        explode.setScale(0.75);
        this.getParent().addChild(explode,9999);
        this.getParent().removeChild(this);
        var removeExplode = cc.CallFunc.actionWithTarget(explode,explode.removeFromParentAndCleanup);
        explode.runAction(cc.ScaleBy.actionWithDuration(0.3, 2,2));
        explode.runAction(cc.Sequence.actions(cc.FadeOut.actionWithDuration(0.3), removeExplode))
    },
    hurt:function () {
        this.HP--;
    },
    collideRect:function(){
        var a = this.getContentSize();
        var r = new cc.RectMake(this.getPositionX() - 3,this.getPositionY() - 3,6,6);
        return r;
    }
});