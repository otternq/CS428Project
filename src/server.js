var port = process.env.PORT || 5000; // Use the port that Heroku provides or default to 5000


console.log("Listening to port "+ port);

var express = require('express');
var app = express();
var server = app.listen(port);
var io = require('socket.io').listen(server);


/*io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 5); 
});*/



app.configure(function(){
  app.use(express.static(__dirname + '/public/'));
});


var room = io.of('/room').on('connection', function (socket) {

  var room = null;

  socket.on('start', function (data) {
    socket.join(data.playerId);
  });

  socket.on('up', function(data) {
    //console.log("up");
    socket.broadcast.to(room).emit("up", {});
  });

  socket.on('down', function(data) {
    //console.log("down");
    socket.broadcast.to(room).emit("down", {});
  });

  socket.on('left', function(data) {
    //console.log("left");
    socket.broadcast.to(room).emit("left", {});
  });

  socket.on('right', function(data) {
    //console.log("right");
    socket.broadcast.to(room).emit("right", {});
  });

  socket.on('stillx', function(data) {
    socket.broadcast.to(room).emit("stillx", {});
  });

  socket.on('shoot', function() {
    //console.log("shooting!");
    socket.broadcast.to(room).emit('shoot', {});
  });

});
