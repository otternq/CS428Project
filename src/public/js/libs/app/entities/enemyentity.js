define([
	'projectileentity',
	'explosionanimation'
],function(ProjectileEntity, ExplosionAnimation) {
	return me.ObjectEntity.extend({
		init: function(x, y)
		{
			// enemy entity settings
			var settings = {};
			settings.image = "enemy";
			settings.spritewidth = 42;
			settings.spriteheight = 42;
			settings.type = me.game.ENEMY_OBJECT;
			this.time = 0;

			// call parent constructor
			this.parent(x, y, settings);

			// add animation with all sprites
			this.addAnimation("flying", null, 0.2);
			this.setCurrentAnimation("flying");

			// init variables
			this.gravity = 0;

			// set the default horizontal speed (accel vector)
			this.setVelocity(0, 0);

			// enable collision
			this.collidable = true;
		},

		update: function()
		{

			// call parent constructor
			this.parent(this);

			if (me.game.viewport.top == 0 || me.game.viewport.bottom == me.game.currentLevel.realheight)
				this.setVelocity(0, 2);
			else
				this.setVelocity(0,0);


			// calculate velocity
			this.vel.y += this.accel.y * me.timer.tick;

			// if the enemy object goes out from the screen,
			// remove it from the game manager
			if (this.pos.y > this.bottom)
				me.game.remove(this);

			if ( (this.time++) % 90 == 0) {
			// create a missile entity
				var missile = new ProjectileEntity(this.pos.x + 15, this.pos.y + this.height + 10, -3,"Enemy");
				me.game.add(missile, 10);
				me.game.sort();
			}

			// check & update missile movement
			this.computeVelocity(this.vel);
			this.pos.add(this.vel);

			return true;
		},

		remove: function()
		{
			// remove this entity
			me.game.remove(this, true);

			// play sound
			//me.audio.play("implosion");

			// init implosion
			var implosion = new ExplosionAnimation(this.pos.x, this.pos.y);
			me.game.add(implosion, 15);
			me.game.sort();
		}
	});

});