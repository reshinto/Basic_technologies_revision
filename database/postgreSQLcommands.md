# PostgreSQL
## Install on mac
> brew install postgresql
## View list of services status
> brew services list
## Database server
### Start
> brew services start postgresql
### Stop
> brew services stop postgresql
### Restart
> brew services restart postgresql
## Create user if required (default is current terminal user)
> createuser --interactive --pwprompt
## Delete user
> dropuser username
## List database
> psql -l
## Delete database
> dropdb "database_name"
## Create database
### If have permission to create database
> createdb database_name
### Create database with specified owner
> createdb -O username database_name
## Connect to database (must connect to do more)
* Connect using default user
  > psql -d database_name
* Connect using a specific user
  > psql -d database_name -U username
## After connecting to database
### View command help
> \\?
### Check connection information
> \conninfo
  * You are connected to database "postgres" as user "username" via socket in "/tmp" at port "5432".
### List all users
> \du
### Create user
> create role new_user with login password 'password';
### Alter privileges of user
> alter role username new_privilege;
### Grant permission to user
* Grant all permissions
  > grant all privileges on {type} {type_name} to {username}
    * type = database, table, etc.
* Grant specific permission
  > grant {permissions} on {type} {type_name} to {username};
    * for type of permissions refer to https://www.postgresql.org/docs/9.1/sql-grant.html
### Revoke permission from user
* Revoke all permissions
  > revoke all privileges on {type} {type_name} from {username}
    * type = DATABASE, TABLE, etc.
* Revoke specific permission
  > revoke {permissions} on {type} {type_name} from {username};
### List available databases
> \list
### Create database
> create database database_name;
### Delete database
> drop database database_name;
### Connect to a database
* Method 1
 > \connect database_name
* Method 2
 > \c database_name
### Show data directory
> show data_directory;
### List available tables in current database
> \dt
