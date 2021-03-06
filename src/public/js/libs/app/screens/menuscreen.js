define([
	'backgroundobject',
	'button'
], function(BackgroundObject, Button) {
	return me.ScreenObject.extend({
		/*
		 * constructor
		 */
		init: function()
		{
			// call parent constructor
			this.parent(true, true);

			// init stuff
			this.title = null;
			//this.play = null;
			this.version = null;

			console.log("Initialized Menu");

			this.font = null;
			this.textFont = null;

		},

		/*
		 * reset function
		 */
		onResetEvent: function()
		{

			me.gamestat.setValue("score", 0);

			me.gamestat.add("mapIndex", "1");

			// add parallax background
			me.game.add(new BackgroundObject(), 1);

			// load title image
			this.title = me.loader.getImage("title");

			this.textFont = new me.Font("Verdana", 22, "white","left");

		},

		update: function() {
			/*
			//console.log("mapIndex: " + me.gamestat.getItemValue("mapIndex"));
			var mapIndex = String(me.gamestat.getItemValue("mapIndex"));

			if(me.input.isKeyPressed('enter')) {
				me.state.change(
					100,
					me.gamestat.getItemValue("briefing"+ mapIndex)[0],
					me.gamestat.getItemValue("briefing"+ mapIndex)[1],
					me.gamestat.getItemValue("briefing"+ mapIndex)[2],
					me.gamestat.getItemValue("briefing"+ mapIndex)[3]
				);
			} else if (me.input.isKeyPressed('l')) {
				me.leaderboard.show();
			} else if (me.input.isKeyPressed('s')) {
				Clay.Player.login(
					function( response ) {},
					false
				);
			}
			*/

			if(me.input.isKeyPressed('enter')) {
				console.log("enter pressed in menu screen");
				me.state.change(103);
			} else if (me.input.isKeyPressed('l')) {
				me.leaderboard.show();
			} else if (me.input.isKeyPressed('s')) {
				Clay.Player.login(
					function( response ) {},
					false
				);
			}


		},

		/*
		 * drawing function
		 */
		draw: function(context)
		{

			var instruction1 = "Press 'Enter' To Start";
			var instruction2 = "Press 'S' to Sign in";
			var instruction3 = "Press 'L' to Show leaderboard";
            
            this.i1 = this.textFont.measureText(context,instruction1 ).width;
            
            this.textFont.draw (context, instruction1,     Math.round(me.game.viewport.width/2 - this.i1/2), 375);
            this.textFont.draw (context, instruction2,     Math.round(me.game.viewport.width/2 - this.i1/2), 425);
            this.textFont.draw (context, instruction3,     Math.round(me.game.viewport.width/2 - this.i1/2), 475);


			// draw title
			context.drawImage(this.title, (me.video.getWidth() / 2 - this.title.width / 2), 100);


			console.log("Drawing Menu");
		},

		/*
		 * destroy event function
		 */
		onDestroyEvent: function()
		{
/*
			//console.log("mapIndex: " + me.gamestat.getItemValue("mapIndex"));
			var mapIndex = String(me.gamestat.getItemValue("mapIndex"));
			//console.log("mapIndex: " + mapIndex);

			console.log("changing state from menu");

			// release mouse event
			me.input.releaseMouseEvent("mousedown",


				me.state.change(
					100,
					me.gamestat.getItemValue("briefing"+ mapIndex)[0],
					me.gamestat.getItemValue("briefing"+ mapIndex)[1],
					me.gamestat.getItemValue("briefing"+ mapIndex)[2],
					me.gamestat.getItemValue("briefing"+ mapIndex)[3]
				)

			);*/
		}
	});
});