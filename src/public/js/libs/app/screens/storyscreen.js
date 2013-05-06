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

           console.log("Story Screen");


            this.line = [];
            this.line[0] = "Story Screen";

            this.backgroundImage = me.loader.getImage("briefingbackground");

            this.textFont = new me.Font("Verdana", 22, "white","left");



            // enable the keyboard
            
        },

        update : function()
        {
            // enter pressed ?
            if (me.input.isKeyPressed('enter'))
            {
                var curIndex = parseInt(me.gamestat.getItemValue("mapIndex"), 10);

                me.state.change(104);

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