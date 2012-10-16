/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org


 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var cocos2dApp = cc.Application.extend({
    config:document.querySelector('#cocos2d-html5').c,
    ctor:function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config.COCOS2D_DEBUG;
        //cc.IS_SHOW_DEBUG_ON_PAGE = true;
        cc.setup(this.config.tag);
        cc.AudioEngine.getInstance().init("mp3,ogg");
        MW.AutoAdaptive.getInstance().initVisible();

        cc.Loader.getInstance().onloading = function () {
            cc.LoaderScene.getInstance().draw();
        };
        cc.Loader.getInstance().onload = function () {
            cc.AppController.shareAppController().didFinishLaunchingWithOptions();
            /*cc.adjustSizeForWindow();
            window.addEventListener("resize", function (event) {
                cc.adjustSizeForWindow();
            });*/
        };
        cc.Loader.getInstance().preload(g_ressources);
    },
    applicationDidFinishLaunching:function () {
        // initialize director
        var director = cc.Director.getInstance();

        // turn on display FPS
        director.setDisplayStats(this.config.showFPS);

        // set FPS. the default value is 1.0/60 if you don't call this
        director.setAnimationInterval(1.0 / this.config.frameRate);

        // run
        director.runWithScene(new this.startScene());

        return true;
    }
});

cc.adjustSizeForWindow = function () {
    var margin = document.documentElement.clientWidth - document.body.clientWidth;
    if (document.documentElement.clientWidth < cc.originalCanvasSize.width) {
        cc.canvas.width = cc.originalCanvasSize.width;
    } else {
        cc.canvas.width = document.documentElement.clientWidth - margin;
    }
    if (document.documentElement.clientHeight < cc.originalCanvasSize.height) {
        cc.canvas.height = cc.originalCanvasSize.height;
    } else {
        cc.canvas.height = document.documentElement.clientHeight - margin;
    }

    var xScale = cc.canvas.width / cc.originalCanvasSize.width;
    var yScale = cc.canvas.height / cc.originalCanvasSize.height;
    if (xScale > yScale) {
        xScale = yScale;
    }
    cc.canvas.width = cc.originalCanvasSize.width * xScale;
    cc.canvas.height = cc.originalCanvasSize.height * xScale;
    var divContainer = document.getElementById("Container");
    var parentDiv = document.getElementById("Cocos2dGameContainer");
    if (parentDiv) {
        parentDiv.style.width = cc.canvas.width + "px";
        parentDiv.style.height = cc.canvas.height + "px";
    }
    if (divContainer) {
        divContainer.style.width = cc.canvas.width + "px";
        divContainer.style.height = cc.canvas.height + "px";
    }
    cc.renderContext.translate(0, cc.canvas.height);
    cc.renderContext.scale(xScale, xScale);
    cc.Director.getInstance().setContentScaleFactor(xScale);
};

var myApp = new cocos2dApp(MW.StartMenuScene.create);