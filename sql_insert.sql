-- ******************************* SELECT QUERIES ****************************************
--
--
--
--
-- SELECT all Carriers
select * FROM carriers;

-- SELECT all Passengers
select * FROM passengers;

-- SELECT all aircraft
select * FROM aircraft;

-- SELECT all flights
select * FROM flights;

-- SELECT all passengersOnFlights
select * from passengersOnFlights;

-- SELECT all passenger on specific flight number
select flightNumber, passengers.idPassenger, passengers.name, passengerSeatNumber FROM passengersOnFlights
JOIN passengers on passengersOnFlights.idPassenger = passengers.idPassenger and flightNumber = :flightNumberInput;

-- SELECT all flights with a specific passenger on it
select flightNumber, passengers.idPassenger, passengers.name, passengerSeatNumber FROM passengersOnFlights
JOIN passengers on passengersOnFlights.idPassenger = passengers.idPassenger and passengersOnFlights.idPassenger= 1;
--
--
--
--
-- ******************************* INSERT QUERIES ****************************************
--
-- INSERT INTO Carriers
INSERT INTO carriers(carrierName, carrierCountry, carrierFleet, carrierID)
VALUES (:carrierNameInput, :carrierCountryInput, :carrierFleetInput, carrierIDInput)
--
-- INSERT INTO Passengers
INSERT INTO passengers(name, isNoFlyList)
VALUES (:nameInput, :isNoFlyListInput)
--
-- INSERT INTO Aircraft
INSERT INTO aircraft(aircraftType, aircraftOperatingHours, aircraftCapacity, aircraftManufacturer)
VALUES (:aircraftTypeInput, :aircraftOperatingHoursInput, :aircraftCapacityInput, :aircraftManufacturerInput)
--
-- INSERT INTO Flights
INSERT INTO flights(arrivalTime, departureTime, totalPassengers, idCarrier, aircraftNumber)
VALUES (:arrivaleTimeInput, :departureTimeInput, :totalPassengersInput, :idCarrierInput, :aircraftNumberInput)
--
-- ******************************* UPDATE QUERIES ****************************************
--
--
--
--
-- UPDATE Carriers
UPDATE carriers SET carrierName = :carrierNameInput, carrierCountry= :carrierCountryInput, carrierFleet= :carrierFleetInput WHERE carrierId = :carrierIdUpdateInput

-- UPDATE Passengers
UPDATE passengers SET name = :nameInput, isNoFlyList = : isNoFlyListInput WHERE idPassenger = :idPassengerUpdateInput

-- UPDATE aircraft
UPDATE aircraft SET aircraftType = :aircraftTypeInput, aircraftOperatingHours = :aircraftOperatingHoursInput, aircraftCapacity = :aircraftCapacityInput, aircraftManufacturer = :aircraftManufacturerInput, idCarrier = :idCarrierInput, WHERE aircraftNumber = :aircraftNumberUpdateInput

--UPDATE Flights
UPDATE flights SET arrivalTime = ;arrivalTimeInput, departureTime = departureTime;departureTimeInput, totalPassengers = :totalPassengersInput, idCarrier = :idCarrierInput, aircraftNumber = :aircraftNumberInput WHERE flightNumber = :flightNumberUpdateInput

--UPDATE passenger on passengersOnFlights
UPDATE passengersOnFlights SET idPassenger = :idPassengerInput WHERE flightNumber = :flightNumberUpdateInput

--UPDATE flight on passengersOnFlights
UPDATE passengersOnFlights SET flightNumber = :flightNumberInput WHERE idPassenger = :idPassengerInput
--
--
--
--
-- ******************************* DELETE QUERIES ****************************************
--
--
--
--
--DELETE Carriers
DELETE FROM carriers WHERE idCarrier = :idCarrierInput

--DELETE Passengers
DELETE FROM passengers WHERE idPassenger = :idPassengerInput

--DELETE Aircraft
DELETE FROM aircraft WHERE aircraftNumber = :aircraftNumberInput

--DELETE Flights
DELETE FROM flights WHERE flightNumber = :flightNumberInput

--DELETE Flight on PassengersOnFlights
DELETE FROM passengersOnFlights WHERE flightNumber = :flightNumberInput

--DELETE Passenger on PassengersOnFlights
DELETE FROM passengersOnFlights WHERE idPassenger = :idPassengerInput
-- SELECT all Passengers on flights
select * FROM passengersOnFlights



