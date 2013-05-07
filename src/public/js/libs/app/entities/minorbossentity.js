/*  Boss Entity  */

define([
	'projectileentity',
	'explosionanimation',
	'enemyentity',
	'advancedenemyentity',
	'bossexplosionanimation'
],function(ProjectileEntity, ExplosionAnimation, EnemyEntity, AdvancedEnemyEntity, BossExplosionAnimation) {
	return me.ObjectEntity.extend({
		init: function(x, y, settings)
		{

			//var settings = {};
			if (settings.image === undefined) {
				settings.image = "minorboss";
			}

			if (settings.spritewidth === undefined) {
				settings.spritewidth = 320;
			}

			if (settings.spriteheight === undefined) {
				settings.spriteheight = 150;
			}

			if (settings.type === undefined) {
				settings.type = me.game.ENEMY_OBJECT;
			}


			this.settingsCache = settings;
			settings.collidable = true;

			// call parent constructor
			this.parent(x, y, settings);

			this.addAnimation("fight", [0,1,2,3,4,5,6,7],1);//,8,9,10,11,12,13,14], 1);
			//this.addAnimation("explode", [15,16,17,18,19,20], 1);
			this.setAnimationFrame(0);
			this.animationpause = true;

			this.time = 0;

			this.health = 75;
			this.damage = 50;

			this.points = 30;
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

			if(this.turret % 6 == 0){
				xOffset = this.pos.x + 25;
				yOffset = 10;
				type = "Enemy"
			}
			else if(this.turret % 6 == 3){
				xOffset = this.pos.x + 300;
				yOffset = 10;
				type = "Enemy"
			}
			else if(this.turret % 6 == 4){
				xOffset =  this.pos.x + (Math.random() * 300);
				yOffset = 10;
				type = "Enemy"
			}
			else{
				xOffset = this.pos.x + 150;
				yOffset = 10;
				type = "Enemy"
			}
			
			
			var missile = new ProjectileEntity(xOffset, this.pos.y + this.height + yOffset, -3, type);
			this.turret++;
			
			me.game.add(missile, 10);
			me.game.sort();

			
		},

		update: function()
		{

			// call parent constructor
			this.parent(this);

			for ( var i = 0; i < 14; i++) {
				if (this.health > 100 - 14 * (i + 1)) {
					this.setAnimationFrame(i);
					this.animationpause = true;
					break;
				}
			}


			// calculate velocity
			this.vel.y += this.accel.y * me.timer.tick;

			// if the enemy object goes out from the screen,
			// remove it from the game manager
			if (this.pos.y > this.bottom)
				me.game.remove(this);

			if ( (this.time++) % 30 == 0) {
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

			//this.setCurrentAnimation("explode", function() {
				// remove this entity
				me.game.remove(this, true);
			//});

		},

		removeHealth: function(damage) {

			
			this.health -= damage;
			

            // play sound
            me.audio.play("implosion");

           if (this.health <= 0) {
           		var exp = new BossExplosionAnimation(this.pos.x, this.pos.y, 1);
				me.game.add(exp, 15);
				me.game.sort();
                this.remove();
            }
		}
	});

});