//image
var s_bg01 = "Resources/bg01.jpg";
var s_loading = "Resources/loading.png";
var s_ship01 = "Resources/ship01.png";
var s_menu = "Resources/menu.png";
var s_logo = "Resources/logo.png";
var s_cocos2dhtml5 = "Resources/cocos2d-html5.png";
var s_gameOver = "Resources/gameOver.png";
var s_menuTitle = "Resources/menuTitle.png";
var s_Enemy = "Resources/Enemy.png";
var s_flare = "Resources/flare.jpg";
var s_bullet = "Resources/bullet.png";
var s_explosion = "Resources/explosion.png";
var s_explode1 = "Resources/explode1.jpg";
var s_explode2= "Resources/explode2.jpg";
var s_explode3 = "Resources/explode3.jpg";
var s_hit = "Resources/hit.jpg";

//music
var s_bgMusic = "Resources/Music/bgMusic";
var s_mainMainMusic = "Resources/Music/mainMainMusic";

//effect
var s_buttonEffect = "Resources/Music/buttonEffet";
var s_explodeEffect = "Resources/Music/explodeEffect";
var s_fireEffect = "Resources/Music/fireEffect";
var s_shipDestroyEffect = "Resources/Music/shipDestroyEffect";

//tmx
var s_level01 = "Resources/level01.tmx";

//plist
var s_Enemy_plist = "Resources/Enemy.plist";
var s_explosion_plist = "Resources/explosion.plist";
var s_bullet_plist = "Resources/bullet.plist";

var g_ressources = [
    //image
    {type:"image", src:s_bg01},
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
    {type:"effect", src:s_shipDestroyEffect}
];
