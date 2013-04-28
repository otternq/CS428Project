define([
	'game',
	'text!/data/resources.json',
	'text!/data/levels.json'
], function(Game, Resources, LevelsData) {

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
		var g_resources = JSON.parse(Resources);

		//add the levels to the resources array
		var levels = JSON.parse(LevelsData);
		for (var i = 0; i < levels.length; i++) {
			g_resources[g_resources.length] = levels[i].resource;
		}



		

		//bootstrap :)
		window.onReady(function()
		{
			var requireClay = true; // If you pass true for 2nd param, it will make sure they've logged into clay (not anonymous)
			Clay.ready(function() {
				var requireClay = true; // If you pass true for 2nd param, it will make sure they've logged into clay (not anonymous)
				
				Clay.Player.requireLogin(
					function( response ) {},
					requireClay
				);

				Clay.Player.onUserReady(function(response) {

					Game.onload(g_resources);


				});

			});

		});
	}

	return {
		initialize: initialize
	};

});
