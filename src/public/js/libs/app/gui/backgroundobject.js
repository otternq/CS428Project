define([
	'backgroundlayer'
],function(BackgroundLayer) {
	return Object.extend({
		/*
		 * constructor
		 */
		init: function()
		{
			me.game.add(new BackgroundLayer("bkg0", 0), 1); // layer 1
			me.game.add(new BackgroundLayer("bkg1", 0), 2); // layer 2
			me.game.sort();
		},

		/*
		 * update function
		 */
		update: function()
		{
			return true;
		}
	});
});