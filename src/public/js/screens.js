/*  Game Screens */


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
      	
      	this.posVector =  new me.Vector2d(0, me.game.currentLevel.realheight-302);
		me.game.viewport.follow(this.posVector, me.game.viewport.AXIS.VERTICAL);

      // add main player
		var ship = new UserControlledEntity(302, 0, this.mapScrollRate);
		me.game.add(ship, 10);

		// add enemy fleet
		me.game.add(new EnemyFleet(10), 10);

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


var TitleScreen = me.ScreenObject.extend(
{
	init : function()
	{
		this.parent(true);
		
		// title screen image
		this.title         = null;
		
		this.font          =  null;
		this.scrollerfont  =  null;
		this.scrollertween = null;
		
		this.scroller = "A SMALL STEP BY STEP TUTORIAL FOR GAME CREATION WITH MELONJS       ";
		this.scrollerpos = 600;
	},
	/* ---
		reset function
	   ----*/
	
	onResetEvent : function()
	{
		if (this.title == null)
		{
			// init stuff if not yet done
			this.title = me.loader.getImage("title_screen");
			// font to display the menu items
			this.font = new me.BitmapFont("32x32_font", 32);
			this.font.set("left");
			
			// set the scroller
			this.scrollerfont = new me.BitmapFont("32x32_font", 32);
			this.scrollerfont.set("left");
						
		}
      
		// reset to default value
		this.scrollerpos = 640;
		
		// a tween to animate the arrow
		this.scrollertween = new me.Tween(this).to({scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
		
		// enable the keyboard
		//me.input.bindKey(me.input.KEY.ENTER, "enter", true);
      
		// play something
		me.audio.play("cling");
		
	},
	
	
	// some callback for the tween objects
	scrollover : function()
	{
		// reset to default value
		this.scrollerpos = 640;
		this.scrollertween.to({scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
	},
		
	/*---
		
		update function
		 ---*/
		
	update : function()
	{
		// enter pressed ?
		/*if (me.input.isKeyPressed('enter'))
		{
			me.state.change(me.state.PLAY);
		}*/
		me.state.change(me.state.PLAY);
		return true;
	},

	
	/*---
	
		the manu drawing function
	  ---*/
	
	draw : function(context)
	{
		context.drawImage(this.title, 0,0);
		
		this.font.draw (context, "PRESS ENTER TO PLAY",	 20, 240);
		this.scrollerfont.draw(context, this.scroller, this.scrollerpos, 440);
	},
	
	/*---
	
		the manu drawing function
	  ---*/
	
	onDestroyEvent : function()
	{
		me.input.unbindKey(me.input.KEY.ENTER);
		
		//just in case
		this.scrollertween.stop();
   },

});

/* 
 * game over screen
 */
var GameOverScreen = me.ScreenObject.extend(
{
	/*
	 * constructor
	 */
	init: function()
	{
		// call parent constructor
		this.parent(true, true);

		// init stuff
		this.end = null;
		this.score = null;
		this.restart = null;
		this.menu = null;
		this.finalScore = null;
	},

	/*
	 * reset function
	 */
	onResetEvent: function(score)
	{
		this.finalScore = score;

		// add parallax background
		me.game.add(new BackgroundObject(), 1);

		// labels
		this.end = new me.Font("Verdana", 25, "white");
		this.score = new me.Font("Verdana", 22, "white");

		// buttons
		this.restart = new Button("restart", me.state.PLAY, 280);
		this.menu = new Button("menu", me.state.MENU, 330);
	},

	/*
	 * drawing function
	 */
	draw: function(context)
	{
		// draw buttons
		this.restart.draw(context);
		this.menu.draw(context);

		// draw end label
		var endText = "Level completed !";
		var endSize = this.end.measureText(context, endText);

		this.end.draw(context, endText, me.video.getWidth() / 2 - endSize.width / 2, 120);

		// draw score label
		var scoreText = "Score : " + this.finalScore;
		var scoreSize = this.score.measureText(context, scoreText);

		this.score.draw(context, scoreText, me.video.getWidth() / 2 - scoreSize.width / 2, 150);
	},

	/*
	 * destroy event function
	 */
	onDestroyEvent: function()
	{
		// release mouse event
		me.input.releaseMouseEvent("mousedown", this.restart);
		me.input.releaseMouseEvent("mousedown", this.menu);
	}
});


/*
 * menu screen
 */
var MenuScreen = me.ScreenObject.extend(
{
	/*
	 * constructor
	 */
	init: function()
	{
		// call parent constructor
		this.parent(true, true);

		// init stuff
		this.title = null;
		this.play = null;
		this.version = null;
	},

	/*
	 * reset function
	 */
	onResetEvent: function()
	{
		// add parallax background
		me.game.add(new BackgroundObject(), 1);

		// load title image
		this.title = me.loader.getImage("title");

		// play button
		this.play = new Button("play", me.state.PLAY, 280);

		// version
		this.version = new me.Font("Verdana", 20, "white");
	},

	/*
	 * drawing function
	 */
	draw: function(context)
	{
		// draw title
		context.drawImage(this.title, (me.video.getWidth() / 2 - this.title.width / 2), 100);

		// draw play button
		this.play.draw(context);

		// game version
		var versionText = "0.3";
		var versionSize = this.version.measureText(context, versionText);

		this.version.draw(context, versionText,
			me.video.getWidth() - versionSize.width - 3, me.video.getHeight() - 5);
	},

	/*
	 * destroy event function
	 */
	onDestroyEvent: function()
	{
		// release mouse event
		me.input.releaseMouseEvent("mousedown", this.play);
	}
});

