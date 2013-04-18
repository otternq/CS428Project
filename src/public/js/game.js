define([
	'menuScreen',
	'briefingScreen',
	'playerScreen',
	'gameoverscreen',
	'gamefailscreen',
	'backgroundobject'
], function(MenuScreen, BriefingScreen, PlayScreen, GameOverScreen, GameFailScreen, BackgroundObject) {

	var game = {
		/* ---
		
			Initialize the jsApp
			
			---			*/
		onload: function(g_resources)
		{

			// init the video
			if (!me.video.init('jsapp', 640, 640))
			{
				alert("Sorry but your browser does not support html 5 canvas.");
				return 'no canvas support';
			}

			// initialize the "audio"
			//me.audio.init("mp3,ogg");

			// set all resources to be loaded
			me.loader.onload = this.loaded.bind(this);

			// set all resources to be loaded
			me.loader.preload(g_resources);

			// load everything & display a loading screen
			me.state.change(me.state.LOADING);

			me.leaderboard = new Clay.Leaderboard( { id: 1081 } );
			//me.leaderboard.show();

			return true;


		},
		/* ---
		
			callback when everything is loaded
			
			---										*/
		loaded: function ()
		{
			// Initialize game states
			me.state.set(me.state.BRIEFING, new BriefingScreen());
			me.state.set(me.state.MENU, new MenuScreen());			// set the "Menu" Screen Object
			me.state.set(me.state.PLAY, new PlayScreen());			// set the "Play" Screen Object
			//me.state.set(me.state.LEVELFAIL, new GameFailScreen());  // set the "Game over" Screen Object
			me.state.set(me.state.GAMEOVER, new GameOverScreen());  // set the "Game over" Screen Object

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

	return game;

});