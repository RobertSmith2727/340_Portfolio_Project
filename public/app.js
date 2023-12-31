// App.js

/*
    SETUP- from exploration
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 5654;                 // Set a port number at the top so it's easy to change in the future

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
    });                                                         


// route index page
app.get('/index', function(req, res)
    {  
            res.render('index');                
    });                                                     


// Routes aircraft page and loads data to tables and dropdown
app.get('/aircraft', function(req, res)
{  
    let query1 = "SELECT * FROM aircraft;";               
    let query2 = "SELECT * FROM carriers;";
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
        let query2 = "SELECT * FROM carriers;";
        let query3 = "SELECT * FROM aircraft;";      
        db.pool.query(query1, function(error, flightsRows, fields){
            let flights = flightsRows;
            db.pool.query(query2, function(error, carriersRows, fields){
                let carrierFlights = carriersRows;
                db.pool.query(query3, function(error, aircraftRows, fields){
                    let aircraft = aircraftRows;
                    
                    return res.render('flights', {data: flights, carrierFlights: carrierFlights, aircraft: aircraft});
                });
            
            });
            
        });       
    });

// Routes passengers on flights + gathers table and  dropdown info
app.get('/passengersOnFlights', function(req, res)
{
    let query1 = "SELECT * FROM passengersOnFlights;";
    let query2 = "SELECT * FROM passengers;"
    let query3 = "SELECT * FROM flights;"
    db.pool.query(query1, function(error, PassOnFlightRows, fields){
        let passengersOnFlights = PassOnFlightRows;
        db.pool.query(query2, function(error, passengersRows, fields){
            let passengers = passengersRows;
            db.pool.query(query3, function(error, flightsRows, fields){
                let flights = flightsRows;
                
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
        
        
        //TODO add alert
        if (carrierNameString.length === 0){
            console.log("Carrier name must not be empty");
            
            res.redirect('/carriers');
        }
        
        else{
            query1 = `INSERT INTO carriers(carrierName, carrierCountry, carrierFleet) VALUES ('${data['carrierNameInput']}', '${data['carrierCountryInput']}', '${data['carrierFleetInput']}')`;
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


// Flights Post
app.post('/addFlightsForm', function(req,res){
        let data = req.body;
        // let aircraftNumber = data.aircraftInput;
        // let flightNumber = data.flightNumberInput;
        // let arrivalTime = data.arrivalTimeInput;
        // let departTime = data.departureTimeInput;
        // let totalPassengers = data.totalPassengersInput

        query1 = `INSERT INTO flights( aircraftNumber, flightNumber, arrivalTime, departureTime, totalPassengers) VALUES ('${data['aircraftInput']}', '${data['flightNumberInput']}','${data['arrivalTimeInput']}','${data['departureTimeInput']}','${data['totalPassengersInput']}')`;

        db.pool.query(query1, function(error, rows, fields){
            if (error) {
                // Log the error to the terminal 
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                res.redirect('/flights');
            }

        })

});

// add PassengersOnFlights
app.post('/addPassengersOnFlightsForm', function(req, res){
    let data = req.body;

    query1 = `INSERT INTO passengersOnFlights(flightNumber, idPassenger, passengerSeatNumber) VALUES ('${data['flightInput']}', '${data['idPassengerInput']}', '${data['seatNumberInput']}')`;

    db.pool.query(query1, function(error, rows, fields){
        if (error){
            console.log(error)
            res.sendStatus(400);
        }
        else{
            res.redirect('/passengersOnFlights');
        }

    });
});


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


/*

----------------------------------UPDATE ROUTES------------------------------------

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
    
  
          // Run the 1st query
          db.pool.query(queryUpdateAircraft, function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal
              console.log(error);
              res.sendStatus(400);
              }
              // if success 
              if (res.status != 400) {
                res.send(rows);
              }
              else {
                res.redirect('/aircraft');
              }
             
  })});


  // update carrier 
app.put('/put-carrier-ajax', function(req,res,next){
    let data = req.body;
  
    let idCarrier = parseInt(data.idCarrier);
    let carrierName = String(data.carrierName);
    let carrierCountry = String(data.carrierCountry);
    let carrierFleet = parseInt(data.carrierFleet);
    

    let queryUpdateCarrier = "UPDATE carriers SET carrierName = '" + carrierName +"', carrierCountry= '" + carrierCountry +"', carrierFleet= '" + carrierFleet +"' WHERE idCarrier = '"+ idCarrier +"'";
    
  
          // Run the 1st query
          db.pool.query(queryUpdateCarrier, function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal
              console.log(error);
              res.sendStatus(400);
              }
              // if success 
              if (res.status != 400) {
                res.send(rows);
              }
              else {
                res.redirect('/carriers');
              }
             
  })});


  // Update PassengersOnFlights
app.put('/put-passengersOnFlights-ajax', function(res,req, next){
        data = req.body;

        let idPassengerValue = parseInt(data.idPassenger);
        let flightValue = String(data.flightNumber);
        let seatNumberValue = String(data.seatNumber);

        query1 = "UPDATE passengersOnFlights SET idPassenger = '" + idPassengerValue +"', flightNumber = '" + flightValue + "', passengerSeatNumber = '" + seatNumberValue + "'" + `WHERE flightNumber = '${data['flightUpdate']}' and idPassenger = '${data['idPassengerUpdate']}')`;
        
        db.pool.query(query1, function(error, rows, fields){
            if(error){
                console.log(error)
                res.sendStatus(400);
            }
            if (res.status != 400) {
                res.send(rows);
            }
            else {
                res.redirect('/passengersOnFlights');
              }
        });
});


/*
-------------------------------------Delete Routes--------------------------------------
*/

// delete Aircraft 
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
              
              else {
                res.sendStatus(204);
              }
  })});


  // delete carrier
  app.delete('/delete-Carrier-ajax/', function(req, res, next){
    let data = req.body;
    let idCarrier = String(data.id);
    query1 = `DELETE FROM carriers WHERE idCarrier = '` + String(idCarrier)+ "'";
        
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


  app.delete('/delete-passengersOnFlights-ajax/', function(req, res, next){
    let data = req.body;
    let flightNumber = String(data.flightNumber);
    let idPassenger = String(data.idPassenger);
    let query1 = `DELETE FROM passengersOnFlights WHERE flightNumber = '`+ String(flightNumber)+ "' and idPassenger = '" + String(idPassenger)+ "'";
        db.pool.query(query1, function(error, rows, fields){
            if(error){
                console.log(error)
                res.sendStatus(400);

            }
            else{
                res.sendStatus(204);
            }
        });
  });
   

  
  // delete passenger
  app.delete('/delete-passenger-ajax/', function(req,res,next){
    let data = req.body;
    let idPassenger = String(data.id);
    let query1 = `DELETE FROM passengers WHERE idPassenger = '` + String(idPassenger)+ "'";
  
  
          // Run the 1st query
          db.pool.query(query1, function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else
              {
                res.sendStatus(204)
              }
  })});

  // delete flight
  app.delete('/delete-flight-ajax/', function(req,res,next){
    let data = req.body;
    let flightNumber = parseInt(data.id);
    let query1 = `DELETE FROM flights WHERE flightNumber = ?`;
  
  
          // Run the 1st query
          db.pool.query(query1, [flightNumber], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                res.sendStatus(204);
              }
  })});
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
