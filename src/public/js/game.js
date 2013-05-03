define([
	'menuScreen',
	'briefingScreen',
	'debriefingScreen',
	'playerScreen',
	'gameoverscreen',
	'gamefailscreen',
	'backgroundobject',
	'asteroidentity',
	'mineentity',
	'enemyentity',
	'advancedenemyentity',
	'text!/data/levels.json'
], function(MenuScreen, BriefingScreen, DebriefingScreen, PlayScreen, GameOverScreen, GameFailScreen, BackgroundObject, AsteroidEntity, MineEntity, EnemyEntity, AdvancedEnemyEntity, LevelData) {

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
			me.audio.init("mp3,ogg");

			me.gamestat.add("score" , 0);


			var levels = JSON.parse(LevelData);

			me.gamestat.add("levelCount", levels.length);

			me.gamestat.add("bombAtLevel", 3);
			me.gamestat.add("dLaserAtLevel", 2);

			me.gamestat.add("hasBomb", false);
			me.gamestat.add("hasDouble", false);

			for (var i = 0; i < levels.length; i++) {
				me.gamestat.add("briefing" + levels[i].id, new Array(
					levels[i].resource.name,
					levels[i].briefing[0],
					levels[i].briefing[1],
					levels[i].briefing[2]
				));

				me.gamestat.add("debriefing" + levels[i].id, new Array(
					levels[i].debriefing[0],
					levels[i].debriefing[1],
					levels[i].debriefing[2],
					levels[i].debriefing[3]
				));
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

			//true is basically saying there will be more than one
			me.entityPool.add("AsteroidEntity", AsteroidEntity, true);
			me.entityPool.add("MineEntity", MineEntity, true);
			me.entityPool.add("EnemyEntity", EnemyEntity, true);
			me.entityPool.add("AdvancedEnemyEntity", AdvancedEnemyEntity, true);

			// enable the keyboard
			me.input.bindKey(me.input.KEY.LEFT, "left");
			me.input.bindKey(me.input.KEY.RIGHT, "right");
			me.input.bindKey(me.input.KEY.UP, "up");
			me.input.bindKey(me.input.KEY.DOWN, "down");
			me.input.bindKey(me.input.KEY.SPACE, "space", true);
			me.input.bindKey(me.input.KEY.ENTER, "enter", true);

			me.input.bindKey(me.input.KEY.S, "s", true);
			me.input.bindKey(me.input.KEY.B, "b", true);
			me.input.bindKey(me.input.KEY.L, "l", true);

			// draw menu
			me.state.change(me.state.MENU);

		}

	}; // jsApp

	return game;

});