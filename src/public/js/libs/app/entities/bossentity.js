/*  Boss Entity  */

define([
	'projectileentity',
	'explosionanimation',
	'enemyentity',
	'advancedenemyentity'
],function(ProjectileEntity, ExplosionAnimation, EnemyEntity, AdvancedEnemyEntity) {
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
				settings.spriteheight = 277;
			}

			if (settings.type === undefined) {
				settings.type = me.game.ENEMY_OBJECT;
			}


			this.settingsCache = settings;
			settings.collidable = true;

			// call parent constructor
			this.parent(x, y, settings);

			this.addAnimation("fight", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14], 1);
			this.addAnimation("explode", [15,16,17,18,19,20], 1);
			this.setAnimationFrame(0);
			this.animationpause = true;

			this.time = 0;

			this.shieldUp = false;

			this.health = 50;
			this.damage = 25;

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

			if(this.turret % 7 == 0){
				xOffset = 160;
				yOffset = 10;
				type = "Enemy"
			}
			else if(this.turret % 7 == 1){
				xOffset = 320;
				yOffset = 10;
				type = "Enemy"
			}
			else if(this.turret % 7 == 5){
				xOffset = 480;
				yOffset = 10;
				type = "Enemy"
			}
			else if(this.turret % 7 == 3){
				xOffset = 90;
				yOffset = -100;
				type = "Boss"
			}
			else if(this.turret % 7 == 6){
				xOffset = 520;
				yOffset = -100;
				type = "Boss"
			}
			else{
				xOffset = 320;
				yOffset = 10;
				type = "Enemy"

			}

			var missile = new ProjectileEntity(this.pos.x + xOffset, this.pos.y + this.height + yOffset, -3, type);
			this.turret++;

			me.game.add(missile, 10);
			me.game.sort();

			
		},

		spawnEnemy: function(){
			var enemy;
			var x = Math.random();
			var xOffset = 0;

			xOffset = x*320;

			x= Math.random();
			
			if(x > .65)
				enemy = new EnemyEntity(xOffset, this.pos.y + this.height + 10);
			else
				enemy = new AdvancedEnemyEntity(xOffset, this.pos.y + this.height + 10);
			
			me.game.add(enemy, 11);
			
			

			x = Math.random();
			
			if(x > .65)
				enemy = new EnemyEntity(xOffset + 300, this.pos.y + this.height + 10);
			else
				enemy = new AdvancedEnemyEntity(xOffset + 300, this.pos.y + this.height + 10);
			
			me.game.add(enemy, 12);
			
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

			if ( (this.time++) % 45 == 0) {
				this.fire();
			}
			if ( (this.time) % 225 == 0){
				this.spawnEnemy();
			}
			if ( (this.time) % 150 == 0) {
				
				
				if(this.shieldUp == true){
					
					console.log(this.left + " " + this.width + " " + this.top + " " + this.height);
					console.log(this.collisionBox.left + " " + this.collisionBox.width + " " + this.collisionBox.top + " " + this.collisionBox.height);

					this.image = me.loader.getImage("boss");
					this.spriteheight = this.height = this.collisionBox.height = 277;
					this.updateColRect(0,600,0,277);
					this.offset.y = this.offset.y / 310 * 277;

					console.log("offset: " + this.offset.y);
					
					this.shieldUp = false;
				}
				else{
					console.log(this.left + " " + this.width + " " + this.top + " " + this.height);
					console.log(this.collisionBox.left + " " + this.collisionBox.width + " " + this.collisionBox.top + " " + this.collisionBox.height);

					this.image = me.loader.getImage("bossShield");
					this.spriteheight = this.height = this.collisionBox.height= 310;
					this.updateColRect(0,600,0,310);
					this.offset.y = this.offset.y / 277 * 310;

					console.log("offset: " + this.offset.y);

					this.shieldUp = true;
				}
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

			this.setCurrentAnimation("explode", function() {
				// remove this entity
				me.game.remove(this, true);
			});

		},

		removeHealth: function(damage) {

			if(this.shieldUp == false){
				this.health -= damage;
			}

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