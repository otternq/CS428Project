define(function(){
	return me.AnimationSheet.extend({
		init: function(x, y)
		{

			// call parent constructor
			var image = me.loader.getImage("explosion");
			this.parent(x, y, image, 45, 42);

			// add animation with all sprites
			this.addAnimation("explosion", null, .05);

			// set animation
			this.setCurrentAnimation("explosion", function() {
				me.game.remove(this);
				me.game.sort();
			});
		}
	});
});