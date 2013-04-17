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
			this.play = null;
			this.version = null;

			console.log("Initialized Menu");

			this.font = null;
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
			this.play = new Button("play", null, 280);
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

			console.log("Drawing Menu");
		},

		/*
		 * destroy event function
		 */
		onDestroyEvent: function()
		{

			console.log("foo");

			// release mouse event
			me.input.releaseMouseEvent("mousedown",
				me.state.change(
					me.state.BriefingScreen,
					"map1",
					"On a routine mission your ship is ambushed",
					"You must alert the fleet to the enemy threat",
					"Defeat all enemies"
				)
			);
		}
	});
});