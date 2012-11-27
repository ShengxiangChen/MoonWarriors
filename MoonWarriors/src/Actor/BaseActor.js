MW.BaseActor = cc.Sprite.extend({
    _isAlive:true,
    _disableUpdate:null,
    _collideRect:cc.rect(0, 0, 10, 10),
    _scene:null,
    _group:"Default",
    _pause:false,
    ctor:function () {
        this._super();
        // needed for JS-Bindings compatibility
        cc.associateWithNative(this, cc.Sprite);
    },
    setDelegate:function (v) {
        this._delegate = v;
    },
    getDelegate:function () {
        return  this._delegate;
    },
    setScene:function (scene) {
        this._scene = scene;
    },
    getScene:function (scene) {
        return this._scene;
    },
    getGroup:function () {
        return this._group
    },
    setGroup:function (scene) {
        this._group = scene
    },
    getIsPause:function () {
        return this._pause
    },
    setIsPause:function (p) {
        this._pause = p
    },
    getIsAlive:function () {
        return this._isAlive
    },
    setIsAlive:function (a) {
        this._isAlive = a
    },
    setCollideRect:function (rect) {
        this._collideRect = rect;
    },
    getCollideRect:function () {
        return this._collideRect;
    },
    setUpdatebySelf:function (enable) {
        if (this._disableUpdate && enable) {
            this.schedule(this.update);
        }
        if (!this._disableUpdate && !enable) {
            this.unschedule(this.update);
        }
        this._disableUpdate = !enable;
    },
    getUpdatebySelfValue:function () {
        return !this._disableUpdate;
    },
    update:function () {
        if (this._isAlive) {
            var rcEScreenRect = MW.VisibleRect.rect();
            if (!cc.Rect.CCRectContainsPoint(rcEScreenRect, this.getPosition())) {
                this.removeSelfFromScene();
            }
        }
        else{
            this.destroy();
        }
    },
    collideWith:function (actor) {
        if (!this._isAlive || !actor.getIsAlive()) {
            return false;
        }

        if (!this.isVisible() || !actor.isVisible()) {
            return false;
        }

        var rect1 = this._collideRect;
        var ptCenter1 = cc.pAdd(rect1.origin, cc.p(rect1.size.width / 2, rect1.size.height / 2));
        var radius1 = Math.sqrt(Math.pow(rect1.size.width / 2, 2) + Math.pow(rect1.size.height / 2, 2));
        //ptCenter1 = cc.pRotateByAngle(ptCenter1, cc.PointZero(), this.getCurRotation());
        ptCenter1 = cc.pAdd(this.getPosition(), ptCenter1);

        var rect2 = actor.getCollideRect();
        var ptCenter2 = cc.pAdd(rect2.origin, cc.p(rect2.size.width / 2, rect2.size.height / 2));
        var radius2 = Math.sqrt(Math.pow(rect2.size.width / 2, 2) + Math.pow(rect2.size.height / 2, 2));
        //ptCenter2 = cc.pRotateByAngle(ptCenter2, cc.PointZero(), actor.getCurRotation());
        ptCenter2 = cc.pAdd(actor.getPosition(), ptCenter2);

        var dis = cc.pDistance(ptCenter1, ptCenter2);
        return (dis <= (radius1 + radius2));
    },
    collidesWithRect:function (rect, collides) {

    },
    removeSelfFromScene:function () {
        this._isAlive = false;

        this.setPosition(cc.p(-100, -100));
        this.stopAllActions();
        this.setUpdatebySelf(false);
        this._scene.removeActor(this);
    },
    destroy:function(){
        var scene = MW.GameController.getInstance().getCurScene();
        scene.removeActor(this);
    },
    resetState:function () {
        this._pause = false;
        this._isAlive = true;
        this.setUpdatebySelf(true);
    }
});