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
8. Run SQL file
- from terminal (ignore sudo if not required)
> sudo mysql < sqlscript.sql
- from mysql
> source path/sqlscript.sql;
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
### Revoke permission
> REVOKE type_of_permission ON database_name.table_name FROM ‘username’@‘localhost’;
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
### Comments
#### Singe line
```mysql
# comment 1
-- comment 2 --
```
#### multi line
```mysql
/*
multi-line
*/
```
### Operator types
#### =, !=, <, <=, >, >=
- standard numerical operators
#### BETWEEN...AND...
- number is within range of 2 values (inclusive)
- eg: columnname BETWEEN 1 AND 10
#### NOT
- inverse the value
#### IN
- number exists in a list
- eg: columnname IN (1,5,8)
#### AND
#### OR
#### LIKE
- case insensitive exact string comparison
#### %
- used anywhere in a string to match a sequence of 0 or more characters
- eg: match any string that ends with "AT"
   > columnname LIKE "%AT"
- eg: match any string that contains "AT"
   > columnname LIKE "%AT%"
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
#### TEXT
- for strings that we do not know the length
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
## Keywords
### SIGNED
- allow positive and negative values
#### UNSIGNED
- allow only positive values
### DISTINCT
- blindly remove duplicate rows (better to use GROUP BY)
```mysql
SELECT DISTINCT cdolumnname;
```
### ORDER BY
- sort rows by alpha-numeric
#### ASC
#### DESC
```mysql
SELECT * FROM table ORDER BY columnname DESC;
```
### LIMIT
- reduce the number of rows to return
### OFFSET
- specify where to begin counting the number of rows from
```mysql
SELECT * FROM table LIMIT 5 OFFSET 3;
```
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
## foreign key
- used to make references to the primary key of another table
- can have a different name from the primary key name
- value can have NULL
- does not have to be unique
## Built-in numeric functions
### ABS()
### ACOS()
### ASIN()
### ATAN()
### ATAN2()
### COS()
### SIN()
### TAN()
### AVG()
### CEILING()
### COUNT()
### DEGREES()
### EXP()
### FLOOR()
### LOG()
### MAX()
### MIN()
### MOD()
### PI()
### POWER()
### RADIANS()
### RAND()
### ROUND()
### SQRT()
### STD()
### SUM()
### TRUNCATE
## Special functions to get values
### NOW()
- get current time, when data is entered to database
## Query example
### Insert values to table
```mysql
INSERT INTO tablename (columnname1, columnname2) VALUE (valueforcolumn1, valueforcolumn2, ...);
```
### Show all columns in table
```mysql
SELECT * FROM tablename;
```
### Create new table
```mysql
CREATE TABLE tablename(
   columnname1 VARCHAR(30) NOT NULL,
   id_name INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
);

# Check if table exist
CREATE TABLE IF NOT EXISTS tablename(
   columnname1 VARCHAR(30) NOT NULL,
   id_name INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
);
```
#### ENUM
```mysql
CREATE TABLE tablename(
   columnname1 VARCHAR(30) NOT NULL,
   type ENUM('A', 'B') NOT NULL,
   id_name INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
);
```
#### Foreign key
```mysql
CREATE TABLE tablename(
   columnname1 VARCHAR(30) NOT NULL,
   foreign_key_name INT UNSIGNED NOT NULL,
   id_name INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
);
```
#### Date
```mysql
CREATE TABLE tablename(
   columnname1 VARCHAR(30) NOT NULL,
   date DATE NOT NULL,
   id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
);
```
#### Unique id
```mysql
CREATE TABLE tablename(
   table1_id INT UNSIGNED NOT NULL,
   table2_id INT UNSIGNED NOT NULL,
   PRIMARY KEY(table1_id, table2_id)
);
```
### Update row
```mysql
# Single update
UPDATE tablename SET columnname=value WHERE condition;

# example
UPDATE todos SET todo="study programming" WHERE todo_id=3;

# Mutiple updates
UPDATE tablename
SET columnname1=value,
    columnname2=value
WHERE condition;
```
### Delete row
```mysql
DELETE FROM tablename WHERE condition;

# example
DELETE FROM todos WHERE todo_id=2;
```
### Modify table
#### Rename table
```mysql
# rename 1 table
RENAME TABLE oldtablename to newtablename;

# rename multiple tables
RENAME TABLE
tablename1 to newtablename1,
tablename2 to newtablename2;
```
#### Add column
```mysql
ALTER TABLE tablename 
ADD columnname2 INT NOT NULL AFTER columnname1,
ADD columnname3 INT NOT NULL AFTER columnname1;
```
#### Modify column data definition
```mysql
ALTER TABLE tablename MODIFY columnname newdatatype;
```
#### Rename column and / or modify data definition
```mysql
# Rename column AND modify data definition
ALTER TABLE tablename CHANGE columnname newcolumnname newdatatype;

# Rename column
ALTER TABLE tablename CHANGE columnname newcolumnname null;
```
#### Delete column
```mysql
# Drop 1 column
ALTER TABLE tablename DROP columnname1;

# Drop 1 or more columns
ALTER TABLE tablename DROP COLUMN columnname1;
```
### Delete table
```mysql
DROP TABLE tablename;
```
