function deleteAircraft(aircraftNumber) {
    // Put our data we want to send in a javascript object
    let data = {
        id: aircraftNumber
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-aircraft-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteAircraftRow(aircraftNumber);
            window.location.reload();

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteAircraftRow(aircraftNumber){

    let table = document.getElementById("aircraft-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == aircraftNumber) {
            table.deleteRow(i);
            break;
       }
    }
}



// function deleteAircraft(aircraftNumber) {
//     let link = '/delete-aircraft-ajax/';
//     let data = {
//       id: aircraftNumber
//     };
  
//     $.ajax({
//       url: link,
//       type: 'DELETE',
//       data: JSON.stringify(data),
//       contentType: "application/json; charset=utf-8",
//       success: function(result) {
//         deleteAircraftRow(aircraftNumber);
//       }
//     });
//   }
  
//   function deleteAircraftRow(aircraftNumber){
//       let table = document.getElementById("aircraft-table");
//       for (let i = 0, row; row = table.rows[i]; i++) {
//          if (table.rows[i].getAttribute("data-value") == aircraftNumber) {
//               table.deleteRow(i);
//               break;
//          }
//       }
//   }