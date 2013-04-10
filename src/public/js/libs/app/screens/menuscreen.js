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
});