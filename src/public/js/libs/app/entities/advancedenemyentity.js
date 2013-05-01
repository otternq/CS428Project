define([
    'enemyentity',
    'projectileentity',
    'explosionanimation'
], function(EnemyEntity, ProjectileEntity, ExplosionAnimation) {

    return EnemyEntity.extend({

        init: function(x,y)
        {

            var settings = {};
            settings.image = "advancedenemy";

            this.parent(x,y, settings);
            this.health = 2;
            this.points = 15;

            //this.image = "advancedenemy";
        },

        fire: function() {

            var missile1 = new ProjectileEntity(this.pos.x + 30, this.pos.y + this.height + 10, -3,"Enemy");
            missile1.damage++;

            var missile2 = new ProjectileEntity(this.pos.x, this.pos.y + this.height + 10, -3,"Enemy");
            missile2.damage++;

            me.game.add(missile1, 10);
            me.game.add(missile2, 10);

            me.game.sort();
        }
    });

});