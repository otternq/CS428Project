var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 5000;

app.listen(port);

console.log("Server running at http://127.0.0.1:"+port+"/");
console.log("To stop the server: CTRL+c");