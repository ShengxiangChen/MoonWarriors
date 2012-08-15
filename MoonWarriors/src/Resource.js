var dir = "";
if( cc.config.deviceType == 'browser' )
    dir = "MoonWarriors/res/";

//image
var s_bg01 = dir + "bg01.png";
var s_loading = dir + "loading.png";
var s_ship01 = dir + "ship01.png";
var s_menu = dir + "menu.png";
var s_logo = dir + "logo.png";
var s_cocos2dhtml5 = dir + "cocos2d-html5.png";
var s_gameOver = dir + "gameOver.png";
var s_menuTitle = dir + "menuTitle.png";
var s_Enemy = dir + "Enemy.png";
var s_flare = dir + "flare.jpg";
var s_bullet = dir + "bullet.png";
var s_explosion = dir + "explosion.png";
var s_explode1 = dir + "explode1.jpg";
var s_explode2= dir + "explode2.jpg";
var s_explode3 = dir + "explode3.jpg";
var s_hit = dir + "hit.jpg";
var s_arial14 = dir + "arial-14.png";
var s_arial14_fnt = dir + "arial-14.fnt";

//music
var s_bgMusic = dir + "Music/bgMusic";
var s_mainMainMusic = dir + "Music/mainMainMusic";

//effect
var s_buttonEffect = dir + "Music/buttonEffet";
var s_explodeEffect = dir + "Music/explodeEffect";
var s_fireEffect = dir + "Music/fireEffect";
var s_shipDestroyEffect = dir + "Music/shipDestroyEffect";

//tmx
var s_level01 = dir + "level01.tmx";

//plist
var s_Enemy_plist = dir + "Enemy.plist";
var s_explosion_plist = dir + "explosion.plist";
var s_bullet_plist = dir + "bullet.plist";

var g_ressources = [
    //image
    {type:"image", src:s_bg01},
    {type:"image", src:s_loading},
    {type:"image", src:s_ship01},
    {type:"image", src:s_menu},
    {type:"image", src:s_logo},
    {type:"image", src:s_cocos2dhtml5},
    {type:"image", src:s_gameOver},
    {type:"image", src:s_menuTitle},
    {type:"image", src:s_Enemy},
    {type:"image", src:s_flare},
    {type:"image", src:s_bullet},
    {type:"image", src:s_explosion},
    {type:"image", src:s_explode1},
    {type:"image", src:s_explode2},
    {type:"image", src:s_explode3},
    {type:"image", src:s_hit},
    {type:"image", src:s_arial14},

    //tmx
    {type:"tmx", src:s_level01},

    //plist
    {type:"plist", src:s_Enemy_plist},
    {type:"plist", src:s_explosion_plist},
    {type:"plist", src:s_bullet_plist},

    //music
    {type:"bgm", src:s_bgMusic},
    {type:"bgm", src:s_mainMainMusic},

    //effect
    {type:"effect", src:s_buttonEffect},
    {type:"effect", src:s_explodeEffect},
    {type:"effect", src:s_fireEffect},
    {type:"effect", src:s_shipDestroyEffect},

    // FNT
    {type:"fnt", src:s_arial14_fnt}

];
