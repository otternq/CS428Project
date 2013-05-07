define([
    'enemyentity',
    'projectileentity',
    'explosionanimation'
], function(EnemyEntity, ProjectileEntity, ExplosionAnimation) {

    return EnemyEntity.extend({

        init: function(x,y)
        {

            var settings = {};
            settings.spritewidth = 48;
            settings.spriteheight = 48;
            settings.image = "advancedenemy";

            this.parent(x,y, settings);
            this.health = 2;
            this.points = 15;

            //this.image = "advancedenemy";
        },

        fire: function() {

            var missile1 = new ProjectileEntity(this.pos.x + 30, this.pos.y + this.height + 10, -3,"AdvancedEnemy");
            //missile1.damage++;

            var missile2 = new ProjectileEntity(this.pos.x, this.pos.y + this.height + 10, -3,"AdvancedEnemy");
           // missile2.damage++;

            me.game.add(missile1, 10);
            me.game.add(missile2, 10);

            me.game.sort();
        },
        update: function()
        {

            // call parent constructor
            this.parent(this);

            // calculate velocity
            this.vel.y += this.accel.y * me.timer.tick;

            if(this.inViewport === true){
                this.startCounter = true;
                if ( (this.time) % 70 == 0) {
                    this.fire();
                }
            }

            this.time++;

            if(this.startCounter === true)
                this.lifespan++;

            
            if(this.lifespan == 400 )
                me.game.remove(this);

            

            // check & update missile movement
            this.computeVelocity(this.vel);
            this.pos.add(this.vel);

            return true;
        }
    });

});