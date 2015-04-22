var r = require('request');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  r('http://photorank-best.tumblr.com/api/read/json', function (error, externalresponse, body) {
     if (!error && externalresponse.statusCode == 200) {
        response.send(body) // Show the HTML for the Google homepage.
     } else {
        response.send("var tumblr_api_read={};");
     }
  })
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
