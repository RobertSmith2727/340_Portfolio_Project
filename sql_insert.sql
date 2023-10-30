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
--
--
--
--
-- ******************************* INSERT QUERIES ****************************************
--
-- INSERT INTO Carriers
INSERT INTO carriers(carrierName, carrierCountry, carrierFleet, carrierID)
VALUES (:carrierNameInput, :carrierCountryInput, :carrierFleetInputer, carrierIDInput)
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