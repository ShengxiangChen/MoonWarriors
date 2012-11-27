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

// boot code needed for cocos2d-html5
// Not needed by cocos2d + JS bindings

var MW = MW || {};

(function () {
    var d = document;
    var c = {
        menuType:'canvas', //whether to use canvas mode menu or dom menu
        COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
        showFPS:true,
        frameRate:60,
        tag:'gameCanvas', //the dom element to run cocos2d on
        //engineDir:'../cocos2d-x/cocos2d-html5/cocos2d/',
        engineDir:'libs/cocos2d/',
        appFiles:[
            //resource
            'MoonWarriors/src/Resource.js',

            //Config
            'MoonWarriors/src/Config/GameConfig.js',
            'MoonWarriors/src/Config/AutoAdaptive.js',
            'MoonWarriors/src/Config/EnemyType.js',
            'MoonWarriors/src/Config/Level.js',

            //Actor
            'MoonWarriors/src/Actor/BaseActor.js',
            'MoonWarriors/src/Actor/Ship.js',
            'MoonWarriors/src/Actor/Enemy.js',
            'MoonWarriors/src/Actor/Bullet.js',

            //Effect
            'MoonWarriors/src/Effect/Effect.js',
            'MoonWarriors/src/Effect/Explosion.js',
            'MoonWarriors/src/Effect/Explode.js',

            //Controller
            'MoonWarriors/src/Controller/LevelManager.js',
            'MoonWarriors/src/Controller/GameController.js',

            //Layer
            'MoonWarriors/src/Layer/GameLayer.js',
            'MoonWarriors/src/Layer/BackgroundLayer.js',
            'MoonWarriors/src/Layer/GameOverLayer.js',
            'MoonWarriors/src/Layer/AboutLayer.js',
            'MoonWarriors/src/Layer/GameUILayer.js',
            'MoonWarriors/src/Layer/SettingsLayer.js',
            'MoonWarriors/src/Layer/StartMenuLayer.js',

            //Scene
            'MoonWarriors/src/Scene/StartMenuScene.js',
            'MoonWarriors/src/Scene/GameScene.js'

        ]
    };
    window.addEventListener('DOMContentLoaded', function () {
        //first load engine file if specified
        var s = d.createElement('script');
        s.src = c.engineDir + 'platform/jsloader.js';
        d.body.appendChild(s);
        s.c = c;
        s.id = 'cocos2d-html5';
        //else if single file specified, load singlefile
    });
})();
