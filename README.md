# 340_Portfolio_Project
Database for FAA

Welcome to my database project.

Here is a link that walks through the database, user inteface, and other feature/highlights of the project: Link comming soon

If you wish to interact with the database here are instructions on how to download the required docs to run it locally on your computer. These directions are intended to be used with Visual Studio, for other IDE's some directions may vary.

Step 1: download all files from this git repository.

Step 2: download mariaDB. 
    For Mac - https://mariadb.com/resources/blog/installing-mariadb-10-1-16-on-mac-os-x-with-homebrew/
    For Windows - https://mariadb.org/download/

Step 3: install required pacakges: open the project, open a terminal then type these in the CLI and let them download.
    npm install
    npm i express --save
    npm i mysql --save
    npm i express-handlebars --save

Step 4: create a DB type "sudo mysql",  "create database <DB_name_of_your_choosing>;" (replace <DB_name_of_your_choosing> with the naem of your db)
Once you have completed this you can open type "use <DB_name_of_your_choosing>;" and then enter this command as is "ALTER USER 'root'@'localhost' IDENTIFIED VIA mysql_native_password USING PASSWORD('root');"

Step 5: type "source FAA_DB.sql"

Step 6: open the db-connector.js file in the database file change user name and host to 'root' and change database to the name you uses in step 4

Step 7: open a new terminal and change directory to the project location if not already there. Type 'node app.js' hit enter and enjoy the the database.

Thanks for taking a look.
