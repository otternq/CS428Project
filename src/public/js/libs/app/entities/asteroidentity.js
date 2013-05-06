define([
    'explosionanimation'
], function(ExplosionAnimation) {

    var AsteroidEntity = me.ObjectEntity.extend({
        init: function(x,y)
        {

            var settings = {};
            settings.image = "asteroid";
            settings.spritewidth = 32;
            settings.spriteheight = 32;
            settings.collidable = true;

            this.ratio = 0;

            settings.type = me.game.ENEMY_OBJECT; //asteroid
            this.time = 0;

            this.parent(x, y, settings);

            this.animationList = [];

            for (var i = 0; i < 30; i++) {
                this.animationList[i] = i;
            }

            this.addAnimation("spinning", this.animationList, Math.random());
            this.setCurrentAnimation("spinning");

            this.ratio = Math.random() * (1.25);

            this.health = 2;

            if (this.ratio < 0.25) {
                this.ratio = 0.25;
                this.health = 1;
            }

            this.damage = Math.ceil(this.ratio * 5);

            this.resize(this.ratio);

            this.gravity = 0;

            this.direction = 1;

            var scale = (Math.random() * 2) - 1;

            if (scale >= 0) {
                this.direction = 1;
            } else {
                this.direction = -1;
            }

            this.setVelocity((Math.random() * 2) - Math.random(), 0);



        },

        update: function()
        {
            if (this.inViewport === true) {
                this.parent(this);

                this.vel.y += this.direction * this.accel.y * me.timer.tick;
                this.vel.x += this.direction * this.accel.x * me.timer.tick;

                this.computeVelocity(this.vel);
                this.pos.add(this.vel);
            }
        },
        removeHealth: function(damage) {


            this.health = this.health - damage;

            // play sound
            //me.audio.play("implosion");

            // init implosion
            var explosion = new ExplosionAnimation(this.pos.x, this.pos.y);
            me.game.add(explosion, 15);
            me.game.sort();

            if (this.health <= 0) {
                me.game.remove(this, true);
            }


        },

        remove: function()
        {

            // remove this entity
            me.game.remove(this, true);

            // play sound
            //me.audio.play("implosion");

            // init implosion
            var implosion = new ExplosionAnimation(this.pos.x, this.pos.y);
            me.game.add(explosion, 15);
            me.game.sort();

        }
    });

    return AsteroidEntity;

});