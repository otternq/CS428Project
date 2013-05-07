define(function(){
    return me.AnimationSheet.extend({
        init: function(x, y, bossType)
        {

            if (bossType == 0) {//big boss
                // call parent constructor
                var image = me.loader.getImage("BossExplosion");
                this.parent(x, y, image, 600, 277);
            } else {//small boss
                // call parent constructor
                var image = me.loader.getImage("BossExplosion");
                this.parent(x, y, image, 600, 277);
            }
            

            // add animation with all sprites
            this.addAnimation("e", null, 0.05);

            // set animation
            var result = this.setCurrentAnimation("e", function() {
                me.game.remove(this);
                me.game.sort();
            });

            //alert(result);
        }
    });
});