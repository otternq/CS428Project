var port = process.env.PORT || 5000; // Use the port that Heroku provides or default to 5000


console.log("Listening to port "+ port);

var express = require('express');
var app = express();
var server = app.listen(port);
var io = require('socket.io').listen(server);

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

app.configure(function(){
  app.use(express.static(__dirname + '/public/'));
});


io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });

  socket.on('cor', function (data) {
    console.log(data);
    socket.broadcast.emit("incor", data);
  });

  socket.on('tempClick', function (data) {
    console.log("button clicked:");
    console.log(data);
    socket.emit("data", {click: "You clicked it!"});
    socket.broadcast.emit('bcast', "Hi there");
  });

  socket.on('jump', function() {
    console.log("jumpping!");
    socket.broadcast.emit('jump');
  });

});
