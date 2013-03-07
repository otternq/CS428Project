var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs'),
  url = require('url');

/*io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});*/

var port = process.env.PORT || 5000; // Use the port that Heroku provides or default to 5000
console.log("Listening to port "+ port);

app.listen(port);

function handler (req, res) {

  var url_parts = url.parse(req.url);

  var requestPath = url_parts.pathname;

  var file = "";

  if (requestPath == "/remote.html") {
    file = "/remote.html";
  } else {
    file = "/index.html";
  }

  fs.readFile(__dirname + file,
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

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
  })

});
