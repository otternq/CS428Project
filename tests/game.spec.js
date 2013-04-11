define([
	'game'
],function(Game) {
	describe("Game", function() {

		beforeEach(function() {
			document.body.innerHTML = '<div id="jsapp"><font color="#FFFFFF", style="position: absolute; font-size: 10px; font-family: Courier New"><span id="framecounter">(0/0 fps)</span></font></div>';
		});

		it(
			"loading the game module",
			function () {

				var base = "/base/src/public/";
				// game resources
				var g_resources = [
				{name: "bkg0", type: "image", src: base + "data/sprite/bkg0.png"},
				{name: "bkg1", type: "image", src: base + "data/sprite/bkg2.png"},
				{name: "map1", type: "tmx", src: base + "data/map1.tmx"},
				{name: "ship", type:"image", src: base + "data/sprite/ship2.png"},
				{name: "enemy", type:"image", src: base + "data/sprite/enemy2.png"},
				{name: "missile", type:"image", src: base + "data/sprite/missile.png"},
				{name: "enemyMissile", type:"image", src: base + "data/sprite/enemyMissile.png"},
				{name: "implosion", type:"image", src: base + "data/sprite/implosion.png"},
				{name: "explosion", type:"image", src: base + "data/sprite/explosion.png", channel: 1},
				{name: "life0", type:"image", src: base + "data/sprite/life20.png"},
				{name: "life1", type:"image", src: base + "data/sprite/life21.png"},
				{name: "life2", type:"image", src: base + "data/sprite/life22.png"},
				{name: "life3", type:"image", src: base + "data/sprite/life23.png"},

				//interface resources
				{name: "title", type:"image", src: base + "data/sprite/title.png"},
				{name: "play", type:"image", src: base + "data/sprite/play.png"},
				{name: "play_hover", type:"image", src: base + "data/sprite/play_hover.png"},
				{name: "restart", type:"image", src: base + "data/sprite/restart.png"},
				{name: "restart_hover", type:"image", src: base + "data/sprite/restart_hover.png"},
				{name: "menu", type:"image", src: base + "data/sprite/menu.png"},
				{name: "menu_hover", type:"image", src: base + "data/sprite/menu_hover.png"},

				// audio resources
				{name: "missile", type:"audio", src: base + "data/sound/", channel: 1},
				{name: "implosion", type:"audio", src: base + "data/sound/", channel: 1}

				];

				//bootstrap :)
				window.onReady(function() 
				{
					var r = Game.onload(g_resources);
					expect(r).toBe(true);
				});
			}
		);

	})
});