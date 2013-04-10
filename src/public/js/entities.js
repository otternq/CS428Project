function socketMovements(socket, playerEntity) {


	//var socket = io.connect();

	socket.on('bcast', function(data) {
		alert('data');
	});

	socket.on('up', function() {

		playerEntity.vel.y -= playerEntity.accel.y * me.timer.tick;

		playerEntity.movedByRemote = true;

	});

	socket.on('down', function() {

		console.log('decrease velocity.');
		playerEntity.vel.y += playerEntity.accel.y * me.timer.tick;	

		playerEntity.movedByRemote = true;

	});

	socket.on('stillx', function() {
		playerEntity.vel.x = 0;
		playerEntity.movedByRemote = true;
	});

	socket.on('stillY', function() {

		playerEntity.vel.y = playerEntity.constVelocity;

		playerEntity.movedByRemote = true;

	});

	socket.on('left', function() {

		playerEntity.flipX(true);
		//playerEntity.vel.x -= playerEntity.accel.x * me.timer.tick;
		playerEntity.vel.x = -(playerEntity.accel.x * me.timer.tick);

		playerEntity.movedByRemote = true;

	});

	socket.on('right', function() {

		playerEntity.flipX(false);
		playerEntity.vel.x = playerEntity.accel.x * me.timer.tick;

		playerEntity.movedByRemote = true;

	});

	socket.on('shoot', function() {
		
		// create a missile entity
		var missile = new ProjectileEntity(playerEntity.pos.x + 15, playerEntity.pos.y - 34,7, "Player");
		me.game.add(missile, playerEntity.z);
		me.game.sort();

		// play sound
		me.audio.play("missile");

	});

	playerEntity.update();

}


function log(message)
{
	if(typeof console == "object"){
		console.log(message);
	}
}

var UserControlledEntity = me.ObjectEntity.extend(
{
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

		socketMovements(io.connect(), this);
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
			if(this.movedByRemote == false)
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
			me.audio.play("missile");

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
		var updated = (this.vel.x != 0 || this.vel.y != 0);
		return updated;
	},

	checkCollision: function()
	{
		var res = me.game.collide(this);

		// if collided object is an enemy
		if (res && res.obj.type == me.game.ENEMY_OBJECT)
		{
			// play sound
			me.audio.play("implosion");

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


var ProjectileEntity = me.ObjectEntity.extend(
{
	init: function(x, y,vel,from)
	{
		this.time = 0;
		this.type = "Projectile";

		this.shotFrom = from;
		if(from == "Player")
			this.parent(x, y, {image: "missile"});
		else
			this.parent(x,y, {image: "enemyMissile"});

		this.setVelocity(0, vel);  // set the default vertical speed (accel vector)
	},

	update: function()
	{
	//determines how long the projectile stays active in the screen
		this.time++;
		if(this.time == 60)
			me.game.remove(this);

	//check for positive or negative velocity and adjust the position accordingly
		if(this.accel.y < 0)  //enemy projectiles have negative velocity
			this.vel.y += this.accel.y * me.timer.tick;
		else
			this.vel.y -= this.accel.y * me.timer.tick;

	// if the missile object goes out from the screen,
	// remove it from the game manager
		if (!this.visible)
			me.game.remove(this);

	// check & update missile movement
		this.computeVelocity(this.vel);
		this.pos.add(this.vel);

	// collision detection
		var res = me.game.collide(this);
		if(this.shotFrom == "Player"){
			if (res && res.obj.type == me.game.ENEMY_OBJECT)  //if projectile collides with an enemy
			{
				// remove enemy
				res.obj.remove();
				// remove missile
				me.game.remove(this);

				// update score
				me.game.HUD.updateItemValue("score", 10);
			}
		}

		return true;
	}
});


var EnemyEntity = me.ObjectEntity.extend(
{
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
		me.audio.play("implosion");

		// init implosion
		var implosion = new ExplosionAnimation(this.pos.x, this.pos.y);
		me.game.add(implosion, 15);
		me.game.sort();
	}
});


var EnemyFleet = Object.extend(
{
	init: function(num)
	{
		// init variables
		this.fps = 0;
		this.maxSize = num;
		this.generated = 0;
		this.maxX = (me.video.getWidth() / 10) - 5;
	},

	update: function()
	{
		
		
		if ( this.fps++ % 30 == 0 && this.generated < this.maxSize)
		{
			var y = me.game.viewport.top + 10;
			var x = Number.prototype.random(0, this.maxX) * 10;

			// add an enemy
			me.game.add(new EnemyEntity(x, y), 10);
			me.game.sort();

			this.generated += 1;
		}

		return true;
	}
});


var ImplosionAnimation = me.AnimationSheet.extend(
{
	init: function(x, y)
	{
		log("imploding");
		// call parent constructor
		var image = me.loader.getImage("implosion");
		this.parent(x, y, image, 45, 42);

		// add animation with all sprites
		this.addAnimation("implosion", null, .05);

		// set animation
		this.setCurrentAnimation("implosion", function() {
			me.game.remove(this);
			me.game.sort();
		});
	}
});


var ExplosionAnimation = me.AnimationSheet.extend(
{
	init: function(x, y)
	{

		// call parent constructor
		var image = me.loader.getImage("explosion");
		this.parent(x, y, image, 45, 42);

		// add animation with all sprites
		this.addAnimation("explosion", null, .05);

		// set animation
		this.setCurrentAnimation("explosion", function() {
			me.game.remove(this);
			me.game.sort();
		});
	}
});
