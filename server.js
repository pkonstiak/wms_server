var express = require("express");
var server = express();
var path=require('path');
var PORT=3003;




server.get("/wms", function(request, response) {
  var params=request.query;
    console.log(params);

    if(params.service=== 'wms' && params.request === 'GetCapabilities' ){
      response.sendFile(path.join(__dirname, 'XML_cesty_budovy.xml'))

    }

    else if (params.service=== 'wms' && params.request === 'GetCapabilities' ){            
      console.log('idem robit get capa')
    } else {
      response.send('nejdem robit get capa')
    }
    
  
  });



server.listen(PORT, function() {
    console.log("Server listening on port " + PORT + "!");
  });