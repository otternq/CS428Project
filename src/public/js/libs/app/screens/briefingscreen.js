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

        onResetEvent: function(mapName,line1, line2, line3)
        {
           // add parallax background
           // me.game.add(new BackgroundObject(), 1);

           console.log("Briefing Screen for: " + mapName);

            this.map = mapName;
            this.line1 = line1;
            this.line2 = line2;
            this.line3 = line3;

            this.backgroundImage = me.loader.getImage("briefingbackground");

            this.textFont = new me.Font("Verdana", 22, "white","left");



            // enable the keyboard
            me.input.bindKey(me.input.KEY.ENTER, "enter");
        },

        update : function()
        {
            // enter pressed ?
            if (me.input.isKeyPressed('enter'))
            {
                var curIndex = parseInt(me.gamestat.getItemValue("mapIndex"), 10);

                me.state.change(me.state.PLAY, this.map);

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