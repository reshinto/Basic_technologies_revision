# MySQL Cheats
## Starting and Stopping the MySQL Server
### View server status
- linux
> sudo service mysql status
- mac
> brew services list
### Start MySQL Server
- linux
> sudo service mysql start
- mac
> brew services start mysql
### Stop MySQL Server
- linux
> sudo service mysql stop
- mac
> brew services stop mysql
## To create MySQL database and users, follow these steps:
1. At the command line, log in to MySQL as the root user:
> mysql -u root -p
2. List all users
> SELECT host, user FROM mysql.user;
3. Create new user within the MySQL shell
> CREATE USER 'newuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
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
## Connect app to mysql
1. Set native password
    1. ```mysql -u root -p```
    2. ```ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';```
## Connect app to docker mysql
1. run docker container if not runned
    > docker run --name=mysql-docker -e MYSQL_ROOT_PASSWORD=password -d -p 3306:3306 mysql
2. Set native password
    1. ```docker exec -it mysql-docker mysql -u root -p``` or ```mysql -h 127.0.0.1 -u root -p``` (needs mysql-client)
    2. ```ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';```
3. Set host as ```127.0.0.1``` in the app
4. if running on PORT other than ```3306```, need to set PORT in the app (ignore if using default mysql PORT)
## Run query on command line (remove -h 127.0.0.1 if not using docker)
- creating database
  - ```mysql -h 127.0.0.1 -u root -p -e "CREATE DATABASE databaseName;";```
- Use database and run query
  - ```mysql -h 127.0.0.1 -u root -p databaseName -e "SELECT * FROM tableName;"```
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
-- comment 2
```
#### multi line
```mysql
/*
multi-line
*/
```
### Constraint
#### PRIMARY KEY
- values in this column are unique, and each value can be used to identify a single row in this table
#### AUTOINCREMENT
- For integer values, this means that the value is automatically filled in and incremented with each row insertion
- Not supported in all databases
#### UNIQUE
- values in this column have to be unique, can't insert another row with the same value in this column as another row in the table
- Differs from the `PRIMARY KEY` in that it doesn't have to be a key for a row in the table.
#### NOT NULL
- inserted value can not be NULL
#### CHECK (expression)
- allows runing of complex expression to test whether the values inserted are valid
- e.g.: check that values are positive, or greater than a specific size, or start with a certain prefix, etc.
#### FOREIGN KEY
-  a consistency check which ensures that each value in this column corresponds to another value in a column in another table
- e.g.: if there are two tables, one listing all Employees by ID,
  - and another listing their payroll information,
  - the `FOREIGN KEY` can ensure that every row in the payroll table corresponds to a valid employee in the master Employee list
```mysql
CREATE TABLE IF NOT EXISTS `table1_table2` (  -- many-to-many
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `table1_id` INT UNSIGNED NOT NULL,
  `table2_id` INT UNSIGNED NOT NULL,
  FOREIGN KEY (table1_id) REFERENCES table1(id),
  FOREIGN KEY (table2_id) REFERENCES table2(id)
);
```
### Operator types
#### =, !=, <, <=, >, >=
- standard numerical operators
#### BETWEEN...AND...
- number is within range of 2 values (inclusive)
- eg: columnname BETWEEN 1 AND 10
#### NOT, !
- inverse the value
#### IN
- number exists in a list
- eg: columnname IN (1,5,8)
#### AND, &&
```mysql
SELECT * FROM table WHERE columnname1 = "something" && (columnname2="something1" || columnname2="something2");
````
#### OR, &&
#### LIKE
- case insensitive exact string comparison
#### %
- used anywhere in a string to match a sequence of 0 or more characters
- eg: match any string that ends with "AT"
   > columnname LIKE "%AT"
- eg: match any string that contains "AT"
   > columnname LIKE "%AT%"
### Boolean types
- represented as integer values of 0 and 1
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
#### REAL
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
- should reduce NULL values as they require special attention when constructing queries, constraints, and when processing the results
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
### GROUP BY
- grouping rows that have the same value in the column specified
```mysql
SELECT * FROM table GROUP BY columnname1;
```
### WHERE
- set conditions for rows yet to be grouped
```mysql
SELECT * FROM table WHERE columnname1 = "some value";
```
### HAVING
- set conditions for grouped rows
```mysql
SELECT * FROM table GROUP BY columnname1 HAVING columnname1 = "some value";
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
### IS
### AS
### DEFAULT
- set default value
```mysql
ALTER TABLE table1 ADD COLUMN columnname2 TEXT DEFAULT "some value";
```
## JOINs
- combine row data across 2 separate tables using unique key
### INNER JOIN (same as JOIN)
- matches rows from the 1st table and the 2nd table, which have the same key to create a result row with the combined columns from both table
```mysql
# INNER JOIN
SELECT * FROM table1 INNER JOIN table2 ON table1.id = table2.id;

# JOIN
SELECT * FROM table1 JOIN table2 ON table1.id = table2.id;
```
### OUTER JOINs
- use if 2 tables have asymmetric data
- need to write additional logic to deal with NULLs in the result and constraints
- OUTER is used to enable SQL-92 compatibility
#### LEFT JOIN (same as LEFT OUTER JOIN)
- includes rows from table1 regardless of whether a matching row is found in table2
```mysql
SELECT * FROM table1 LEFT JOIN table2 ON columnname1 = columnname2;
```
#### RIGHT JOIN (same as RIGHT OUTER JOIN)
- includes rows from table2 regardless of whether a matching row is found in table1
#### FULL JOIN (same as FULL OUTER JOIN)
- rows from both tables are kept, regardless of whether a matching row exists in the outer table
## Commands
### CREATE
- allows them to create new tables or databases
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
### DROP
- allows them to them to delete tables or databases
#### Delete table
```mysql
DROP TABLE tablename;
```
### DELETE
- allows them to delete rows from tables
#### Delete row
```mysql
DELETE FROM tablename WHERE condition;

# example
DELETE FROM todos WHERE todo_id=2;
```
### INSERT
- allows them to insert rows into tables
### Insert values to table
```mysql
# Insert statement with values for ALL columns
INSERT INTO mytable
VALUES (value1, value2, …),
       (anothervalue1, anothervalue2, …),
       …;
       
# Insert statement with specific columns
INSERT INTO mytable
(column, another_column, …)
VALUES (value1, value2, …),
      (anothervalue1, anothervalue2, …),
      …;
```
### SELECT
- allows them to use the SELECT command to read through databases
#### Show all columns in table
```mysql
SELECT * FROM tablename;
```
### UPDATE
- allow them to update table rows
#### Update row
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
### AVG(column)
- Finds the average numerical value in the specified column for all rows in the group
### CEILING()
### COUNT(column)
- counts the number of rows in the group if no column name is specified
- Otherwise, count the number of rows in the group with non-NULL values in the specified column
### DEGREES()
### EXP()
### FLOOR()
### LOG()
### MAX(column)
- 	Finds the largest numerical value in the specified column for all rows in the group
### MIN(column)
- Finds the smallest numerical value in the specified column for all rows in the group
### MOD()
### PI()
### POWER()
### RADIANS()
### RAND()
### ROUND()
### SQRT()
### STD()
### SUM(column)
- Finds the sum of all numerical values in the specified column for the rows in the group
### TRUNCATE
## Special functions to get values
### NOW()
- get current time, when data is entered to database
## Query example
### Alter table
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
## NodeJS configuration
- install mysql with promise support
> yarn add promise-mysql
```javascript
import mysql from "promise-mysql";

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

export default async function query(queryStatement, arrValues) => {
  let conn;
  try {
    conn = await db;
    return await conn.query(queryStatement, arrValues);
  } catch (e) {
    throw new Error(`db error: ${e}`);
  } finally {
    await conn.end();
  }
}
```
