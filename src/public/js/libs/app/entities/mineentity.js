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
            settings.type = me.game.ENEMY_OBJECT;
            this.time = 0;

            this.damage = 5;

            this.parent(x, y, settings);

            this.animationList = [];

            for (var i = 0; i < 20; i++) {
                this.animationList[i] = i;
            }

            this.addAnimation("strobe", this.animationList, 1);
            this.setCurrentAnimation("strobe");

            this.setVelocity(0, 0);

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

        },

        removeHealth: function() {
            me.game.remove(this, true);
        }
    });

    return MineEntity;

});