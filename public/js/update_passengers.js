// Get the objects we need to modify
let updatePassengerForm = document.getElementById('update-passenger-form-ajax');

// Modify the objects we need
updatePassengerForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let idPassengerUpdate = document.getElementById("idPassengerUpdate");
    let passengerNameUpdate = document.getElementById("passengerNameUpdate");
    let isNoFlightListUpdate = document.getElementById("isNoFlightListUpdate");

    // Get the values from the form fields
    let idPassengerValue = idPassengerUpdate.value;
    let passengerNameValue = passengerNameUpdate.value;
    let isNoFlightListValue = isNoFlightListUpdate.value;

    // Put our data we want to send in a javascript object
    let data = {
        idPassenger: idPassengerValue,
        passengerName: passengerNameValue,
        isNoFlightList: isNoFlightListValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-passenger-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updatepassengerRow(data, idPassengerValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updatepassengerRow(data, idpassenger){
    
    let table = document.getElementById("passenger-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == idpassenger) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            
            // Get td of passenger Name
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
            // Reassign passenger Name
            td1.innerHTML = data.passengerName; 

            // Get td of passenger country
            let td2 = updateRowIndex.getElementsByTagName("td")[2];
            // Reassign passenger Country
            td2.innerHTML = data.isNoFlightList;


       }
    }
}