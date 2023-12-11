
// Get the objects we need to modify
let updateAircraftForm = document.getElementById('update-aircraft-form-ajax');

// Modify the objects we need
updateAircraftForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let aircraftNumberUpdate = document.getElementById("aircraftNumberUpdate");
    let aircraftTypeUpdate = document.getElementById("aircraftTypeUpdate");
    let operatingHoursUpdate = document.getElementById("operatingHoursUpdate");
    let capacityUpdate = document.getElementById("capacityUpdate");
    let manufacturerUpdate = document.getElementById("manufacturerUpdate");
    let idCarrierUpdate = document.getElementById("idCarrierUpdate");
    // Get the values from the form fields

    let aircraftNumberValue = aircraftNumberUpdate.value;
    let aircraftTypeValue = aircraftTypeUpdate.value;
    let operatingHoursValue = operatingHoursUpdate.value;
    let capacityValue = capacityUpdate.value;
    let manufacturerValue = manufacturerUpdate.value;
    let carrierValue = idCarrierUpdate.value;

    // Put our data we want to send in a javascript object
    let data = {
        aircraftNumber: aircraftNumberValue,
        aircraftType: aircraftTypeValue,
        operatingHours: operatingHoursValue,
        capacity: capacityValue,
        manufacturer: manufacturerValue,
        idCarrier: carrierValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-aircraft-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(data, aircraftNumberValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, aircraftNumber){
    
    let table = document.getElementById("aircraft-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == aircraftNumber) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            
            // Get td of aircraft Type
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
            // Reassign aircraft Type to our value we updated to
            td1.innerHTML = data.aircraftType; 

            // Get td of aircraft operating Hours
            let td2 = updateRowIndex.getElementsByTagName("td")[2];
            // Reassign aircraft Type to our value we updated to
            td2.innerHTML = data.operatingHours; 

            // Get td of aircraft capacity
            let td3 = updateRowIndex.getElementsByTagName("td")[3];
            // Reassign aircraft Type to our value we updated to
            td3.innerHTML = data.capacity; 

            // Get td of aircraft manufacturer
            let td4 = updateRowIndex.getElementsByTagName("td")[4];
            // Reassign aircraft Type to our value we updated to
            td4.innerHTML = data.manufacturer; 

            // Get td of aircraft manufacturer
            let td5 = updateRowIndex.getElementsByTagName("td")[5];
            // Reassign aircraft Type to our value we updated to
            td5.innerHTML = data.idCarrier;

       }
    }
}
