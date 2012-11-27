MW.Ship = MW.BaseActor.extend({
    speed:220,
    bulletSpeed:900,
    HP:5,
    bulletTypeValue:1,
    bulletPowerValue:1,
    throwBombing:false,
    canBeAttack:true,
    isThrowingBomb:false,
    zOrder:3000,
    maxBulletPowerValue:4,
    appearPosition:cc.p(160, 60),
    _hurtColorLife:0,
    _isAlive:true,
    _group:"Ship",
    ctor:function () {

        // needed for JS-Bindings compatibility
        cc.associateWithNative(this, cc.Sprite);

        //init life
        var shipTexture = cc.TextureCache.getInstance().addImage(MW.Res.s_ship01);
        this.initWithTexture(shipTexture, cc.rect(0, 0, 60, 38));
        this.setTag(this.zOrder);
        this.setPosition(this.appearPosition);

        // set frame
        var frame0 = cc.SpriteFrame.createWithTexture(shipTexture, cc.rect(0, 0, 60, 38));
        var frame1 = cc.SpriteFrame.createWithTexture(shipTexture, cc.rect(60, 0, 60, 38));

        var animFrames = [];
        animFrames.push(frame0);
        animFrames.push(frame1);

        // ship animate
        var animation = cc.Animation.create(animFrames, 0.1);
        var animate = cc.Animate.create(animation);
        this.runAction(cc.RepeatForever.create(animate));
        this.schedule(this.shoot, 1 / 6);

        //revive effect
        this.canBeAttack = false;
        var ghostSprite = cc.Sprite.createWithTexture(shipTexture, cc.rect(0, 45, 60, 38));
        ghostSprite.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
        ghostSprite.setScale(8);
        ghostSprite.setPosition(cc.p(this.getContentSize().width / 2, 12));
        this.addChild(ghostSprite, 3000, 99999);
        ghostSprite.runAction(cc.ScaleTo.create(0.5, 1, 1));
        var blinks = cc.Blink.create(3, 9);
        var makeBeAttack = cc.CallFunc.create(this, function (t) {
            t.canBeAttack = true;
            t.setVisible(true);
            t.removeChild(ghostSprite, true);
        });
        this.runAction(cc.Sequence.create(cc.DelayTime.create(0.5), blinks, makeBeAttack));

        var a = this.getContentSize();
        this.setCollideRect(cc.rect(- a.width / 2, - a.height / 2, a.width, a.height / 2));
    },
    setDelegate:function (delegate) {
        this._delegate = delegate;
    },
    update:function (dt) {
        // Keys are only enabled on the browser
        if (cc.config.deviceType == 'browser') {
            var pos = this.getPosition();
            if ((MW.KEYS[cc.KEY.w] || MW.KEYS[cc.KEY.up]) && pos.y <= MW.ScreenHeight) {
                pos.y += dt * this.speed;
            }
            if ((MW.KEYS[cc.KEY.s] || MW.KEYS[cc.KEY.down]) && pos.y >= 0) {
                pos.y -= dt * this.speed;
            }
            if ((MW.KEYS[cc.KEY.a] || MW.KEYS[cc.KEY.left]) && pos.x >= 0) {
                pos.x -= dt * this.speed;
            }
            if ((MW.KEYS[cc.KEY.d] || MW.KEYS[cc.KEY.right]) && pos.x <= MW.ScreenWidth) {
                pos.x += dt * this.speed;
            }
            this.setPosition(pos);
        }

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
                this.setColor(cc.white());
            }
        }
        this._super();
    },
    shoot:function (dt) {
        //this.shootEffect();
        var offset = 13;
        var p = this.getPosition();
        var cs = this.getContentSize();

        var bullet1 = new MW.ShipBullet();
        this._delegate.getScene().addActor(bullet1);
        bullet1.setPosition(cc.p(p.x + offset, p.y + 3 + cs.height * 0.3));
        bullet1.setDelegate(this._delegate);

        var bullet2 = new MW.ShipBullet();
        this._delegate.getScene().addActor(bullet2);
        bullet2.setPosition(cc.p(p.x - offset, p.y + 3 + cs.height * 0.3));
        bullet2.setDelegate(this._delegate);
    },
    destroy:function () {
        MW.LIFE--;

        var explosion = new MW.Explosion();
        explosion.setPosition(this.getPosition());
        this._delegate.getScene().addChild(explosion);

        MW.PlayEffect(MW.Res.s_shipDestroyEffect);
        this._super();
    },
    hurt:function () {
        if (this.canBeAttack) {
            this._hurtColorLife = 2;
            this.HP--;
            this.setColor(cc.red());
        }
    }
});

MW.Ship.getInstance = function () {
    if (this._instance) {
        this._instance = new MW.Ship();
    }
    return this._instance;
};

MW.Ship._instance = null;



