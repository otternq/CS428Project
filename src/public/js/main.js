/*!
 * 
 *   melonJS
 *   http://www.melonjs.org
 *		
 *   Step by step game creation tutorial
 *
 **/

function log(message){
if(typeof console == "object"){
console.log(message);
}
}

// game resources
var g_resources = [
{name: "bkg0", type: "image", src: "data/sprite/bkg0.png"},
{name: "bkg1", type: "image", src: "data/sprite/bkg2.png"},
{name: "map1", type: "tmx", src: "data/map1.tmx"},
{name: "ship", type:"image", src: "data/sprite/ship2.png"},
{name: "enemy", type:"image", src: "data/sprite/enemy.png"},
{name: "missile", type:"image", src: "data/sprite/missile.png"},
{name: "enemyMissile", type:"image", src: "data/sprite/enemyMissile.png"},
{name: "implosion", type:"image", src: "data/sprite/implosion.png"},
{name: "explosion", type:"image", src: "data/sprite/explosion.png", channel: 1},
{name: "life0", type:"image", src: "data/sprite/life20.png"},
	{name: "life1", type:"image", src: "data/sprite/life21.png"},
	{name: "life2", type:"image", src: "data/sprite/life22.png"},
	{name: "life3", type:"image", src: "data/sprite/life23.png"},

//interface resources
{name: "title", type:"image", src: "data/sprite/title.png"},
{name: "play", type:"image", src: "data/sprite/play.png"},
{name: "play_hover", type:"image", src: "data/sprite/play_hover.png"},
{name: "restart", type:"image", src: "data/sprite/restart.png"},
{name: "restart_hover", type:"image", src: "data/sprite/restart_hover.png"},
{name: "menu", type:"image", src: "data/sprite/menu.png"},
{name: "menu_hover", type:"image", src: "data/sprite/menu_hover.png"},

// audio resources
{name: "missile", type:"audio", src: "data/sound/", channel: 1},
{name: "implosion", type:"audio", src: "data/sound/", channel: 1},

];



var jsApp	= 
{	
	/* ---
	
		Initialize the jsApp
		
		---			*/
	onload: function()
	{
		
		// init the video
		if (!me.video.init('jsapp', 640, 640))
		{
			alert("Sorry but your browser does not support html 5 canvas.");
         return;
		}
				
		// initialize the "audio"
		me.audio.init("mp3,ogg");
		
		// set all resources to be loaded
		me.loader.onload = this.loaded.bind(this);
		
		// set all resources to be loaded
		me.loader.preload(g_resources);

		// load everything & display a loading screen
		me.state.change(me.state.LOADING);

		

		
	},
	/* ---
	
		callback when everything is loaded
		
		---										*/
	loaded: function ()
	{
		// Initialize game states
		me.state.set(me.state.MENU, new MenuScreen());     		// set the "Menu" Screen Object
		me.state.set(me.state.PLAY, new PlayScreen());    		// set the "Play" Screen Object
		me.state.set(me.state.GAMEOVER, new GameOverScreen());   // set the "Game over" Screen Object

		// enable the keyboard
		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP, "up");
		me.input.bindKey(me.input.KEY.DOWN, "down");
		me.input.bindKey(me.input.KEY.SPACE, "fire", true);

		// draw menu
		me.state.change(me.state.MENU);

	}

}; // jsApp

//bootstrap :)
window.onReady(function() 
{
	jsApp.onload();
});
