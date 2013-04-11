define([
	'menuScreen'
],function(MenuScreen) {
	describe("MenuScreen", function() {

		beforeEach(function() {
			document.body.innerHTML = '<div id="jsapp"><font color="#FFFFFF", style="position: absolute; font-size: 10px; font-family: Courier New"><span id="framecounter">(0/0 fps)</span></font></div>';

			if (!me.video.init('jsapp', 640, 640))
			{
				alert("Sorry but your browser does not support html 5 canvas.");
	         	return 'no canvas support';
			}
		});

		it(
			"loading the game module",
			function () {

				var menu = new MenuScreen();
				me.state.set(me.state.MENU, menu);

				me.state.change(me.state.MENU);
				
			}
		);

	})
});