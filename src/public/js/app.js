define([
	'game'
], function(Game) {

	var initialize = function(){
		/*!
		 * 
		 *   melonJS
		 *   http://www.melonjs.org
		 *		
		 *   Step by step game creation tutorial
		 *
		 **/

		function log(message){
		if(typeof console == "object"){
		console.log(message);
		}
		}

		// game resources
		var g_resources = [
		{name: "bkg0", type: "image", src: "data/sprite/bkg0.png"},
		{name: "bkg1", type: "image", src: "data/sprite/bkg2.png"},
		{name: "map1", type: "tmx", src: "data/map1.tmx"},
		{name: "ship", type:"image", src: "data/sprite/ship2.png"},
		{name: "enemy", type:"image", src: "data/sprite/enemy2.png"},
		{name: "missile", type:"image", src: "data/sprite/missile.png"},
		{name: "enemyMissile", type:"image", src: "data/sprite/enemyMissile.png"},
		{name: "implosion", type:"image", src: "data/sprite/implosion.png"},
		{name: "explosion", type:"image", src: "data/sprite/explosion.png", channel: 1},
		{name: "life0", type:"image", src: "data/sprite/life20.png"},
			{name: "life1", type:"image", src: "data/sprite/life21.png"},
			{name: "life2", type:"image", src: "data/sprite/life22.png"},
			{name: "life3", type:"image", src: "data/sprite/life23.png"},

		//interface resources
		{name: "title", type:"image", src: "data/sprite/title.png"},
		{name: "play", type:"image", src: "data/sprite/play.png"},
		{name: "play_hover", type:"image", src: "data/sprite/play_hover.png"},
		{name: "restart", type:"image", src: "data/sprite/restart.png"},
		{name: "restart_hover", type:"image", src: "data/sprite/restart_hover.png"},
		{name: "menu", type:"image", src: "data/sprite/menu.png"},
		{name: "menu_hover", type:"image", src: "data/sprite/menu_hover.png"},

		// audio resources
		//{name: "missile", type:"audio", src: "data/sound/", channel: 1},
		//{name: "implosion", type:"audio", src: "data/sound/", channel: 1},

		];



		

		//bootstrap :)
		window.onReady(function()
		{
			var requireClay = true; // If you pass true for 2nd param, it will make sure they've logged into clay (not anonymous)
			Clay.ready(function() {
				var requireClay = true; // If you pass true for 2nd param, it will make sure they've logged into clay (not anonymous)
				Clay.Player.requireLogin( function( response ) {
					// Function that is called on successful login, or failed login
					// response is an object { success: boolean, error: "truthy" }
					console.log(response);
					if (response.success === true) {
						Game.onload(g_resources);
						me.leaderboard = new Clay.Leaderboard( { id: 1081 } );
					}

				}, requireClay );

			});

		});
	}

	return {
		initialize: initialize
	};

});
