define(function() {
	return me.ObjectEntity.extend({
		init: function(x, y,vel,from)
		{
			this.time = 0;
			this.type = "Projectile";

			this.shotFrom = from;
			if(from == "Player")
				this.parent(x, y, {image: "missile"});
			else
				this.parent(x,y, {image: "enemyMissile"});

			this.setVelocity(0, vel);  // set the default vertical speed (accel vector)
		},

		update: function()
		{
		//determines how long the projectile stays active in the screen
			this.time++;
			if(this.time == 60)
				me.game.remove(this);

		//check for positive or negative velocity and adjust the position accordingly
			if(this.accel.y < 0)  //enemy projectiles have negative velocity
				this.vel.y += this.accel.y * me.timer.tick;
			else
				this.vel.y -= this.accel.y * me.timer.tick;

		// if the missile object goes out from the screen,
		// remove it from the game manager
			if (!this.visible)
				me.game.remove(this);

		// check & update missile movement
			this.computeVelocity(this.vel);
			this.pos.add(this.vel);

		// collision detection
			var res = me.game.collide(this);
			if(this.shotFrom == "Player"){
				if (res && res.obj.type == me.game.ENEMY_OBJECT)  //if projectile collides with an enemy
				{
					// remove enemy
					res.obj.remove();
					// remove missile
					me.game.remove(this);

					// update score
					me.game.HUD.updateItemValue("score", 10);
				}
			}

			return true;
		}
	});
});