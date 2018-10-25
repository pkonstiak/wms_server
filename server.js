var express = require("express");
var server = express();
var path=require('path');
var PORT=3000;

server.get("/getCababilities", function(request, response) {
    console.log(request.query);
    response.send(request.query);
  });



server.listen(PORT, function() {
    console.log("Server listening on port " + PORT + "!");
  });