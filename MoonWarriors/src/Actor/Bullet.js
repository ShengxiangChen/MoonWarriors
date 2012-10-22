//bullet
MW.Bullet = MW.BaseActor.extend({
    _isAlive:true,
    xVelocity:0,
    yVelocity:200,
    power:1,
    HP:1,
    moveType:null,
    zOrder:3000,
    _weaponType:"W1.png",
    _group:"EnemyBulet",
    attackMode:MW.ENEMY_MOVE_TYPE.NORMAL,
    parentType:MW.BULLET_TYPE.PLAYER,
    ctor:function (bulletSpeed, weaponType, attackMode) {
        this._super();

     /*   this.yVelocity = -bulletSpeed;
        this.attackMode = attackMode;
        this._weaponType = weaponType;*/
        cc.SpriteFrameCache.getInstance().addSpriteFrames(MW.Res.s_bullet_plist);
        this.initWithSpriteFrameName(this._weaponType);
        this.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
        /*var tmpAction;
         switch (this.attackMode) {
         case MW.ENEMY_MOVE_TYPE.NORMAL:
         tmpAction = cc.MoveBy.create(2, cc.p(this.getPosition().x, 400));
         break;
         case MW.ENEMY_ATTACK_MODE.TSUIHIKIDAN:
         tmpAction = cc.MoveTo.create(2, MW.GameLayer.create()._ship.getPosition());
         break;
         }
         this.runAction(tmpAction);*/
    },
    update:function (dt) {
        var p = this.getPosition();
        p.x -= this.xVelocity * dt;
        p.y -= this.yVelocity * dt;
        this.setPosition(p);
        if (this.HP <= 0) {
            this._isAlive = false;
        }
        this._super();
    },
    destroy:function () {
       this._super();

        var explode = cc.Sprite.create(MW.Res.s_hit);
        explode.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
        explode.setPosition(this.getPosition());
        explode.setRotation(Math.random()*360);
        explode.setScale(0.75);
        this._delegate.getScene().addChild(explode,MW.ZORDER.TOP+100);

        var removeExplode = cc.CallFunc.create(explode,explode.removeFromParentAndCleanup,true);
        explode.runAction(cc.ScaleBy.create(0.3, 2,2));
        explode.runAction(cc.Sequence.create(cc.FadeOut.create(0.3), removeExplode));
    },
    hurt:function () {
        this.HP--;
    },
    collideRect:function(){
        var p = this.getPosition();
        return cc.rect(p.x - 3, p.y - 3, 6, 6);
    }
});

MW.EnemyBullet = MW.Bullet.extend({
    yVelocity:200,
    _weaponType:"W2.png",
    _group:"EnemyBullet",
    ctor:function(){
        this._super();
        this.initWithSpriteFrameName(this._weaponType);
        this.setCollideRect(cc.rect(- 3, - 3, 6, 6));
    }
});

MW.ShipBullet = MW.Bullet.extend({
    yVelocity:-900,
    _weaponType:"W1.png",
    _group:"ShipBullet",
    ctor:function(){
        this._super();
        this.initWithSpriteFrameName(this._weaponType);
        this.setCollideRect(cc.rect(- 3, - 3, 6, 6));
    }
});