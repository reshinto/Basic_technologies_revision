# To create MySQL database and users, follow these steps:
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
* CREATE- allows them to create new tables or databases
* DROP- allows them to them to delete tables or databases
* DELETE- allows them to delete rows from tables
* INSERT- allows them to insert rows into tables
* SELECT- allows them to use the SELECT command to read through databases
* UPDATE- allow them to update table rows
* GRANT OPTION- allows them to grant or remove other users' privileges
> GRANT type_of_permission ON database_name.table_name TO ‘username’@'localhost’;

* Review a user’s current permissions
> SHOW GRANTS username;

* Delete a user
> DROP USER ‘username’@‘localhost’;


# Change password
> mysqladmin -u myUsername password 'yourNewPassword'

# Enable use of Authentication via password for nodejs with MySql
* At MySql command line
1. ALTER USER 'username'@'localhost' IDENTIFIED BY 'your new password';
2. ALTER USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your new password';
* if the above is done, need to login with host
  * normally hostname = localhost
> mysql -u [username] -h [hostname] -p


# Change MySql default settings
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
