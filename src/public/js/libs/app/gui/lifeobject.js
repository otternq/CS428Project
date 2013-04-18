define(function() {
	return me.HUD_Item.extend({
		/*
		 * constructor
		 */
		init: function(lives)
		{
			// call the parent constructor
			this.parent(me.video.getWidth() - 145, 5, lives);

			// create image
			this.image = me.loader.getImage("life" + lives);
		},

		/*
		 * decrease life count
		 */
		update: function(value)
		{
			this.value += value;

			// updating life count
			this.image = me.loader.getImage("life" + this.value);
			return true;
		},

		/*
		 * drawing function
		 */
		draw: function(context, x, y)
		{
			// draw life indicator
			context.drawImage(this.image, this.pos.x + x, this.pos.y + y);
		}
	});
});