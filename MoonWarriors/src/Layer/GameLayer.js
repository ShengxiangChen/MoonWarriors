//
// MoonWarriors
//
// Handles the Game Logic
//


MW.GameLayer = cc.Layer.extend({
    _player:null,
    _beginPos:cc.p(0, 0),
    _isTouch:false,
    _scene:null,
    _isGameOverLoading:false,
    ctor:function () {
        cc.associateWithNative(this, cc.Layer);
    },
    getPlayer:function () {
        return this._player;
    },
    setScene:function (scene) {
        this._scene = scene;
    },
    getScene:function () {
        return this._scene;
    },
    onEnter:function () {
        this._super();

        this.initPlayer();
        this.setControll(true);

        this._isGameOverLoading = false;
        MW.PlayBackgroundMusic(MW.Res.s_bgMusic, true);

        return true;
    },
    onExit:function () {
        this._super();
        this._player = null;
    },
    setControll:function (bool) {
        var t = cc.config.deviceType;
        if (t == 'browser') {
            this.setTouchEnabled(bool);
            this.setKeyboardEnabled(bool);
        }
        else if (t == 'desktop') {
            this.setMouseEnabled(bool);
        }
        else if (t == 'mobile') {
            this.setTouchEnabled(bool);
        }

    },
    initPlayer:function () {
        // ship
        this._player = new MW.Ship();
        this._player.setDelegate(this);
        this._scene.addActor(this._player);
    },
    onTouchesBegan:function (touches, event) {
        this._isTouch = true;
    },
    onTouchesMoved:function (touches, event) {
        if (this._isTouch) {
            this.processEvent(touches[0]);
        }
    },
    onTouchesEnded:function (touches, event) {
        this._isTouch = false;
    },
    onMouseDragged:function (event) {
        if (this._isTouch) {
            this.processEvent(event);
        }
    },
    processEvent:function (event) {
        if (this._scene.getGameState() == MW.GAME_STATE.PLAYING) {
            if (this._player && this._player.getIsAlive()) {
                var delta = event.getDelta();
                var curPos = this._player.getPosition();
                curPos = cc.pAdd(curPos, delta);
                curPos = cc.pClamp(curPos, cc.POINT_ZERO, cc.p(MW.ScreenWidth, MW.ScreenHeight));
                this._player.setPosition(curPos);
            }
        }
    },
    onKeyDown:function (e) {
        MW.KEYS[e] = true;
    },

    onKeyUp:function (e) {
        MW.KEYS[e] = false;
    },
    update:function (dt) {
        if (this._player && this._player.getIsAlive()) {
            this._player.update(dt);
        }

        this.updateUnit(dt);
        this.checkForCollide();
        this.checkForReborn();
    },
    updateUnit:function (dt) {
        var tmpBullet, tmpEnemy;

        var shipBulletsArray = this._scene.getActors("ShipBullet");
        for (var i = 0; i < shipBulletsArray.length; i++) {
            tmpBullet = shipBulletsArray[i];
            if (tmpBullet.getIsAlive()) {
                tmpBullet.update(dt);
            }
        }

        var enemyBulletsArray = this._scene.getActors("EnemyBullet");
        for (var j = 0; j < enemyBulletsArray.length; j++) {
            tmpBullet = enemyBulletsArray[j];
            if (tmpBullet.getIsAlive()) {
                tmpBullet.update(dt);
            }
        }

        var enemiesArray = this._scene.getActors("Enemy");
        for (var j = 0; j < enemiesArray.length; j++) {
            tmpEnemy = enemiesArray[j];
            if (tmpEnemy.getIsAlive()) {
                tmpEnemy.update(dt);
            }
        }
    },
    checkForCollide:function () {
        var shipBulletsArray = this._scene.getActors("ShipBullet");
        var enemyBulletsArray = this._scene.getActors("EnemyBullet");
        var enemiesArray = this._scene.getActors("Enemy");

        var tmpBullet, enemy;
        for (var i = 0; i < shipBulletsArray.length; i++) {
            tmpBullet = shipBulletsArray[i];
            if (enemiesArray.length > 0) {
                for (var j = 0; j < enemiesArray.length; j++) {
                    enemy = enemiesArray[j];
                    if (enemy.collideWith(tmpBullet)) {
                        tmpBullet.hurt();
                        enemy.hurt();
                    }
                    if (enemy && this._player) {
                        if (enemy.collideWith(this._player)) {
                            this._player.hurt();
                            enemy.hurt();
                        }
                    }
                }
            }
        }

        for (var j = 0; j < enemyBulletsArray.length; j++) {
            tmpBullet = enemyBulletsArray[j];
            if (tmpBullet && this._player) {
                if (tmpBullet.collideWith(this._player)) {
                    tmpBullet.hurt();
                    this._player.hurt();
                }
            }
        }
    },
    checkForReborn:function () {
        if (MW.LIFE > 0 && this._player && !this._player.getIsAlive()) {
            // ship
            this._player = new MW.Ship();
            this._player.setDelegate(this);
            this._scene.addActor(this._player);
        }
        else if (MW.LIFE <= 0 && this._player && !this._player.getIsAlive()) {
            if (!this._isGameOverLoading) {
                this._isGameOverLoading = true;
                var action = cc.Sequence.create(cc.DelayTime.create(3), cc.CallFunc.create(this, this.onGameOver));
                this.runAction(action);
            }
        }
    },
    onGameOver:function () {
        this.setControll(true);
        this._scene.removeAllActor();
        this._scene.setGameOver();
        this.onExit();
    }
});

MW.GameLayer.create = function () {
    var sg = new MW.GameLayer();
    if (sg && sg.init()) {
        return sg;
    }
};