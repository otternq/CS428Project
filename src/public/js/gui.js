/*
 * HUD life item
 */
var LifeObject = me.HUD_Item.extend(
{
	/*
	 * constructor
	 */
	init: function(lives)
	{
		// call the parent constructor
		this.parent(me.video.getWidth() - 145, 5, lives);

		// create image
		this.image = me.loader.getImage("life" + lives);
	},

	/*
	 * decrease life count
	 */
	update: function(value)
	{
		this.value += value;

		// updating life count
		this.image = me.loader.getImage("life" + this.value);
		return true;
	},

	/*
	 * drawing function
	 */
	draw: function(context, x, y)
	{
		// draw life indicator
		context.drawImage(this.image, this.pos.x + x, this.pos.y + y);
	}
});

/*
 * HUD score item
 */
var ScoreObject = me.HUD_Item.extend(
{
	/*
	 * constructor
	 */
	init: function()
	{
		// call the parent constructor
		this.parent(5, 0);

		// create a font
		this.score = new me.Font("Verdana", 20, "white");
	},

	/*
	 * draw score
	 */
	draw: function(context, x, y)
	{
		var scoreText = "Score : " + this.value;
		var scoreSize = this.score.measureText(context, scoreText);

		this.score.draw(context, scoreText, this.pos.x, scoreSize.height);
	}
});

/*
 * draw a button on screen
 */
var Button = me.Rect.extend(
{
	/*
	 * constructor
	 */
	init: function(image, action, y)
	{
		// init stuff
		this.image = me.loader.getImage(image);
		this.image_hover = me.loader.getImage(image + "_hover");
		this.action = action;
		this.pos = new me.Vector2d((me.video.getWidth() / 2 - this.image.width / 2), y);

		// call parent constructor
		this.parent(this.pos, this.image.width, this.image.height);

		// register mouse event
		me.input.registerMouseEvent("mousedown", this, this.clicked.bind(this));
	},

	/*
	 * action to perform when a button is clicked
	 */
	clicked: function()
	{
		// start action
		me.state.change(this.action);
	},

	/*
	 * drawing function
	 */
	draw: function(context)
	{
		// on button hovered
		if (this.containsPoint(me.input.mouse.pos))
			context.drawImage(this.image_hover, this.pos.x, this.pos.y);
		else
			context.drawImage(this.image, this.pos.x, this.pos.y);
	},

	/*
	 * destroy event function
	 */
	onDestroyEvent: function()
	{
		// release mouse events
		me.input.releaseMouseEvent("mousedown", this);
	}
});

/*
 * background layer
 */
var BackgroundLayer = me.ImageLayer.extend(
{
	/*
	 * constructor
	 */
	init: function(image, speed)
	{
		name = image;
		width = 1000;
		height = 450;
		z = 1;
		ratio = 1;
		this.speed = speed;

		// call parent constructor
		this.parent(name, width, height, image, z, ratio);
	},

	/*
	 * update function
	 */
	update: function()
	{
		// recalibrate image position
		if (this.offset.x >= this.imagewidth)
			this.offset.x = 0;

		// increment horizontal background position
		this.offset.x += this.speed;

		return true;
	}
});

/*
 * parallax background
 */
var BackgroundObject = Object.extend(
{
	/*
	 * constructor
	 */
	init: function()
	{
		me.game.add(new BackgroundLayer("bkg0", 0.9), 1); // layer 1
		me.game.add(new BackgroundLayer("bkg1", 1.5), 2); // layer 2
		me.game.sort();
	},

	/*
	 * update function
	 */
	update: function()
	{
		return true;
	}
});
