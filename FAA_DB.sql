-- Disable foreign key checks and autocommit as recommended in assignment doc
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS passengersOnFlights;
DROP TABLE IF EXISTS flights;
DROP TABLE IF EXISTS aircraft;
DROP TABLE IF EXISTS passengers;
DROP TABLE IF EXISTS carriers;


--################################ Create Table Section #############################
--Creates passengers table
CREATE TABLE passengers(
    idPassenger int auto_increment unique not null,
    name varchar(175) not null,
    isNoFlightlist int(1) not null,
    primary key (idPassenger)
);

--Creates carriers table
CREATE TABLE carriers(
    idCarrier int auto_increment unique not null,
    carrierName varchar(200) not null,
    carrierCountry varchar(150),
    carrierFleet int,
    primary key (idCarrier)
);

--Creates aircraft table
CREATE TABLE aircraft(
    aircraftNumber varchar(30) unique not null,
    aircraftType varchar(150)not null,
    aircraftOperatingHours int not null,
    aircraftCapacity int not null,
    aircraftManufacturer varchar(150),
    idCarrier int,
    primary key(aircraftNumber),
    foreign key(idCarrier) references carriers(idCarrier) on delete set null
);

--Creates flights table
CREATE TABLE flights(
    flightNumber varchar(20) unique not null,
    arrivalTime datetime not null,
    departureTime datetime not null,
    totalPassengers int not null,
    aircraftNumber varchar(30),
    primary key(flightNumber),
    foreign key(aircraftNumber) references aircraft(aircraftNumber) on delete restrict
);

--Creates passengersOnFlights table
CREATE TABLE passengersOnFlights(
    flightNumber varchar(30),
    idPassenger int,
    passengerSeatNumber varchar(10) not null,
    primary key(flightNumber, idPassenger),
    foreign key(flightNumber) references flights(flightNumber) on delete restrict,
    foreign key(idPassenger) references passengers(idPassenger) on delete restrict
);


--################################## Insert Section ##################################
-- inserts into passengers
INSERT INTO passengers(
    name,
    isNoFlightlist
)
VALUES
(
    'Patrick Star',
    '0'
),
(
    'Sandy Cheeks',
    '0'
),
(
    'Dirty Dan',
    '1'
),
(
    'Smitty Werbenjagermanjensen',
    '0'
),
(
    'Perch Perkins',
    '0'
);

-- inserts into carriers
INSERT INTO carriers(
    carrierName,
    carrierCountry,
    carrierFleet
)
VALUES 
(
    'Delta',
    'USA',
    '55'
),
(
    'Trans World Airlines',
    'USA',
    '12'
),
(
    'Plain Planes',
    'Japan',
    '33'
);

-- inserts into aircraft
INSERT INTO aircraft(
    aircraftType,
    aircraftOperatingHours,
    aircraftCapacity,
    aircraftManufacturer,
    aircraftNumber,
    idCarrier
)
VALUES
(
    'B737-900',
    '255',
    '189',
    'Boeing',
    'N3296',
    (SELECT idCarrier FROM carriers WHERE carrierName='Delta')

),
(
    'L-049',
    '3761',
    '51',
    'Lockheed Martin',
    'N8203',
    (SELECT idCarrier FROM carriers WHERE carrierName='Trans World Airlines')

),
(
    'A-320',
    '1250',
    '155',
    'Airbus',
    'N4203',
    (SELECT idCarrier FROM carriers WHERE carrierName='Plain Planes')
),
(
    'The Flying Dutchman',
    '100000',
    '100',
    'Davy Jones',
    'D2425',
    (SELECT idCarrier FROM carriers WHERE carrierName='Plain Planes')
),
(
    'B-707',
    '2300',
    '189',
    'Boeing',
    'N1230',
    (SELECT idCarrier FROM carriers WHERE carrierName='Trans World Airlines')
);

-- inserts into flights
INSERT INTO flights(
    flightNumber,
    arrivalTime,
    departureTime,
    totalPassengers,
    aircraftNumber

)
VALUES
(
    'DL 1615',
    '2023-10-27 11:51',
    '2023-10-27 7:10',
    '4',
    'N3296'
),
(
    'TWA 220',
    '2023-10-11 22:27',
    '2023-10-11 11:12',
    '2',
    'N8203'
),
(
    'P 1295',
    '2023-11-13 15:42',
    '2023-11-13 11:35',
    '1',
    'N1230'
);

-- inserts into passengersOnFlights
INSERT INTO passengersOnFlights(
    idPassenger,
    flightNumber,
    passengerSeatNumber

)
VALUES
(
    (SELECT idPassenger FROM passengers WHERE name='Patrick Star'),
    'DL 1615',
    '2B'
),
(
    (SELECT idPassenger FROM passengers WHERE name='Dirty Dan'),
    'DL 1615',
    '2A'
),
(
    (SELECT idPassenger FROM passengers WHERE name='Sandy Cheeks'),
    'DL 1615',
    '12D'
),
(
    (SELECT idPassenger FROM passengers WHERE name='Perch Perkins'),
    'DL 1615',
    '10C'
),
(
    (SELECT idPassenger FROM passengers WHERE name='Smitty Werbenjagermanjensen'),
    'TWA 220',
    '1A'
),
(
    (SELECT idPassenger FROM passengers WHERE name='Patrick Star'),
    'TWA 220',
    '13C'
),
(
    (SELECT idPassenger FROM passengers WHERE name='Perch Perkins'),
    'TWA 220',
    '15E'
);

-- Re-enable foreign key checks and autocommit as recommended in assignment doc 
SET FOREIGN_KEY_CHECKS=1;
COMMIT;