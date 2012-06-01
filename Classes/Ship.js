var Ship = cc.Sprite.extend({
    speed:220,
    bulletSpeed:700,
    HP:10,
    bulletTypeValue:1,
    bulletPowerValue:1,
    throwBombing:false,
    canBeAttack:true,
    isThrowingBomb:false,
    zOrder:3000,
    maxBulletPowerValue:4,
    appearPosition:cc.ccp(160, 60),
    _hurtColorLife:0,
    active:true,
    ctor:function () {
        //init life
        var shipTexture = cc.TextureCache.sharedTextureCache().addImage(s_ship01);
        this.initWithTexture(shipTexture, cc.RectMake(0, 0, 60, 38));
        this.setTag(this.zOrder);
        this.setPosition(this.appearPosition);

        // set frame
        var animation = cc.Animation.animation();
        animation.addFrameWithTexture(shipTexture, cc.RectMake(0, 0, 60, 38));
        animation.addFrameWithTexture(shipTexture, cc.RectMake(60, 0, 60, 38));

        // ship animate
        var action = cc.Animate.actionWithDuration(0.1, animation, true);
        this.runAction(cc.RepeatForever.actionWithAction(action));
        this.schedule(this.shoot, 1 / 8);

        //revive effect
        this.canBeAttack = false;
        var ghostSprite = new additiveSprite();
        ghostSprite.initWithTexture(shipTexture, cc.RectMake(0, 45, 60, 38));
        ghostSprite.setScale(8);
        ghostSprite.setPosition(cc.ccp(this.getContentSize().width / 2, 12));
        this.addChild(ghostSprite, 3000, 99999);
        ghostSprite.runAction(cc.ScaleTo.actionWithDuration(0.5, 1, 1));
        var blinks = cc.Blink.actionWithDuration(3, 9);
        var makeBeAttack = cc.CallFunc.actionWithTarget(this, function (t) {
            t.canBeAttack = true;
            t.setIsVisible(true);
            t.removeChild(ghostSprite);
        });
        this.runAction(cc.Sequence.actions(cc.DelayTime.actionWithDuration(0.5), blinks, makeBeAttack));

        if (global.sound) {
            cc.AudioManager.sharedEngine().playBackgroundMusic(s_bgMusic, true);
        }
    },
    update:function (dt) {
        var newX = this.getPosition().x, newY = this.getPosition().y;
        if ((keys[cc.KEY.w] || keys[cc.KEY.up]) && this.getPosition().y <= winSize.height) {
            newY += dt * this.speed;
        }
        if ((keys[cc.KEY.s] || keys[cc.KEY.down]) && this.getPosition().y >= 0) {
            newY -= dt * this.speed;
        }
        if ((keys[cc.KEY.a] || keys[cc.KEY.left]) && this.getPosition().x >= 0) {
            newX -= dt * this.speed;
        }
        if ((keys[cc.KEY.d] || keys[cc.KEY.right]) && this.getPosition().x <= winSize.width) {
            newX += dt * this.speed;
        }
        this.setPosition(cc.ccp(newX, newY));

        if (this.HP <= 0) {
            this.active = false;
        }
        this._timeTick += dt;
        if (this._timeTick > 0.1) {
            this._timeTick = 0;
            if (this._hurtColorLife > 0) {
                this._hurtColorLife--;
            }
            if (this._hurtColorLife == 1) {
                this.setColor(new cc.Color3B(255, 255, 255));
            }
        }
    },
    shoot:function (dt) {
        //this.shootEffect();
        var offset = 13;
        var a = new Bullet(this.bulletSpeed, "W1.png", global.AttackMode.Normal);
        this.getParent().addChild(a, a.zOrder, global.Tag.ShipBullet);
        a.setPosition(cc.ccp(this.getPosition().x + offset, this.getPosition().y + 3 + this.getContentSize().height * 0.3));

        var b = new Bullet(this.bulletSpeed, "W1.png", global.AttackMode.Normal);
        this.getParent().addChild(b, b.zOrder, global.Tag.ShipBullet);
        b.setPosition(cc.ccp(this.getPosition().x - offset, this.getPosition().y + 3 + this.getContentSize().height * 0.3));
    },
    destroy:function () {
        global.life--;
        this.getParent().addChild(new Explosion(this.getPosition().x, this.getPosition().y));
        this.getParent().removeChild(this);
        if (global.sound) {
            cc.AudioManager.sharedEngine().playEffect(s_shipDestroyEffect);
        }
    },
    hurt:function () {
        if (this.canBeAttack) {
            this._hurtColorLife = 2;
            this.HP--;
            this.setColor(cc.RED());
        }
    },
    collideRect:function(){
        var a = this.getContentSize();
        var r = new cc.RectMake(this.getPositionX() - a.width/2,this.getPositionY() - a.height/2,a.width,a.height/2);
        return r;
    }
});
