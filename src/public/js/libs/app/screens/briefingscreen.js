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

        },

        onResetEvent: function(mapName,line1, line2, line3)
        {
            // add parallax background
            me.game.add(new BackgroundObject(), 1);

            this.map = mapName;
            this.line1 = line1;
            this.line2 = line2;
            this.line3 = line3;



            this.textFont = new me.Font("Verdana", 26, "white","center");



            // enable the keyboard
            me.input.bindKey(me.input.KEY.ENTER, "enter");
        },

        update : function()
        {
            // enter pressed ?
            if (me.input.isKeyPressed('enter'))
            {
                me.state.change(me.state.PLAY, this.map);
            }

            return true;
        },

        draw: function(context)
        {
            this.x1 = this.textFont.measureText(context,this.line1).width;
            this.x2 = this.textFont.measureText(context,this.line2).width;
            this.x3 = this.textFont.measureText(context,this.line3).width;

            this.textFont.draw (context, this.line1,     me.game.viewport.width/2 - this.x1/2, 200);
            this.textFont.draw (context, this.line2,     me.game.viewport.width/2 - this.x2/2, 250);
            this.textFont.draw (context, this.line3,     me.game.viewport.width/2 - this.x3/2, 300);
        },


        onDestroyEvent: function()
        {

        }
    });
});