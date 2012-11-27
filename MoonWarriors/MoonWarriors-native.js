/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org

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

// boot code needed for cocos2d + JS bindings.
// Not needed by cocos2d-html5

require("jsb_constants.js");

var MW = MW || {};

var appFiles = [
    //resource
    'Resource.js',

    //Config
    'Config/GameConfig.js',
    'Config/AutoAdaptive.js',
    'Config/EnemyType.js',
    'Config/Level.js',

    //Actor
    'Actor/BaseActor.js',
    'Actor/Ship.js',
    'Actor/Enemy.js',
    'Actor/Bullet.js',

    //Effect
    'Effect/Effect.js',
    'Effect/Explosion.js',
    'Effect/Explode.js',

    //Controller
    'Controller/LevelManager.js',
    'Controller/GameController.js',

    //Layer
    'Layer/GameLayer.js',
    'Layer/BackgroundLayer.js',
    'Layer/GameOverLayer.js',
    'Layer/AboutLayer.js',
    'Layer/GameUILayer.js',
    'Layer/SettingsLayer.js',
    'Layer/StartMenuLayer.js',

    //Scene
    'Scene/StartMenuScene.js',
    'Scene/GameScene.js'
];

cc.dumpConfig();

for (var i = 0; i < appFiles.length; i++) {
    require(appFiles[i]);
}

MW.AutoAdaptive.getInstance().initVisible();

var director = cc.Director.getInstance();
director.setDisplayStats(true);


// set FPS. the default value is 1.0/60 if you don't call this
director.setAnimationInterval(1.0 / 60);

// create a scene. it's an autorelease object
var mainScene = MW.StartMenuScene.create();

// run
director.runWithScene(mainScene);

