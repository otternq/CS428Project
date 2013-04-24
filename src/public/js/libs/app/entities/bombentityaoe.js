define([
	'bombexplosionanimation'
],function(BombExplosionAnimation) {
	return me.ObjectEntity.extend({
		init: function(x, y,from)
		{
			this.time = 0;
			this.type = 3;

			this.collidable = true;

			this.shotFrom = from;
			if(from == "Player") {
				this.parent(x, y, {image: "bombaoe"});
				this.target = me.game.ENEMY_OBJECT;
			} 

			this.setVelocity(0, 0);  // set the default vertical speed (accel vector)
		},

		update: function()
		{
		//determines how long the projectile stays active in the screen
			
			if(this.time == 1)
				this.remove();

		//check for positive or negative velocity and adjust the position accordingly
			if(this.accel.y < 0){  //enemy projectiles have negative velocity
				this.vel.y += this.accel.y * me.timer.tick;
			} else {
				this.vel.y -= this.accel.y * me.timer.tick;
			}

		// if the missile object goes out from the screen,
		// remove it from the game manager
			if (!this.visible) {
				me.game.remove(this);
			}

			this.checkCollision();

		// check & update missile movement
			this.computeVelocity(this.vel);
			this.pos.add(this.vel);

			this.time++;

			return true;
		},

		checkCollision: function() {
			var res = this.collideType(this.target);
			if (res) {
				res.obj.removeHealth();
				//me.game.remove(this);
				this.remove();
			}
		},

		remove: function()
		{
			// play sound
			//me.audio.play("implosion");

			// init implosion
			var bombExplosion = new BombExplosionAnimation(this.pos.x, this.pos.y);
			me.game.add(bombExplosion, 15);
			me.game.sort();

			// remove this entity
			me.game.remove(this, true);
		},
	});
});