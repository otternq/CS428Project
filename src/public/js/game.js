define([
	'menuScreen',
	'briefingScreen',
	'debriefingScreen',
	'playerScreen',
	'gameoverscreen',
	'gamefailscreen',
	'backgroundobject'
], function(MenuScreen, BriefingScreen, DebriefingScreen, PlayScreen, GameOverScreen, GameFailScreen, BackgroundObject) {

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

			me.gamestat.add("score" , 0);

			me.gamestat.add("mapIndex", "1");

			me.gamestat.add("briefing1", new Array("map1",
				"On a routine mission your ship is ambushed",
				"You must alert the fleet to the enemy threat",
				"Defeat all enemies"));
			me.gamestat.add("debriefing1", new Array(
				"You defeated the enemy units",
				"After the battle the wreckage was examined",
				"Vital information was gathered"));


			me.gamestat.add("briefing2", new Array("map2",
				"The enemy caught us be surprise",
				"You must fly through the asteroid belt",
				"To deliver the acquired battle data"));

			me.gamestat.add("debriefing2", new Array(
				"It was a close call,",
				"but your flying got you through the asteroid belt",
				"The data was successfully delivered"));


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

			var BRIEFING = me.state.USER + 0;
			var DEBRIEFING = me.state.USER +1;
			// Initialize game states
			me.state.set(100, new BriefingScreen());
			me.state.set(101, new DebriefingScreen());
			me.state.set(me.state.MENU, new MenuScreen());			// set the "Menu" Screen Object
			me.state.set(me.state.PLAY, new PlayScreen());			// set the "Play" Screen Object
			me.state.set(102, new GameFailScreen());  // set the "Game over" Screen Object
			me.state.set(me.state.GAMEOVER, new GameOverScreen());  // set the "Game over" Screen Object

			console.log("Briefing: " + me.state.BRIEFING);
			console.log("Debriefing: " + me.state.DEBRIEFING);

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