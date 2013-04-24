define(function(){
	return me.AnimationSheet.extend({
		init: function(x, y)
		{

			// call parent constructor
			var image = me.loader.getImage("bombexplosionanimation");
			this.parent(x, y, image, 160, 160);

			// add animation with all sprites
			this.addAnimation("bombexplosionanimation", null, 0.05);

			// set animation
			var result = this.setCurrentAnimation("bombexplosionanimation", function() {
				me.game.remove(this);
				me.game.sort();
			});

			//alert(result);
		}
	});
});