# PostgreSQL Relational Database example
## how to run
- Install postgresql
> brew install postgresql
- Start postgresql server
> brew services start postgresql
- Create database
> createdb database_name
- Load sql file into database
> psql -d database_name -a -f tables.sql
- Connect to database
> psql -d database_name
- Run queries from queries.sql by copy and paste
## Atomicity example
- open 2 terminals, both connected to the same database
- 1 starts the ```BEGIN TRANSACTION``` while the other does not
- after updating the one that has began transaction, the other does not reflect the results
  - this is because ```COMMIT``` has not been initiated and thus the transaction has not been fully completed, displaying the atomicity feature
## Isolation example
- open 2 terminals, both connected to the same database
- both start the ```BEGIN TRANSACTION```
- update the 1st terminal, then try updating the 2nd terminal
  - the 1st terminal will be updated successfully
  - the 2nd terminal will hang
  - this means that transactions could be runned concurrently, but effectively they will be executed sequentially
- 2nd terminal will only complete after the 1st terminal perform a ```COMMIT;```
