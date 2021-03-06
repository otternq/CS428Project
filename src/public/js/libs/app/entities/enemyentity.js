define([
	'projectileentity',
	'explosionanimation'
],function(ProjectileEntity, ExplosionAnimation) {
	return me.ObjectEntity.extend({
		init: function(x, y, settings)
		{
			if(settings == null)
				settings = {};
			if (settings.image === undefined) {
				settings.image = "enemy";
			}

			if (settings.spritewidth === undefined) {
				settings.spritewidth = 36;
			}

			if (settings.spriteheight === undefined) {
				settings.spriteheight = 36;
			}

			if (settings.type === undefined) {
				settings.type = me.game.ENEMY_OBJECT;
			}


			settings.collidable = true;

			// call parent constructor
			this.parent(x, y, settings);

			this.time = 0;
			this.lifespan = 0;

			this.startCounter = false;

			this.health = 1;
			this.damage = 1;

			this.points = 10;

			// add animation with all sprites
			this.addAnimation("flying", null, 0.2);
			this.setCurrentAnimation("flying");

			// init variables
			this.gravity = 0;

			// set the default horizontal speed (accel vector)
			this.setVelocity(0, 1);
		},

		fire: function() {
			// create a missile entity
			var missile = new ProjectileEntity(this.pos.x + 15, this.pos.y + this.height + 10, -3,"Enemy");
			me.game.add(missile, 10);
			me.game.sort();
		},

		update: function()
		{

			// call parent constructor
			this.parent(this);

			/*if (me.game.viewport.top == 0 || me.game.viewport.bottom == me.game.currentLevel.realheight)
				this.setVelocity(0, 2);
			else
				this.setVelocity(0,6);*/


			// calculate velocity
			this.vel.y += this.accel.y * me.timer.tick;

			if(this.inViewport === true){
				this.startCounter = true;
				if ( (this.time) % 90 == 0) {
					this.fire();
				}
			}

			this.time++;

			if(this.startCounter === true)
				this.lifespan++;

			
			if(this.lifespan == 400 )
				me.game.remove(this);

			

			// check & update missile movement
			this.computeVelocity(this.vel);
			this.pos.add(this.vel);

			return true;
		},

		remove: function()
		{
			me.game.HUD.updateItemValue("score", this.points);
			var curScore = me.gamestat.getItemValue("score");
			me.gamestat.setValue("score", curScore+this.points);

			// remove this entity
			me.game.remove(this, true);
		},

		removeHealth: function(damage) {

			this.health -= damage;

            // play sound
            //me.audio.play("implosion");

            /*
            // init implosion
            var implosion = new ExplosionAnimation(this.pos.x, this.pos.y);
            me.game.add(implosion, 15);
            me.game.sort();
            */

            if (this.health <= 0) {
                this.remove();
            }
		}
	});

});