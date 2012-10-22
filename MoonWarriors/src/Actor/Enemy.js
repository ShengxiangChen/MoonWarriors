var Enemy = MW.BaseActor.extend({
    eID:0,
    _isAlive:true,
    speed:200,
    bulletSpeed:-200,
    HP:15,
    bulletPowerValue:1,
    moveType:null,
    scoreValue:200,
    zOrder:1000,
    delayTime:1 + 1.2 * Math.random(),
    attackMode:MW.ENEMY_MOVE_TYPE.NORMAL,
    _hurtColorLife:0,
    _group:"Enemy",
    ctor:function (arg) {
        // needed for JS-Bindings compatibility
        cc.associateWithNative( this, cc.Sprite );

        this.HP = arg.HP;
        this.moveType = arg.moveType;
        this.scoreValue = arg.scoreValue;
        this.attackMode = arg.attackMode;

        this.initWithSpriteFrameName(arg.textureName);
        this.schedule(this.shoot, this.delayTime);
        var size = this.getContentSize();
        this.setCollideRect(cc.rect(- size.width/2, 0,size.width,size.height/2));
    },
    _timeTick:0,
    update:function (dt) {
        if (this.HP <= 0) {
            this._isAlive = false;
        }
        this._timeTick += dt;
        if (this._timeTick > 0.1) {
            this._timeTick = 0;
            if (this._hurtColorLife > 0) {
                this._hurtColorLife--;
            }
            if (this._hurtColorLife == 1) {
                this.setColor( cc.white() );
            }
        }
        this._super();
    },
    destroy:function () {
        this._super();

        MW.SCORE += this.scoreValue;
        var explosion = new Explosion();
        explosion.setPosition(this.getPosition());
        this._delegate.getScene().addChild(explosion);

        spark(this.getPosition(),this._delegate.getScene(), 1.2, 0.7);

        if(MW.SOUND){
            cc.AudioEngine.getInstance().playEffect(MW.Res.s_explodeEffect);
        }
    },
    shoot:function () {
        var p = this.getPosition();
        var bullet = new MW.EnemyBullet();
        this._delegate.getScene().addActor(bullet);
        bullet.setPosition(cc.p(p.x, p.y - this.getContentSize().height * 0.2));
        bullet.setDelegate(this._delegate);
    },
    hurt:function () {
        this._hurtColorLife = 2;
        this.HP--;
        this.setColor( cc.red());
    },
    collideRect:function(){
        var a = this.getContentSize();
        var p = this.getPosition();
        return cc.rect(p.x - a.width/2, p.y - a.height/4,a.width,a.height/2);
    }
});

Enemy.sharedEnemy = function(){
    cc.SpriteFrameCache.getInstance().addSpriteFrames(MW.Res.s_Enemy_plist, MW.Res.s_Enemy);
};
