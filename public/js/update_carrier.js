// Get the objects we need to modify
let updateCarrierForm = document.getElementById('update-carrier-form-ajax');

// Modify the objects we need
updateCarrierForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let idCarrierUpdate = document.getElementById("idCarrierUpdate");
    let carrierNameUpdate = document.getElementById("carrierNameUpdate");
    let carrierCountryUpdate = document.getElementById("carrierCountryUpdate");
    let carrierFleetUpdate = document.getElementById("carrierFleetUpdate");
    // Get the values from the form fields

    let idCarrierValue = idCarrierUpdate.value;
    let carrierNameValue = carrierNameUpdate.value;
    let carrierCountryValue = carrierCountryUpdate.value;
    let carrierFleetValue = carrierFleetUpdate.value;

    // Put our data we want to send in a javascript object
    let data = {
        idCarrier: idCarrierValue,
        carrierName: carrierNameValue,
        carrierCountry: carrierCountryValue,
        carrierFleet: carrierFleetValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-carrier-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateCarrierRow(data, idCarrierValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateCarrierRow(data, idCarrier){
    
    let table = document.getElementById("carrier-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == idCarrier) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            
            // Get td of carrier Name
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
            // Reassign carrier Name
            td1.innerHTML = data.carrierName; 

            // Get td of carrier country
            let td2 = updateRowIndex.getElementsByTagName("td")[2];
            // Reassign carrier Country
            td2.innerHTML = data.carrierCountry; 

            // Get td of carrier fleet
            let td3 = updateRowIndex.getElementsByTagName("td")[3];
            // Reassign carrier fleet
            td3.innerHTML = data.carrierFleet; 


       }
    }
}
