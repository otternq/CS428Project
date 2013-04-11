define([
	'game'
],function(Game) {
	describe("explosion animation tests", function() {

		beforeEach(function() {
			document.body.innerHTML = '<div id="jsapp"></div>';
		});

		it(
			"set animation to explosion",
			function () {
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
				{name: "missile", type:"audio", src: "data/sound/", channel: 1},
				{name: "implosion", type:"audio", src: "data/sound/", channel: 1}

				];

				//bootstrap :)
				window.onReady(function() 
				{
					var r = Game.onload([]);
					expect(r).toBe(true);
				});
			}
		);

	})
});