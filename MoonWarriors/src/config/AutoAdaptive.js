MW.AutoAdaptive = cc.Class.extend({
    initVisible:function () {
        //init anchor point
        MW.AnchorPoint = {
            Center:cc.p(0.5, 0.5),
            Top:cc.p(0.5, 1),
            TopRight:cc.p(1, 1),
            Right:cc.p(1, 0.5),
            BottomRight:cc.p(1, 0),
            Bottom:cc.p(0.5, 0),
            BottomLeft:cc.p(0, 0),
            Left:cc.p(0, 0.5),
            TopLeft:cc.p(0, 1)
        };

        //init visible rect
        MW.VisibleRect = {
            _rcVisible:cc.RectZero(),
            _ptCenter:cc.PointZero(),
            _ptTop:cc.PointZero(),
            _ptTopRight:cc.PointZero(),
            _ptRight:cc.PointZero(),
            _ptBottomRight:cc.PointZero(),
            _ptBottom:cc.PointZero(),
            _ptLeft:cc.PointZero(),
            _ptTopLeft:cc.PointZero(),
            rect:function () {
                if (this._rcVisible.size.width == 0) {
                    var s = cc.Director.getInstance().getWinSize();
                    this._rcVisible = cc.RectMake(0, 0, s.width, s.height);
                }
                return this._rcVisible;
            },
            center:function () {
                if (this._ptCenter.x == 0) {
                    var rc = this.rect();
                    this._ptCenter.x = rc.origin.x + rc.size.width / 2;
                    this._ptCenter.y = rc.origin.y + rc.size.height / 2;
                }
                return this._ptCenter;
            },
            top:function () {
                if (this._ptTop.x == 0) {
                    var rc = this.rect();
                    this._ptTop.x = rc.origin.x + rc.size.width / 2;
                    this._ptTop.y = rc.origin.y + rc.size.height;
                }
                return this._ptTop;
            },
            topRight:function () {
                if (this._ptTopRight.x == 0) {
                    var rc = this.rect();
                    this._ptTopRight.x = rc.origin.x + rc.size.width;
                    this._ptTopRight.y = rc.origin.y + rc.size.height;
                }
                return this._ptTopRight;
            },
            right:function () {
                if (this._ptRight.x == 0) {
                    var rc = this.rect();
                    this._ptRight.x = rc.origin.x + rc.size.width;
                    this._ptRight.y = rc.origin.y + rc.size.height / 2;
                }
                return this._ptRight;
            },
            bottomRight:function () {
                if (this._ptBottomRight.x == 0) {
                    var rc = this.rect();
                    this._ptBottomRight.x = rc.origin.x + rc.size.width;
                    this._ptBottomRight.y = rc.origin.y;
                }
                return this._ptBottomRight;
            },
            bottom:function () {
                if (this._ptBottom.x == 0) {
                    var rc = this.rect();
                    this._ptBottom.x = rc.origin.x + rc.size.width / 2;
                    this._ptBottom.y = rc.origin.y;
                }
                return this._ptBottom;
            },
            bottomLeft:function () {
                return this.rect().origin;
            },
            left:function () {
                if (this._ptLeft.x == 0) {
                    var rc = this.rect();
                    this._ptLeft.x = rc.origin.x;
                    this._ptLeft.y = rc.origin.y + rc.size.height / 2;
                }
                return this._ptLeft;
            },
            topLeft:function () {
                if (this._ptTopLeft.x == 0) {
                    var rc = this.rect();
                    this._ptTopLeft.x = rc.origin.x;
                    this._ptTopLeft.y = rc.origin.y + rc.size.height;
                }
                return this._ptTopLeft;
            }
        };

        MW.ScreenWidth = MW.VisibleRect.rect().size.width;
        MW.ScreenHeight = MW.VisibleRect.rect().size.height;
    }
});

MW.AutoAdaptive.getInstance = function () {
    if (!this._instance) {
        this._instance = new MW.AutoAdaptive();
        //this._instance.init();
    }
    return this._instance;
};

MW.AutoAdaptive._instance = null;

