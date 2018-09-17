/* HELLOOOOOOOOOOO PEOPLE OF THE WORLD!!!
* BRACEEEE YOUUURRSELVESSSSS
* AS WE ARE ABOUT TO DO SOME CRAZY SH*T
*/

// Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

// The server should respond to all requests with HELLO WORLD!!!
var server = http.createServer(function(req,res){

  // Get the Url and Parse it
  var parsedUrl = url.parse(req.url,true);

  // Get the Path
  var path = parsedUrl.pathname;
  var trimmedPath = req.url.replace(/^(\/+)|(\/+)$/g,'');
console.log('the path is: '+trimmedPath);

  // Get the payload
  var decoder = new StringDecoder('utf-8');
  var buffer = '';
  req.on('data',function(data){
    buffer += decoder.write(data);
  });
  req.on('end',function(){
    buffer += decoder.end();
  });

  // Choose the Handler
  var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

  // Construct the data object to send to the handler
  var data = {
    'trimmedPath' : trimmedPath,
    'payload': buffer
  };

  // Route the data to chosenHandler
  chosenHandler(data,function(statusCode, payload){
      // Use the Status Code called back by the handler, or default to 200
      statusCode = typeof(statusCode)  == 'number' ? statusCode : 200;

      // Use the Payload called by the handler, or default to null
      payload = typeof(payload) == 'string' ? payload : null;

      // Send the Response
      res.writeHead(statusCode);
      res.end(payload);

      // Log Response
      console.log('Returning this: ', statusCode, payload);
  });
});

// Launch the server and listen on port 3000
server.listen(3000, function(){
  console.log('The server is LIVE. It is listening on port 3000');
});

// Define the Handlers
var handlers = {};

  // Hello Handler
  handlers.hello = function(data,callback){
  callback(406, "HELLO WORLD!!!");
  };

  // Not Found Handler
  handlers.notFound = function(data,callback){
  callback(404, "The path you entred is invalid. Try localhost:3000/hello instead ! ");
  };

// Create a Router
var router = {
  'hello' : handlers.hello
};
