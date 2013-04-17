require({

    baseUrl: '/base/src/public',
    paths: {
      'require': 'js/libs/require',
      'explosionanimation': 'js/libs/app/animation/explosionanimation',
      playerMovements: 'js/libs/app/socketMovement',
      enemyfleet: 'js/libs/app/enemyfleet',

      //screens
      menuScreen: 'js/libs/app/screens/menuscreen',
      playerScreen: 'js/libs/app/screens/playerscreen',
      gameoverscreen: 'js/libs/app/screens/gameoverscreen',
      titleScreen: 'js/libs/app/screens/titlescreen',

      //entities
      enemyentity: 'js/libs/app/entities/enemyentity',
      projectileentity: 'js/libs/app/entities/projectileentity',
      usercontrolledentity: 'js/libs/app/entities/usercontrolledentity',

      //animation
      explosionanimation: 'js/libs/app/animation/explosionanimation',
      implosionanimations: 'js/libs/app/animation/implosionanimations',

      //gui elements
      backgroundlayer: 'js/libs/app/gui/backgroundlayer',
      backgroundobject: 'js/libs/app/gui/backgroundobject',
      button: 'js/libs/app/gui/button',
      lifeobject: 'js/libs/app/gui/lifeobject',
      scoreobject: 'js/libs/app/gui/scoreobject',

      //the game
      game: 'js/game'
    }
    
  },

  [
    '../../tests/game.spec',
    '../../tests/menuscreen.spec'
  ], function(){
    // The "app" dependency is passed in as "App"
    window.__karma__.start();
});