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

            this.option1 = null;
            this.option2 = null;

        },

        onResetEvent: function(line1, line2, line3, nextMissionChoices)
        {
            // add parallax background
           // me.game.add(new BackgroundObject(), 1);
            console.log("on reset");

            this.line1 = line1;
            this.line2 = line2;
            this.line3 = line3;
            this.missionChoices = nextMissionChoices;

            if(this.missionChoices.length > 1){//!= null){
                console.log(this.missionChoices);
                this.option1 = new Button("missiona", me.state.USER +1, 350);
                this.option2 = new Button("missionb", me.state.USER +1, 400);
            }
            else{
                console.log("no mission choices");
            }

            this.backgroundImage = me.loader.getImage("briefingbackground");

            this.textFont = new me.Font("Verdana", 22, "white","left");



            // enable the keyboard
            me.input.bindKey(me.input.KEY.ENTER, "enter");
            me.input.bindKey(me.input.KEY.A, "a");
            me.input.bindKey(me.input.KEY.B, "b");
        },

        changeToMap: function(mapNum){
            me.gamestat.setValue("mapIndex", String(mapNum));
            var mapIndex = String(me.gamestat.getItemValue("mapIndex"));

            var maxLevel = parseInt(me.gamestat.getItemValue("levelCount"), 10);

            if (mapIndex <= maxLevel) {
                //me.state.change(me.state.PLAY, this.map);
                me.state.change(
                    100,
                    me.gamestat.getItemValue("briefing"+mapIndex)[0],
                    me.gamestat.getItemValue("briefing"+mapIndex)[1],
                    me.gamestat.getItemValue("briefing"+mapIndex)[2],
                    me.gamestat.getItemValue("briefing"+mapIndex)[3]
                );
            } else {
                me.state.change(me.state.GAMEOVER);
            }
        },

        update : function()
        {
             
             if(this.missionChoices.length > 1 ){//!= null){
                
               if (me.input.isKeyPressed('a')){
                    this.changeToMap(this.missionChoices[0]);
               }
               else if (me.input.isKeyPressed('b')){
                    this.changeToMap(this.missionChoices[1]);
               }
            }
            else{

                // enter pressed ?
                if (me.input.isKeyPressed('enter'))
                {
                    var curIndex = parseInt(me.gamestat.getItemValue("mapIndex"), 10);

                    console.log("Updating mapIndex from " + curIndex);
                    //curIndex = curIndex + 1;
                    curIndex = this.missionChoices[0];
                    console.log("to " + curIndex);

                    me.gamestat.setValue("mapIndex", String(curIndex));
                    var mapIndex = String(me.gamestat.getItemValue("mapIndex"));

                    var maxLevel = parseInt(me.gamestat.getItemValue("levelCount"), 10);

                    if (mapIndex <= maxLevel) {
                        //me.state.change(me.state.PLAY, this.map);
                        me.state.change(
                            100,
                            me.gamestat.getItemValue("briefing"+mapIndex)[0],
                            me.gamestat.getItemValue("briefing"+mapIndex)[1],
                            me.gamestat.getItemValue("briefing"+mapIndex)[2],
                            me.gamestat.getItemValue("briefing"+mapIndex)[3]
                        );
                    } else {
                        me.state.change(me.state.GAMEOVER);
                    }


                    
                }
            }


            



            return true;
        },

        draw: function(context)
        {

            me.video.clearSurface(context,"Gray");
            context.drawImage(this.backgroundImage, 0,0);

        // Instruction text
            var instruction1 = "If no mission options: Press 'Enter' ";
            var instruction2 = "Otherwise press 'A' or 'B' ";

            this.i1 = this.textFont.measureText(context,instruction1 ).width;
            this.i2 = this.textFont.measureText(context, instruction2 ).width;

            this.textFont.draw (context, instruction1,     Math.round(me.game.viewport.width/2 - this.i1/2), 75);
            this.textFont.draw (context, instruction2,     Math.round(me.game.viewport.width/2 - this.i2/2), 100);


        //Flavor text
            this.x1 = this.textFont.measureText(context,this.line1).width;
            this.x2 = this.textFont.measureText(context,this.line2).width;
            this.x3 = this.textFont.measureText(context,this.line3).width;

            this.textFont.draw (context, this.line1,     Math.round(me.game.viewport.width/2 - this.x1/2), 200);
            this.textFont.draw (context, this.line2,     Math.round(me.game.viewport.width/2 - this.x2/2), 250);
            this.textFont.draw (context, this.line3,     Math.round(me.game.viewport.width/2 - this.x3/2), 300);


            /*

                Unless we can figure out how to effectively handle the clicking of the button
                  for this case of changing levels this will just not be active

            if(this.missionChoices.length > 1 ){//!= null){
                
                this.option1.draw(context);
                this.option2.draw(context);
            }
            */
        },


        onDestroyEvent: function()
        {

        }
    });
});