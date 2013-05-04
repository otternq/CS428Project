/*  Boss Entity  */

define([
	'projectileentity',
	'explosionanimation'
],function(ProjectileEntity, ExplosionAnimation) {
	return me.ObjectEntity.extend({
		init: function(x, y, settings)
		{

			//var settings = {};
			if (settings.image === undefined) {
				settings.image = "boss";
			}

			if (settings.spritewidth === undefined) {
				settings.spritewidth = 600;
			}

			if (settings.spriteheight === undefined) {
				settings.spriteheight = 275;
			}

			if (settings.type === undefined) {
				settings.type = me.game.ENEMY_OBJECT;
			}


			settings.collidable = true;

			// call parent constructor
			this.parent(x, y, settings);

			this.addAnimation("fixed", [0], 1);
            this.setCurrentAnimation("fixed");

			this.time = 0;

			this.health = 100;
			this.damage = 50;

			this.points = 10;
			this.turret = 0;


			// init variables
			this.gravity = 0;

			// set the default horizontal speed (accel vector)
			this.setVelocity(0, 0);
		},

		fire: function() {
			// create a missile entity
			var xOffset;
			var yOffset;
			var type;

			if(this.turret % 5 == 0){
				xOffset = 160;
				yOffset = 10;
				type = "Enemy"
			}
			else if(this.turret % 5 == 1){
				xOffset = 320;
				yOffset = 10;
				type = "Enemy"
			}
			else if(this.turret % 5 == 2){
				xOffset = 480;
				yOffset = 10;
				type = "Enemy"
			}
			else if(this.turret % 5 == 3){
				xOffset = 90;
				yOffset = -100;
				type = "Boss"
			}
			else if(this.turret % 5 == 4){
				xOffset = 520;
				yOffset = -100;
				type = "Boss"
			}

			var missile = new ProjectileEntity(this.pos.x + xOffset, this.pos.y + this.height + yOffset, -3, type);
			this.turret++;

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

			// if the enemy object goes out from the screen,
			// remove it from the game manager
			if (this.pos.y > this.bottom)
				me.game.remove(this);

			if ( (this.time++) % 45 == 0) {
				this.fire();
			}

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
            me.audio.play("implosion");

            // init implosion
            /*
            var implosion = new ExplosionAnimation(this.pos.x, this.pos.y);
            me.game.add(implosion, 15);
            me.game.sort();
            */

            if (this.health === 0) {
                this.remove();
            }
		}
	});

});