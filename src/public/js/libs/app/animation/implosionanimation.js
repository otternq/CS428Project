define(function() {
	return me.AnimationSheet.extend({
		init: function(x, y)
		{
			log("imploding");
			// call parent constructor
			var image = me.loader.getImage("implosion");
			this.parent(x, y, image, 45, 42);

			// add animation with all sprites
			this.addAnimation("implosion", null, .05);

			// set animation
			this.setCurrentAnimation("implosion", function() {
				me.game.remove(this);
				me.game.sort();
			});
		}
	});
});