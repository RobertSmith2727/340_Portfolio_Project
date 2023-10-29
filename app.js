// App.js

/*
    SETUP
*/
var express = require('express');   // Unodesing the express library for the web server
var app     = express();            // Instantiate an express object to interact with the server
PORT        = 4000;                 // Set a port number



// Database
var db = require('./database/db-connector')
/*
    ROUTES
*/
app.get('*', function(req, res)  
    {
        res.sendFile('index.html', {root: 'public'});
        

    });                                         // requesting the web site.

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

// app.js 

