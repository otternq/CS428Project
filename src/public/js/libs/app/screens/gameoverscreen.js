define([
    'backgroundobject',
    'button'
], function(BackgroundObject, Button) {
    return me.ScreenObject.extend({
        /*
         * constructor
         */
        init: function(score)
        {
            // call parent constructor
            this.parent(true, true);

            // init stuff
            this.end = null;
            this.score = null;
            this.restart = null;
            this.menu = null;
            this.finalScore = null;
            this.title = null;

            this.leaderboardReported = false;

            console.log("Initialized GameFailed Screen");
        },

        /*
         * reset function
         */
        onResetEvent: function(score)
        {
            this.finalScore = me.gamestat.getItemValue("score");

            // add parallax background
           // me.game.add(new BackgroundObject(), 1);

            this.title = me.loader.getImage("title");

            // labels
            this.end = new me.Font("Verdana", 25, "white");
            this.score = new me.Font("Verdana", 22, "white");

            this.menu = new Button("menu", me.state.MENU, 330);

            if (this.leaderboardReported === false) {

                me.leaderboard.post( { score: this.finalScore }, function( response ) {
                    // Callback
                    console.log( response );
                    me.leaderboard.show();
                } );

                this.leaderboardReported = true;
            }


        },

        /*
         * drawing function
         */
        draw: function(context)
        {
             me.video.clearSurface(context,"Gray");

            // draw buttons
           // this.restart.draw(context);
            this.menu.draw(context);
            context.drawImage(this.title, (me.video.getWidth() / 2 - this.title.width / 2), 50);

            // draw end label
            var endText = "You Win!";
            var endSize = this.end.measureText(context, endText);

            this.end.draw(context, endText, me.video.getWidth() / 2 - endSize.width / 2, 220);

            // draw score label
            var scoreText = "Score : " + this.finalScore;
            var scoreSize = this.score.measureText(context, scoreText);

            this.score.draw(context, scoreText, me.video.getWidth() / 2 - scoreSize.width / 2, 275);

        },

        /*
         * destroy event function
         */
        onDestroyEvent: function()
        {
            // release mouse event
           // me.input.releaseMouseEvent("mousedown", this.restart);
            me.input.releaseMouseEvent("mousedown", this.menu);
        }
    });
});