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

            this.line = [];
            this.line[0] = "How To Play";
            this.line[1] = "'Spacebar' Fires Lasers"
            this.line[2] = " 'B' Fires Bombs Once They're Unlocked" ;
            this.line[3] = "";
            this.line[4] = "If You're Using The Remote Controller"
            this.line[5] = "'A' Is The 'Spacebar'";
            this.line[6] = "'C' is 'Enter'";
            this.line[7] = "";
            this.line[8] = "To Beat A Level"
            this.line[9] = "Fight Your Way Through And Reach The Top";
            this.line[10] = "Score As Many Points As Possible";

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
            

            for (var i=0; i < this.line.length; i++) {
                this.x1 = this.textFont.measureText(context,this.line[i]).width;
                this.textFont.draw (context, this.line[i],     Math.round(me.game.viewport.width/2 - this.x1/2), 200 + (25 * i));
            }
        },


        onDestroyEvent: function()
        {
            
        }
    });
});