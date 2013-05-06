define([
    'backgroundobject',
    'button'
], function(BackgroundObject, Button) {
    return me.ScreenObject.extend({
        /*
         * constructor
         */
        init: function()
        {
            // call parent constructor
            this.parent(true, true);
            this.textFont = null;

           this.backgroundImage = null;

        },

        onResetEvent: function()
        {
           // add parallax background
           // me.game.add(new BackgroundObject(), 1);

           console.log("How to play screen");

            
            this.line1 = "How To Play Screen";
            this.line2 = "line2";
            this.line3 = "line3";

            this.backgroundImage = me.loader.getImage("briefingbackground");

            this.textFont = new me.Font("Verdana", 22, "white","left");


            // enable the keyboard
            
        },

        update : function()
        {
            // enter pressed ?
            var mapIndex = String(me.gamestat.getItemValue("mapIndex"));

            if(me.input.isKeyPressed('enter')) {
                me.state.change(
                    100,
                    me.gamestat.getItemValue("briefing"+ mapIndex)[0],
                    me.gamestat.getItemValue("briefing"+ mapIndex)[1],
                    me.gamestat.getItemValue("briefing"+ mapIndex)[2],
                    me.gamestat.getItemValue("briefing"+ mapIndex)[3]
                );
            }



            return true;
        },

        draw: function(context)
        {

            me.video.clearSurface(context,"Gray");
            context.drawImage(this.backgroundImage, 0,0);

        // Instruction text
            var instruction1 = "Press 'Enter' To Continue";
            
            this.i1 = this.textFont.measureText(context,instruction1 ).width;
            
            this.textFont.draw (context, instruction1,     Math.round(me.game.viewport.width/2 - this.i1/2), 75);
            


            this.x1 = this.textFont.measureText(context,this.line1).width;
            this.x2 = this.textFont.measureText(context,this.line2).width;
            this.x3 = this.textFont.measureText(context,this.line3).width;


            this.textFont.draw (context, this.line1,     Math.round(me.game.viewport.width/2 - this.x1/2), 200);
            this.textFont.draw (context, this.line2,     Math.round(me.game.viewport.width/2 - this.x2/2), 250);
            this.textFont.draw (context, this.line3,     Math.round(me.game.viewport.width/2 - this.x3/2), 300);
        },


        onDestroyEvent: function()
        {
            
        }
    });
});