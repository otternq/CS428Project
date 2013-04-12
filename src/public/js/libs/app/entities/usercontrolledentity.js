define([
	'playerMovements',
	'projectileentity'
], function(socketMovements, ProjectileEntity) {
	return me.ObjectEntity.extend({
		init: function(x, y, constVel)
		{

			this.movedByRemote = false;
			this.type = "Player";

			// call the parent constructor
			this.parent(x, me.game.viewport.bottom - y, {image: "ship"});

			this.constVelocity = constVel;
			// set the default horizontal & vertical speed (accel vector)
			this.setVelocity(3, 3);
			this.maxVel = new me.Vector2d(6,6);

			// init variables
			this.gravity = 0;

			// enable collision
			this.collidable = true;

			socketMovements.initialize(io.connect('/room'), this);
		},

		update: function()
		{
		// move left
			if (me.input.isKeyPressed("left"))
			{
				// update the entity velocity
				this.vel.x -= this.accel.x * me.timer.tick;
			}
		// move right
			else if (me.input.isKeyPressed("right"))
			{
				// update the entity velocity
				this.vel.x += this.accel.x * me.timer.tick;
			}
			else{
				if(this.movedByRemote === false)
					this.vel.x = 0;
			}

		// move up
			if (me.input.isKeyPressed("up"))
			{
				// update the entity velocity
				this.vel.y -= this.accel.y * me.timer.tick;
			}
		// move down
			else if (me.input.isKeyPressed("down"))
			{
				// update the entity velocity
				this.vel.y += this.accel.y * me.timer.tick;
			}
			else{
				this.vel.y = this.constVelocity;
			}

		//bounds checking
			//check left
			if (this.pos.x < 0)
					this.pos.x = 0;

			//check right
			if (this.pos.x > me.video.getWidth() - this.image.width)
					this.pos.x = me.video.getWidth() - this.image.width;

			//check down
			if (this.pos.y > me.game.viewport.bottom - this.image.height)
					this.pos.y = me.game.viewport.bottom - this.image.height;

			//check up
			if (this.pos.y < me.game.viewport.top)
					this.pos.y = me.game.viewport.top;


		// fire
			if (me.input.isKeyPressed("fire"))
			{
				// play sound
				//me.audio.play("missile");

				// create a missile entity
				var missile = new ProjectileEntity(this.pos.x + 15, this.pos.y - 34,7, "Player");
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

			// if collided object is an enemy
			if (res && res.obj.type == me.game.ENEMY_OBJECT)
			{
				// play sound
				//me.audio.play("implosion");

				// update life indicator
				me.game.HUD.updateItemValue("life", -1);

				// if no more lives
				if (me.game.HUD.getItemValue("life") <= 0)
				{
					// game over
					me.state.change(me.state.GAMEOVER,
						me.game.HUD.getItemValue("score"));

					return;
				}

				// remove enemy
				res.obj.remove();
			}
		}
	});
});