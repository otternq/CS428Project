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
				spritewidth: 32,
				spriteheight: 32,
				type:"Player"
			};

			this.time = 0;

			// call the parent constructor
			this.parent(x, me.game.viewport.bottom - y, settings);


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

			//SocketMovements.initialize(io.connect('/room'), this);
			//me.input.bindKey(me.input.KEY.B, "firebomb", true);
		},

		fire: function() {
			// play sound
			me.audio.play("missile");

			// create a missile entity
			if (this.hasDouble === true) {
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

		update: function()
		{

			if (me.gamestat.getItemValue("mapIndex") == me.gamestat.getItemValue("bombAtLevel")) {
				this.hasBomb = true;

				var achievement = new Clay.Achievement( { id: 1307 } );
				achievement.award( function( response ) {
					// Optional callback on completion
					console.log( response );
				} );
			}

			if (me.gamestat.getItemValue("mapIndex") == me.gamestat.getItemValue("dLaserAtLevel")) {
				this.hasDouble = true;

				var achievement = new Clay.Achievement( { id: 1306 } );
				achievement.award( function( response ) {
					// Optional callback on completion
					console.log( response );
				} );
			}

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
			if (this.pos.x > me.video.getWidth() - this.image.width) {
				this.pos.x = me.video.getWidth() - this.image.width;
			}

			//check down
			if (this.pos.y > me.game.viewport.bottom - this.image.height) {
				this.pos.y = me.game.viewport.bottom - this.image.height;
			}

			//check up
			if (this.pos.y < me.game.viewport.top) {
				this.pos.y = me.game.viewport.top;
			}

			// Moves to next level 
			if (this.pos.y === 0) {

				var mapIndex = String(me.gamestat.getItemValue("mapIndex"));
				console.log("Current mapIndex: " + mapIndex);
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
			if (me.input.isKeyPressed("b") && this.hasBomb === true)
			{
				// play sound
				me.audio.play("missile");

				// create a missile entity
				//var missile = new ProjectileEntity(this.pos.x + 15, this.pos.y - 34,7, "Player");
				var missile = new BombEntity(this.pos.x + 15, this.pos.y - 34,7, "Player");
				me.game.add(missile, this.z);
				me.game.sort();
			}

			this.computeVelocity(this.vel);
			this.pos.add(this.vel);
			this.checkCollision();


			//this.movedByRemote = false;

			// update animation if necessary
			var updated = (this.vel.x !== 0 || this.vel.y !== 0);
			return updated;
		},

		checkCollision: function()
		{
			var res = me.game.collide(this);

			if (res) {
				// if collided object is an enemy
				if (res.obj.type == me.game.ENEMY_OBJECT) {
					// play sound
					//me.audio.play("implosion");

					// update life indicator
					this.removeHealth();

					// remove enemy
					res.obj.remove();
				} else if (res.obj.type == "asteroid" || res.obj.type == "mine") {

					this.removeHealth();

					res.obj.remove();

				} else {
					console.log("Player colliding with: "+ res.obj.type);
					console.log(res.obj);
				}
			}
		},

		removeHealth: function () {
			var smallExplosion = new SmallExplosionAnimation(this.pos.x, this.pos.y);
			me.game.add(smallExplosion, 15);
			me.game.sort();

			me.game.HUD.updateItemValue("life", -1);

			// if no more lives
			if (me.game.HUD.getItemValue("life") <= 0) {
				// game over
				me.state.change(102,
					me.game.HUD.getItemValue("score"));

				return;
			}
		}
	});
});