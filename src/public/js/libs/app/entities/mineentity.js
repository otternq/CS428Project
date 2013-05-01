/**
 * Mine Entity
 */

define([
    'explosionanimation'
], function(ExplosionAnimation) {

    var MineEntity = me.ObjectEntity.extend({
        init: function(x,y)
        {

            var settings = {};
            settings.image = "mine";
            settings.spritewidth = 84;
            settings.spriteheight = 84;
            settings.collidable = true;
            settings.type = "mine";
            this.time = 0;

            this.damage = 5;

            this.parent(x, y, settings);


        },

        update: function()
        {
            
        },

        remove: function()
        {

            // remove this entity
            me.game.remove(this, true);

            // play sound
            //me.audio.play("implosion");

            // init implosion
            var implosion = new ExplosionAnimation(this.pos.x, this.pos.y);
            me.game.add(implosion, 15);
            me.game.sort();

        }
    });

    return MineEntity;

});