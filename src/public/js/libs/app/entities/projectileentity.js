define(['explosionanimation'],
	function(ExplosionAnimation) {
	return me.ObjectEntity.extend({
		init: function(x, y,vel,from)
		{
			this.time = 0;
			this.lifespan = 0;
			this.type = 3;

			this.collidable = true;

			this.shotFrom = from;
			if(from == "Player") {
				this.parent(x, y, {image: "missile"});
				this.target = me.game.ENEMY_OBJECT;
				this.lifespan == 80;
				this.damage = 1;
			} 
			else if(from=="Boss"){
				this.parent(x,y, {image: "bigBossMissile"});
				this.target = "Player";
				this.lifespan == 100;
				this.damage = 5;
			}
			else if(from=="AdvancedEnemy"){
				this.parent(x,y, {image: "enemyMissile"});
				this.target = "Player";
				this.lifespan == 800;
				this.damage = 2;
			}
			else {
				this.parent(x,y, {image: "enemyMissile"});
				this.target = "Player";
				this.lifespan == 60;
				this.damage = 1;
			}

			

			this.setVelocity(0, vel);  // set the default vertical speed (accel vector)
		},

		update: function()
		{
		//determines how long the projectile stays active in the screen
			this.time++;
			if(this.time == this.lifespan)
				me.game.remove(this);

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

		damage: function() {
			return this.damage;
		},

		checkCollision: function() {
			var res = this.collideType(this.target);
			if (res) {
				var implosion = new ExplosionAnimation(this.pos.x, this.pos.y);
            	me.game.add(implosion, 15);
            	me.game.sort();

				res.obj.removeHealth(this.damage);
				me.game.remove(this);
			}
		}
	});
});