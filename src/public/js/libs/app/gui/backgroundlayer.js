define(function() {
	return me.ImageLayer.extend({
		/*
		 * constructor
		 */
		init: function(image, speed)
		{
			name = image;
			width = 640;
			height = 640;
			z = 1;
			ratio = 1;
			this.speed = speed;

			// call parent constructor
			this.parent(name, width, height, image, z, ratio);
		},

		/*
		 * update function
		 */
		update: function()
		{
			// recalibrate image position
			if (this.offset.x >= this.imagewidth)
				this.offset.x = 0;

			// increment horizontal background position
			this.offset.x += this.speed;

			return true;
		}
	});
});