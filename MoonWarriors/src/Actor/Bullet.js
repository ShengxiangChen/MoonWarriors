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
    ctor:function () {
        this._super();
        this.initWithSpriteFrameName(this._weaponType);
        this.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
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

         var explode = MW.Explode.create();
        explode.setPosition(this.getPosition());
        this._delegate.getScene().addChild(explode,MW.ZORDER.TOP+100);
    },
    hurt:function () {
        this.HP--;
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