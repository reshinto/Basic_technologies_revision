# MySQL Cheats
## To create MySQL database and users, follow these steps:
1. At the command line, log in to MySQL as the root user:
> mysql -u root -p
2. List all users
> SELECT host, user FROM mysql.user;
3. Create new user within the MySQL shell
> CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
4. Grant privileges
    * To grant ALL privileges
        > GRANT ALL PRIVILEGES ON * . * TO 'newuser'@'localhost';
5. Reload privilegers for changes to take effect
> FLUSH PRIVILEGES;
6. Logout
> quit
7. Relog in to new user
> mysql -u [username] -p
* Revoke permission
> REVOKE type_of_permission ON database_name.table_name FROM ‘username’@‘localhost’;
## Grant Different User Permissions
### Types of permissions
* ALL PRIVILEGES- as we saw previously, this would allow a MySQL user full access to a designated database (or if no database is selected, global access across the system)
### Grant permissions
* GRANT OPTION- allows them to grant or remove other users' privileges
> GRANT type_of_permission ON database_name.table_name TO ‘username’@'localhost’;
* Review a user’s current permissions
> SHOW GRANTS username;
* Delete a user
> DROP USER ‘username’@‘localhost’;
## Change password
> mysqladmin -u myUsername password 'yourNewPassword'
## Enable use of Authentication via password for nodejs with MySql
* At MySql command line
1. ALTER USER 'username'@'localhost' IDENTIFIED BY 'your new password';
2. ALTER USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your new password';
* if the above is done, need to login with host
  * normally hostname = localhost
> mysql -u [username] -h [hostname] -p
## Change MySql default settings
* View SQL mode values
> SELECT @@sql_mode;
* Adding only one mode to sql_mode without removing existing ones:
> SET sql_mode=(SELECT CONCAT(@@sql_mode,',<mode_to_add>'));
* Removing only a specific mode from sql_mode without removing others:
> SET sql_mode=(SELECT REPLACE(@@sql_mode,'<mode_to_remove>',''));
* example: disable MySql "only_full_group_by" mode
> SET sql_mode=(SELECT REPLACE(@@sql_mode, 'ONLY_FULL_GROUP_BY', ''));
* List all databases
> show databases;
* Create database
> CREATE DATABASE dbname;
* Use database
> USE dbname;
* Delete database
> DROP DATABASE dbname;
## Data types
### Numeric types
#### TINYINT
- 127 to -128
#### SMALLINT
- 32,768 to -32,767
#### MEDIUM INT
- 8,388,608 to -8,388,608
#### INT
- 2^31 to -2^31 - 1
#### BIGINT
- 2^63 to -2^63 - 1
#### FLOAT
- decimal spaces, 1.1E38 to -1.1E38
#### DOUBLE
- decimal spaces, 1.7E308 to -1.7E308
### String types
#### CHAR
- a character string with a fixed length
#### VARCHAR
- a character string with a length that's variable
#### BLOB
- can contain 2^16 bytes of data
#### ENUM
- a character string that has a limited number of total values, which must be defined, can contain only 1 legal value
#### SET
- a list of legal possible strings, can contain multiple values
### Date & Time types
#### DATE
- YYYY-MM-DD
#### TIME
- HH:MM:SS
#### DATETIME
- YYYY-MM-DD HH:MM:SS
#### TIMESTAMP
- YYYYMMDDHHMMSS
#### YEAR
- YYYY
### Null types
#### NULL
## Commands
### CREATE
- allows them to create new tables or databases
### DROP
- allows them to them to delete tables or databases
### DELETE
-allows them to delete rows from tables
### INSERT
- allows them to insert rows into tables
### SELECT
- allows them to use the SELECT command to read through databases
### UPDATE
- allow them to update table rows
### DESCRIBE
- see description of table created
## Query example
### Insert values to table
> INSERT INTO tablename VALUE (column1, column2, ...);
### Show all columns in table
> SELECT * FROM tablename;
### Create new table
```mysql
CREATE TABLE tablename(
   columnname1 VARCHAR(30) NOT NULL,
   id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
);
```
## Special functions to get values
### NOW()
- get current time, when data is entered to database
