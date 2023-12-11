
// Get the objects we need to modify
let updateFlightForm = document.getElementById('update-flight-form-ajax');

// Modify the objects we need
updateFlightForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let flightNumberUpdate = document.getElementById("flightNumberUpdate");
    let arrivalTimeUpdate = document.getElementById("arrivalTimeUpdate");
    let departureTimeUpdate = document.getElementById("departureTimeUpdate");
    let totalPassengersUpdate = document.getElementById("totalPassengersUpdate");
    // Get the values from the form fields

    let flightNumberValue = flightNumberUpdate.value;
    let arrivalTimeValue = arrivalTimeUpdate.value;
    let departureTimeValue = departureTimeUpdate.value;
    let totalPassengersValue = totalPassengersUpdate.value;

    // Put our data we want to send in a javascript object
    let data = {
        flightNumber: flightNumberValue,
        arrivalTime: arrivalTimeValue,
        departureTime: departureTimeValue,
        totalPassengers: totalPassengersValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-flight-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(data, flightNumberValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, flightNumber){
    
    let table = document.getElementById("aircraft-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == flightNumber) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            
            // Get td of aircraft manufacturer
            let td4 = updateRowIndex.getElementsByTagName("td")[1];
            // Reassign aircraft Type to our value we updated to
            td4.innerHTML = data.flightNumber; 

            // Get td of aircraft Type
            let td1 = updateRowIndex.getElementsByTagName("td")[2];
            // Reassign aircraft Type to our value we updated to
            td1.innerHTML = data.arrivalTime; 

            // Get td of aircraft operating Hours
            let td2 = updateRowIndex.getElementsByTagName("td")[3];
            // Reassign aircraft Type to our value we updated to
            td2.innerHTML = data.departureTime; 

            // Get td of aircraft capacity
            let td3 = updateRowIndex.getElementsByTagName("td")[4];
            // Reassign aircraft Type to our value we updated to
            td3.innerHTML = data.totalPassengers; 

            

       }
    }
}
