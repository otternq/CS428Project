define(function() {
	return me.Rect.extend({
		/*
		 * constructor
		 */
		init: function(image, action, y)
		{
			// init stuff
			this.image = me.loader.getImage(image);
			this.image_hover = me.loader.getImage(image + "_hover");
			this.action = action;
			this.pos = new me.Vector2d((me.video.getWidth() / 2 - this.image.width / 2), y);

			// call parent constructor
			this.parent(this.pos, this.image.width, this.image.height);

			// register mouse event
			me.input.registerMouseEvent("mousedown", this, this.clicked.bind(this));
		},

		/*
		 * action to perform when a button is clicked
		 */
		clicked: function()
		{
			if(this.action != (me.state.USER +1))
				me.state.change(this.action);
		},

		/*
		 * drawing function
		 */
		draw: function(context)
		{
			// on button hovered
			if (this.containsPoint(me.input.mouse.pos))
				context.drawImage(this.image_hover, this.pos.x, this.pos.y);
			else
				context.drawImage(this.image, this.pos.x, this.pos.y);
		},

		/*
		 * destroy event function
		 */
		onDestroyEvent: function()
		{
			// release mouse events
			me.input.releaseMouseEvent("mousedown", this);
		}
	});
});