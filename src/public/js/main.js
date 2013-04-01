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
{name: "implosion", type:"image", src: "data/sprite/implosion.png"},
{name: "explosion", type:"image", src: "data/sprite/explosion.png", channel: 1},
{name: "life0", type:"image", src: "data/sprite/life20.png"},
	{name: "life1", type:"image", src: "data/sprite/life21.png"},
	{name: "life2", type:"image", src: "data/sprite/life22.png"},
	{name: "life3", type:"image", src: "data/sprite/life23.png"},
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
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.PLAY, new PlayScreen());

		
      
      // start the game 
		me.state.change(me.state.PLAY);

		// enable the keyboard
		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP, "up");
		me.input.bindKey(me.input.KEY.DOWN, "down");
		me.input.bindKey(me.input.KEY.SPACE, "fire", true);

	}

}; // jsApp

/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend(
{

	init: function(){
		this.parent(true);
		this.mapScrollRate = -2;	

			
	},

   onResetEvent: function()
	{	
      // stuff to reset on state change

		// add a default HUD
		me.game.addHUD(0, 0, me.video.getWidth(), 45);

		// add a new HUD item
		me.game.HUD.addItem("life", new LifeObject(3));

		// add a new HUD item
		me.game.HUD.addItem("score", new ScoreObject());
      
      //load a level
      	me.levelDirector.loadLevel("map1");
      	log(me.game.currentLevel.realheight);
      	this.posVector =  new me.Vector2d(0, me.game.currentLevel.realheight-302);
		me.game.viewport.follow(this.posVector, me.game.viewport.AXIS.VERTICAL);

      // add main player
		var ship = new UserControlledEntity(302, 0, this.mapScrollRate);
		me.game.add(ship, 10);

		// add enemy fleet
		me.game.add(new EnemyFleet(50), 10);

		// make sure everything is in the right order
		me.game.sort();

      
	},
	update: function(){
		this.posVector.y += this.mapScrollRate;
		
	},
	onDestroyEvent: function()
	{
	
   }

});


//bootstrap :)
window.onReady(function() 
{
	jsApp.onload();
});
