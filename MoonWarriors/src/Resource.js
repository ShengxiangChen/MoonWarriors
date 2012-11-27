var dirImg = "";
var dirMusic = "";
var musicSuffix = ".mp3";
if (cc.config.deviceType == 'browser') {
    dirImg = "MoonWarriors/res/";
    dirMusic = "MoonWarriors/res/Music/";
    musicSuffix = "";
}
else if( cc.config.engine == 'cocos2d-x') {
    dirImg = "res/";
    dirMusic = "res/Music/";
    musicSuffix = ".mp3";
}


MW.Res = {
    //mainMenu
    s_mainMenu_plist:dirImg+"mainMenu.plist",
    s_mainMenu_png:dirImg+"mainMenu.png",

    //image
    s_bg01:dirImg + "bg01.jpg",
    s_b01:dirImg + "b01.png",
    s_mainMenuBg:dirImg + "mainMenuBg.png",
    s_ship01:dirImg + "ship01.png",
    s_menu:dirImg + "menu.png",
    s_logo:dirImg + "logo.png",
    s_cocos2dhtml5:dirImg + "cocos2d-html5.png",
    s_gameOver:dirImg + "gameOver.png",
    s_menuTitle:dirImg + "menuTitle.png",
    s_Enemy:dirImg + "Enemy.png",
    s_flare:dirImg + "flare.jpg",
    s_bullet:dirImg + "bullet.png",
    s_explosion:dirImg + "explosion.png",
    s_explode1:dirImg + "explode1.jpg",
    s_explode2:dirImg + "explode2.jpg",
    s_explode3:dirImg + "explode3.jpg",
    s_hit:dirImg + "hit.jpg",
    s_arial14:dirImg + "arial-14.png",
    s_arial14_fnt:dirImg + "arial-14.fnt",

    //music
    s_bgMusic:dirMusic + "bgMusic" + musicSuffix,
    s_mainMainMusic:dirMusic + "mainMainMusic" + musicSuffix,

    //effect
    s_buttonEffect:dirMusic + "buttonEffet" + musicSuffix,
    s_explodeEffect:dirMusic + "explodeEffect" + musicSuffix,
    s_fireEffect:dirMusic + "fireEffect" + musicSuffix,
    s_shipDestroyEffect:dirMusic + "shipDestroyEffect" + musicSuffix,

    //tmx
    s_level01:dirImg + "level01.tmx",

    //plist
    s_Enemy_plist:dirImg + "Enemy.plist",
    s_explosion_plist:dirImg + "explosion.plist",
    s_bullet_plist:dirImg + "bullet.plist"
};

var g_ressources = [
    //main Menu
    {type:"plist", src:MW.Res.s_mainMenu_plist},
    {type:"image", src:MW.Res.s_mainMenu_png},

    //image
    {type:"image", src:MW.Res.s_bg01},
    {type:"image", src:MW.Res.s_b01},
    {type:"image", src:MW.Res.s_mainMenuBg},
    {type:"image", src:MW.Res.s_ship01},
    {type:"image", src:MW.Res.s_menu},
    {type:"image", src:MW.Res.s_logo},
    {type:"image", src:MW.Res.s_cocos2dhtml5},
    {type:"image", src:MW.Res.s_gameOver},
    {type:"image", src:MW.Res.s_menuTitle},
    {type:"image", src:MW.Res.s_Enemy},
    {type:"image", src:MW.Res.s_flare},
    {type:"image", src:MW.Res.s_bullet},
    {type:"image", src:MW.Res.s_explosion},
    {type:"image", src:MW.Res.s_explode1},
    {type:"image", src:MW.Res.s_explode2},
    {type:"image", src:MW.Res.s_explode3},
    {type:"image", src:MW.Res.s_hit},
    {type:"image", src:MW.Res.s_arial14},

    //tmx
    {type:"tmx", src:MW.Res.s_level01},

    //plist
    {type:"plist", src:MW.Res.s_Enemy_plist},
    {type:"plist", src:MW.Res.s_explosion_plist},
    {type:"plist", src:MW.Res.s_bullet_plist},


    //music
    {type:"bgm", src:MW.Res.s_bgMusic},
    {type:"bgm", src:MW.Res.s_mainMainMusic},

    //effect
    {type:"effect", src:MW.Res.s_buttonEffect},
    {type:"effect", src:MW.Res.s_explodeEffect},
    {type:"effect", src:MW.Res.s_fireEffect},
    {type:"effect", src:MW.Res.s_shipDestroyEffect},

    // FNT
    {type:"fnt", src:MW.Res.s_arial14_fnt}

];
