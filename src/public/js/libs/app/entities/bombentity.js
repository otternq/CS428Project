/** 

	BombEntity

**/
define([
	'bombentityaoe',
	'explosionanimation'
],
	function(BombEntityAOE,ExplosionAnimation) {
	return me.ObjectEntity.extend({
		init: function(x, y,vel,from)
		{
			this.time = 0;
			this.type = 3;

			this.collidable = true;

			this.shotFrom = from;
			if(from == "Player") {
				this.parent(x, y, {image: "bomb"});
				this.target = me.game.ENEMY_OBJECT;
			}

			this.damage = 3;

			this.setVelocity(0, vel);  // set the default vertical speed (accel vector)
		},

		update: function()
		{
		//determines how long the projectile stays active in the screen
			this.time++;
			if(this.time == 50)
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

			return true;
		},

		checkCollision: function() {
			/*
			var res = this.collideType(this.target);
			if (res) {
				res.obj.removeHealth();
				this.remove();
			}*/


			var res = this.collideType(this.target);
			if (res) {

				console.log("collided with target");
				res.obj.removeHealth(this.damage);
				this.remove();

			}
		},

		remove: function(){
			console.log("bomb being removed");

			me.game.remove(this, true);

			var bombAOE = new BombEntityAOE(this.pos.x -50, this.pos.y - 128 + 16, "Player");
			me.game.add(bombAOE, this.z);
			me.game.sort();

			
		}
	});
});