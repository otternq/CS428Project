define([
	'backgroundobject',
	'button'
], function(BackgroundObject, Button) {
	return me.ScreenObject.extend({
		/*
		 * constructor
		 */
		init: function(score)
		{
			// call parent constructor
			this.parent(true, true);

			// init stuff
			this.end = null;
			this.score = null;
			this.restart = null;
			this.menu = null;
			this.finalScore = null;

			this.leaderboardReported = false;

			console.log("Initialized GameOver Screen");
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

			if (this.leaderboardReported === false) {

				me.leaderboard.post( { score: score }, function( response ) {
					// Callback
					console.log( response );
					me.leaderboard.show();
				} );

				this.leaderboardReported = true;
			}


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
			var endText = "Level Completed!";
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
});