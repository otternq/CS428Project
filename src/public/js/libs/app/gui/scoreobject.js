define(function() {
	return me.HUD_Item.extend({
		/*
		 * constructor
		 */
		init: function()
		{
			// call the parent constructor
			this.parent(5, 0);

			// create a font
			this.score = new me.Font("Verdana", 20, "white");
		},

		/*
		 * draw score
		 */
		draw: function(context, x, y)
		{
			//var scoreText = "Score : " + this.value;
			var scoreText = "Score : " + me.gamestat.getItemValue("score");
			var scoreSize = this.score.measureText(context, scoreText);

			this.score.draw(context, scoreText, this.pos.x, scoreSize.height);
		}
	});
});