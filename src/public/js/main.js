/*!
 * 
 *   melonJS
 *   http://www.melonjs.org
 *		
 *   Step by step game creation tutorial
 *
 **/

// game resources
var g_resources = [{
    name: "tileset",
    type: "image",
    src: "data/map1_tileset/tileset.png"
},
{name: "bkg0", type: "image", src: "data/sprite/bkg0.png"},
{name: "bkg1", type: "image", src: "data/sprite/bkg1.png"},
{name: "map1", type: "tmx", src: "data/map1.tmx"},
{name: "ship", type:"image", src: "data/sprite/ship.png"},
// audio resources
{
    name: "jump",
    type: "audio",
    src: "data/audio/",
    channel: 2
}, {
    name: "stomp",
    type: "audio",
    src: "data/audio/",
    channel: 1
}];



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
		this.mapScrollRate = 2;
		this.posVector =  new me.Vector2d(0,0);
		
	},

   onResetEvent: function()
	{	
      // stuff to reset on state change
      
      //load a level
      	me.levelDirector.loadLevel("map1");

		me.game.viewport.follow(this.posVector, me.game.viewport.AXIS.VERTICAL);

      // add main player
		var ship = new PlayerEntity(100, 265, this.mapScrollRate);
		me.game.add(ship, 10);
      
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
