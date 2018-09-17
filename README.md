TITLE : pirple-homework-1

PLEASE NOTE : This exercise is part of pirple.com's NODE.JS course, section 2.

**** Little overview of the code :

The purpose of this code is to return a 406 response code with a HELLO WORLD!!! message to the client when the user tries navigating to the localhost:3000/hello route.

If the user navigates to any other route, they'll be prompted with a 404 response code and an Error Message, suggesting they try localhost:3000/hello instead.





** The code comes from the 'Starting a Server', 'Parsing Request Paths', and 'Routing Requests' videos.

*** The only change i had to do to make it work was to change this bit of code from this :


      // Use the Payload called by the handler, or default to empty object
      payload = typeof(payload) == 'object' ? payload : {};

      // Convert the payload to a String
      var payloadString = JSON.stringify(payload);

      // Send the Response
      res.writeHead(statusCode);
      res.end(payloadString);

*** To this :

      // Use the Payload called by the handler, or default to null
      payload = typeof(payload) == 'string' ? payload : null;

      // Send the Response
      res.writeHead(statusCode);
      res.end(payload);


*** Since we deleted the payloadString variable, don't forget to change it everywhere else !


*** As for the Handlers, since we changed the payload type from object to string, we can now put a string as data. This is what it looks like :

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
