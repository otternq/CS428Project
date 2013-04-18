// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
  paths: {
    //general
    playerMovements: 'libs/app/socketMovement',
    enemyfleet: 'libs/app/enemyfleet',

    //screens
    menuScreen: 'libs/app/screens/menuscreen',
    playerScreen: 'libs/app/screens/playerscreen',
    gameoverscreen: 'libs/app/screens/gameoverscreen',
    gamefailscreen: 'libs/app/screens/gamefailscreen',
    titleScreen: 'libs/app/screens/titlescreen',
    briefingScreen: 'libs/app/screens/briefingscreen',

    //entities
    enemyentity: 'libs/app/entities/enemyentity',
    projectileentity: 'libs/app/entities/projectileentity',
    usercontrolledentity: 'libs/app/entities/usercontrolledentity',

    //animation
    explosionanimation: 'libs/app/animation/explosionanimation',
    implosionanimations: 'libs/app/animation/implosionanimations',

    //gui elements
    backgroundlayer: 'libs/app/gui/backgroundlayer',
    backgroundobject: 'libs/app/gui/backgroundobject',
    button: 'libs/app/gui/button',
    lifeobject: 'libs/app/gui/lifeobject',
    scoreobject: 'libs/app/gui/scoreobject',

    //the game
    game: 'game'
  }

});

require([

  // Load our app module and pass it to our definition function
  'app',
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();
});
