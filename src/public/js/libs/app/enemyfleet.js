define([
	'enemyentity'
], function(EnemyEntity) {
	return Object.extend({
		init: function(num)
		{
			// init variables
			this.fps = 0;
			this.maxSize = num;
			this.generated = 0;
			this.maxX = (me.video.getWidth() / 10) - 5;
		},

		update: function()
		{
			
			
			if ( this.fps++ % 30 == 0 && this.generated < this.maxSize)
			{
				var y = me.game.viewport.top + 10;
				var x = Number.prototype.random(0, this.maxX) * 10;

				// add an enemy
				me.game.add(new EnemyEntity(x, y), 10);
				me.game.sort();

				this.generated += 1;
			}

			return true;
		}
	});
});