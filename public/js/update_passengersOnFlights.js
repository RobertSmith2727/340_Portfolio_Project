// Get the objects we need to modify
let updatePassengersOnFlightsForm = document.getElementById('update-PassengersOnFlights-form-ajax');

// Modify the objects we need
updatePassengersOnFlightsForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let idPassenger = document.getElementById("idPassengerUpdate");
    let flightUpdate = document.getElementById("flightUpdate");
    let seatNumberUpdate = document.getElementById("seatNumberUpdate");
    // Get the values from the form fields

    let idPassengerValue = idPassenger.value;
    let flightValue = flightUpdate.value;
    let seatNumberValue = seatNumberUpdate.value;

    console.log(idPassenger);
    console.log(flightUpdate);
    console.log(seatNumberUpdate);


    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    // TODO:
    // if (isNaN(homeworldValue)) 
    // {
    //     return;
    // }


    // Put our data we want to send in a javascript object
    let data = {
        idPassenger: idPassengerValue,
        flightNumber: flightValue,
        seatNumber: seatNumberValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-passengersOnFlights-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updatePassengersOnFlightsRow(data, idPassengerValue, flightValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updatePassengersOnFlightsRow(data, idPassengerValue, flightValue){
    
    let table = document.getElementById("passengersOnFlights-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == flightValue && table.rows[i + 1].getAttribute("data-value") == idPassengerValue) {

            // Get the location of the row update flt #
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            updateRowIndex.innerHTML = data.flightValue;

            // Get td of idPassenger
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
            // Reassign idPassenger
            td1.innerHTML = data.idPassengerValue; 

            // Get td of seat#
            let td2 = updateRowIndex.getElementsByTagName("td")[2];
            // Reassign seat#
            td2.innerHTML = data.seatNumberValue; 
       }
    }
}
