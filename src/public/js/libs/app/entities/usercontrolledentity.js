define([
	'projectileentity',
	'bombentity',
	'smallexplosionanimation'
], function(ProjectileEntity,BombEntity,SmallExplosionAnimation) {
	return me.ObjectEntity.extend({
		init: function(x, y, constVel)
		{

			this.movedByRemote = false;

			this.player = true;

			var settings = {
				image: "ship",
				spritewidth: 36,
				spriteheight: 36,
				type:"Player"
			};

			this.time = 0;
			this.damage = 2;

			// call the parent constructor
			this.parent(x, me.game.viewport.bottom - y, settings);


			// add animation with all sprites
			this.addAnimation("flying", [2], 0.2);

			this.setCurrentAnimation("flying");


			this.constVelocity = constVel;
			// set the default horizontal & vertical speed (accel vector)
			this.setVelocity(3, 3);
			this.maxVel = new me.Vector2d(6,6);

			// init variables
			this.gravity = 0;

			this.hasBomb = false;
			this.hasDouble = false;

			// enable collision
			this.collidable = true;


			if (me.gamestat.getItemValue("hasBomb") === true) {
				this.hasBomb = true;
			}

			if (me.gamestat.getItemValue("hasDouble") === true) {
				this.hasDouble = true;
			}

			//SocketMovements.initialize(io.connect('/room'), this);
			//me.input.bindKey(me.input.KEY.B, "firebomb", true);
		},

		fire: function() {
			// play sound
			me.audio.play("missile");

			// create a missile entity
			if (this.hasDouble === true && me.gamestat.getItemValue("mapIndex") > me.gamestat.getItemValue("dLaserAtLevel") ) {
				var missle1 = new ProjectileEntity(this.pos.x, this.pos.y - 34,7, "Player");
				var missle2 = new ProjectileEntity(this.pos.x + 30, this.pos.y - 34,7, "Player");
				me.game.add(missle1, this.z);
				me.game.add(missle2, this.z);
			} else {
				var missile = new ProjectileEntity(this.pos.x + 15, this.pos.y - 34,7, "Player");
				me.game.add(missile, this.z);
			}

			me.game.sort();
		},

		fireBomb: function() {
			if( this.hasBomb === true && me.gamestat.getItemValue("mapIndex") > me.gamestat.getItemValue("bombAtLevel"))
			{
				// play sound
				me.audio.play("missile");

				// create a missile entity
				//var missile = new ProjectileEntity(this.pos.x + 15, this.pos.y - 34,7, "Player");
				var missile = new BombEntity(this.pos.x + 15, this.pos.y - 34,7, "Player");
				me.game.add(missile, this.z);
				me.game.sort();
			}
		},

		update: function()
		{

			//this.parent(this);

			// move left
			if (me.input.isKeyPressed("left")) {

				// update the entity velocity
				this.vel.x -= this.accel.x * me.timer.tick;

			} else if (me.input.isKeyPressed("right")) {// move right


				// update the entity velocity
				this.vel.x += this.accel.x * me.timer.tick;

			} else if(this.movedByRemote === false) {
				this.vel.x = 0;
			}

			// move up
			if (me.input.isKeyPressed("up")) {
				// update the entity velocity
				this.vel.y -= this.accel.y * me.timer.tick;
			} else if (me.input.isKeyPressed("down")) {// move down
				// update the entity velocity
				this.vel.y += this.accel.y * me.timer.tick;
			} else {
				this.vel.y = this.constVelocity;
			}

			//bounds checking
			//check left
			if (this.pos.x < 0) {
				this.pos.x = 0;
			}

			//check right
			if (this.pos.x > me.video.getWidth() - this.width) {
				this.pos.x = me.video.getWidth() - this.width;
			}

			//check down
			if (this.pos.y > me.game.viewport.bottom - this.height) {
				this.pos.y = me.game.viewport.bottom - this.height;
			}

			//check up
			if (this.pos.y < me.game.viewport.top) {
				this.pos.y = me.game.viewport.top;
			}

			// Moves to next level 
			if (this.pos.y === 0) {

				var mapIndex = String(me.gamestat.getItemValue("mapIndex"));
				console.log("Current mapIndex: " + mapIndex);

				if (me.game.HUD.getItemValue("life") == 100) {
					var achievement = new Clay.Achievement( { id: 1362 } );
		            achievement.award( function( response ) {
		                // Optional callback on completion
		                console.log( response );
		            } );
				} else if (me.game.HUD.getItemValue("life") == 10) {
					var achievement = new Clay.Achievement( { id: 1363 } );
		            achievement.award( function( response ) {
		                // Optional callback on completion
		                console.log( response );
		            } );
				}

				me.state.change(
					101,
					me.gamestat.getItemValue("debriefing"+mapIndex)[0],
					me.gamestat.getItemValue("debriefing"+mapIndex)[1],
					me.gamestat.getItemValue("debriefing"+mapIndex)[2],
					me.gamestat.getItemValue("debriefing"+mapIndex)[3]
				);
			}

			// fire
			if (me.input.isKeyPressed("space"))
			{
				this.fire();
			}

			// fire bomb
			if ( me.input.isKeyPressed("b") ) {
				this.fireBomb();
			}

			this.computeVelocity(this.vel);
			this.pos.add(this.vel);
			this.checkCollision();


			//this.movedByRemote = false;

			// update animation if necessary
			var updated = (this.vel.x !== 0 || this.vel.y !== 0);
			return true;
		},

		checkCollision: function()
		{
			var res = me.game.collide(this);

			if (res) {
				// play sound
					me.audio.play("implosion");

				// if collided object is an enemy
				if (res.obj.type == me.game.ENEMY_OBJECT) {
					

					// update life indicator
					this.removeHealth(res.obj.damage);

					// remove enemy
					//res.obj.remove();
					res.obj.removeHealth(this.damage);

				} else if (res.obj.type == "asteroid" || res.obj.type == "mine") {

					this.removeHealth(res.obj.damage);

					res.obj.remove();

				} else {
					console.log("Player colliding with: "+ res.obj.type);
					console.log(res.obj);
				}
			}
		},

		removeHealth: function (damage) {
			/*
			var smallExplosion = new SmallExplosionAnimation(this.pos.x, this.pos.y);
			me.game.add(smallExplosion, 15);
			me.game.sort();
			*/

			//alert(damage);

			if (damage != undefined) {

				me.audio.play("implosion");

				me.game.HUD.updateItemValue("life", -1 * damage);

				// if no more lives
				if (me.game.HUD.getItemValue("life") <= 0) {

					var score = me.game.HUD.getItemValue("score");
					// game over
					me.state.change(102, score);

					return;
				}
			}
		}
	});
});