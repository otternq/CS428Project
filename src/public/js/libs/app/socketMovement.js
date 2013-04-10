define(function() {

  return {
    initialize: function(socket, playerEntity) {

      //var socket = io.connect();

      socket.on('bcast', function(data) {
        alert('data');
      });

      socket.on('up', function() {

        playerEntity.vel.y -= playerEntity.accel.y * me.timer.tick;

        playerEntity.movedByRemote = true;

      });

      socket.on('down', function() {

        console.log('decrease velocity.');
        playerEntity.vel.y += playerEntity.accel.y * me.timer.tick; 

        playerEntity.movedByRemote = true;

      });

      socket.on('stillx', function() {
        playerEntity.vel.x = 0;
        playerEntity.movedByRemote = true;
      });

      socket.on('stillY', function() {

        playerEntity.vel.y = playerEntity.constVelocity;

        playerEntity.movedByRemote = true;

      });

      socket.on('left', function() {

        playerEntity.flipX(true);
        //playerEntity.vel.x -= playerEntity.accel.x * me.timer.tick;
        playerEntity.vel.x = -(playerEntity.accel.x * me.timer.tick);

        playerEntity.movedByRemote = true;

      });

      socket.on('right', function() {

        playerEntity.flipX(false);
        playerEntity.vel.x = playerEntity.accel.x * me.timer.tick;

        playerEntity.movedByRemote = true;

      });

      socket.on('shoot', function() {

        // create a missile entity
        var missile = new ProjectileEntity(playerEntity.pos.x + 15, playerEntity.pos.y - 34,7, "Player");
        me.game.add(missile, playerEntity.z);
        me.game.sort();

        // play sound
        me.audio.play("missile");

      });

      playerEntity.update();

    }
  };

});