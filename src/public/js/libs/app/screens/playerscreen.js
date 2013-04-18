define([
    'lifeobject',
    'scoreobject',
    'usercontrolledentity',
    'enemyfleet'
], function(LifeObject, ScoreObject, UserControlledEntity, EnemyFleet) {
    /* the in game stuff*/
    return me.ScreenObject.extend(
    {

        init: function() {
            this.parent(true);
            this.mapScrollRate = -2;

            console.log("Initialized Player Screen");

        },

       onResetEvent: function(map) {
            // stuff to reset on state change
            // add a default HUD
            me.game.addHUD(0, 0, me.video.getWidth(), 45);

            // add a new HUD item
            me.game.HUD.addItem("life", new LifeObject(3));

            // add a new HUD item
            me.game.HUD.addItem("score", new ScoreObject());

            //load a level
            me.levelDirector.loadLevel(map);
           

            this.posVector =  new me.Vector2d(0, me.game.currentLevel.realheight-302);
            me.game.viewport.follow(this.posVector, me.game.viewport.AXIS.VERTICAL);

            // add main player
            var ship = new UserControlledEntity(302, 0, this.mapScrollRate);
            me.game.add(ship, 10);

            // add enemy fleet
            me.game.add(new EnemyFleet(25), 10);

            // make sure everything is in the right order
            me.game.sort();


        },
        update: function(){
            this.posVector.y += this.mapScrollRate;

        },
        onDestroyEvent: function()
        {



       }

    });
});