// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 4000;                 // Set a port number at the top so it's easy to change in the future



/*


    ROUTES


*/
app.get('/', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.sendFile(__dirname + '/public/index.html')      // This function literally sends the string "The server is running!" to the computer
    });                                         // requesting the web site.
// route index page
app.get('/index', function(req, res)
{
        res.sendFile(__dirname + '/public/index.html')

});

// Routes aircraft page
app.get('/aircraft', function(req, res)
{
        res.sendFile(__dirname + '/public/aircraft.html')

});

// Routes passenger page
app.get('/passengers', function(req, res)
{
        res.sendFile(__dirname + '/public/passengers.html')

});

// Routes carriers
app.get('/carriers', function(req, res)
{
        res.sendFile(__dirname + '/public/carriers.html')

});

// Routes flights
app.get('/flights', function(req, res)
{
        res.sendFile(__dirname + '/public/flights.html')

});




/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
