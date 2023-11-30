// App.js

/*
    SETUP- from exploration
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 5308;                 // Set a port number at the top so it's easy to change in the future

// app.js
app.use(express.static(__dirname +"/public/"));

// Database- from exploration
var db = require('./database/db-connector')

// app.js- from exploration

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.



// app.js - SETUP section- from exploration

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))



/*

----------------------------------------PAGE ROUTES--------------------------------------------

*/





app.get('/', function(req, res)
    {  
        res.render('index');         
    });                                                         // received back from the query
// app.get('/', function(req, res)
//     {
//         res.render('./index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
//     });                                         // will process this file, before sending the finished HTML to the client.


// route index page
app.get('/index', function(req, res)
    {  
            res.render('index');                
    });                                                     


// Routes aircraft page and loads data to tables and dropdown
app.get('/aircraft', function(req, res)
{  
    let query1 = "SELECT * FROM aircraft;";               
    let query2 = "SELECT * FROM carriers;"
    db.pool.query(query1, function(error, aircraftRows, fields){    // 
        let aircraft = aircraftRows;
        db.pool.query(query2, function(error, carrierRows, fields){
            let carriershbs = carrierRows;
        
            return res.render('aircraft', {data: aircraft, carriershbs: carriershbs}); 
        });                 
    })                                                      
});  

// Routes passenger page
app.get('/passengers', function(req, res)
{  
    let query1 = "SELECT * FROM passengers;";               
    
    db.pool.query(query1, function(error, rows, fields){    // 
        
        res.render('passengers', {data: rows});                  
    })                                                      
});  



// Routes carriers
app.get('/carriers', function(req, res)
{
    let query1 = "SELECT * FROM carriers;";

    db.pool.query(query1, function(error,rows,fields){
        res.render('./carriers', {data: rows});
    })
        

});

// Routes flights
app.get('/flights', function(req, res)
{       
        let query1 = "SELECT * FROM flights;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('./flights', {data: rows});
        })
        
})

// Routes passengers on flights + gathers table and  dropdown info
app.get('/passengersOnFlights', function(req, res)
{
    let query1 = "SELECT * FROM passengersOnFlights;";
    let query2 = "SELECT * FROM passengers;"
    let query3 = "SELECT * FROM flights;"
    db.pool.query(query1, function(error, PassOnFlightRows, fields){
        let passengersOnFlights = PassOnFlightRows
        db.pool.query(query2, function(error, passengersRows, fields){
            let passengers = passengersRows
            db.pool.query(query3, function(error, flightsRows, fields){
                let flights = flightsRows
                
                return res.render('passengersOnFlights', {data: passengersOnFlights, passengers: passengers, flights: flights});
            });
            
        });
        
    });       
});


/*

--------------------------------------POST ROUTES----------------------------------------

*/

// add aircraft post

app.post('/addAircraftForm', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    

    // Create the query and run it on the database
    query1 = `INSERT INTO aircraft(aircraftNumber,aircraftType, aircraftOperatingHours, aircraftCapacity, aircraftManufacturer, idcarrier)
    VALUES ('${data['aircraftNumberInput']}','${data['aircraftTypeInput']}','${data['operatingHoursInput']}','${data['capacityInput']}','${data['manufacturerInput']}', '${data['carrierInput']}')`;
    
    db.pool.query(query1, function(error, rows, fields){
       
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal
            console.log(error)
            res.sendStatus(400);
        }

        else
        {
            res.redirect('/aircraft');
        }
    })
})



// Add passenger post
app.post('/addPassengerForm', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    

    // Create the query and run it on the database
    query1 = `INSERT INTO passengers(name, isNoFlightList)
    VALUES ('${data['nameInput']}','${data['isNoFlightListInput']}')`;
    
    db.pool.query(query1, function(error, rows, fields){
       
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal 
            console.log(error)
            res.sendStatus(400);
        }

        else
        {
            res.redirect('/passengers');
        }
    })
});


// add carriers post
app.post('/addCarrierForm', function(req,res){
        let data = req.body;
        let carrierCountry = String(data.carrierCountryInput)
        let carrierNameString = String(data.carrierNameInput)
        
        if (carrierCountry.length === 0){
            carrierCountry = 'NULL'
        }
        
        if (carrierNameString.length === 0){
            console.log("Carrier name must not be empty");
            
            res.redirect('/carriers');
        }
        
        else{
            query1 = `INSERT INTO carriers(carrierName, carrierCountry, carrierFleet) VALUES ('${data['carrierNameInput']}', '${carrierCountry}', '${data['carrierFleetInput']}')`;
            db.pool.query(query1, function(error, rows, fields){
            // Check to see if there was an error
                if (error) {

                    // Log the error to the terminal 
                    console.log(error)
                    res.sendStatus(400);
                }

                else
                {
                    res.redirect('/carriers');
                }
        })
}});

// TODO: Add passengersOnFlights Post

// TODO: Add flights Post






/*

------------------------------------UPDATE ROUTES--------------------------------------

*/

// update aircraft 
app.put('/put-aircraft-ajax', function(req,res,next){
    let data = req.body;
  
    let aircraftNumber = String(data.aircraftNumber);
    let aircraftType = String(data.aircraftType);
    let operatingHours= parseInt(data.operatingHours);
    let capacity = parseInt(data.capacity);
    let manufacturer = String(data.manufacturer);
    let idCarrier = parseInt(data.idCarrier)

    let queryUpdateAircraft = "UPDATE aircraft SET aircraftType = '" + aircraftType +"', aircraftOperatingHours = '" + operatingHours +"', aircraftCapacity = '" + capacity +"', aircraftManufacturer = '" + manufacturer +"', idCarrier = '" + idCarrier +"' WHERE aircraftNumber = '"+ String(aircraftNumber) +"'";
    let selectCarrier = `SELECT * FROM bsg_planets WHERE id = ?`
  
          // Run the 1st query
          db.pool.query(queryUpdateAircraft, function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal
              console.log(error);
              res.sendStatus(400);
              }
              if (res.status != 400) {
                res.send(rows);
              }
              else {
                res.redirect('./aircraft');
              }
            
  })});



/*
-------------------------------------Delete Routes--------------------------------------
*/

app.delete('/delete-aircraft-ajax/', function(req, res, next){
    let data = req.body;
    let aircraftNumber = String(data.id);
    query1 = `DELETE FROM aircraft WHERE aircraftNumber = '` + String(aircraftNumber)+ "'";
        
          // Run the 1st query
          db.pool.query(query1, function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else{
              res.sendStatus(204);
              } 
  })});






/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
