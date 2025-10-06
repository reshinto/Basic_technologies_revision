# Java Database Connectivity (JDBC)

- an API for client-side access to a database
- specifically RDBMS focused

## Basic Flow

```
Mount Driver -> Create Connection -> Execute SQL -> Commit / Rollback -> Close Connection
```

## Features

### Universal Data Access

- hot swappable
- standard SQL
- JDBC drivers available
- can run the same code against 2 different databases in theory

### Exceptions

- all JDBC operations throw a SQLException
- name exception
  - you have to catch it or throw it
- standardized SQLSTATE code is available
- ErrorCode is available but is vendor specific in most cases

## Terminology of JDBC

### Connections

- **DriverManager**
  - a class that interacts with the driver for creating connections
- **DataSource**
  - a modern class that interacts with the driver for creating connections
- **Connection**
  - a class that the developer interacts with that manages the actual communication between the client and the server

### Executions

- **Statement**
  - the representation SQL to be executed against the database
- **ResultSet**
  - the response from the database in a logical tabular form
- **PreparedStatement**
  - an extension of statement that is used for precompiled statements (with inputs)
- **CallableStatement**
  - an extension of PreparedStatement that references stored procedures in the database (with inputs and outputs)

### Transactions

- **Auto-commit**
  - a function of a database driver where each statement is immediately readable by all processes once executed in the RDBMS
- **Transaction**
  - a series of statements that must be executed completely or not at all before any other process can read them
- **Rollback**
  - a mechanism by which all statements of a transaction are removed from the database such that it appears to all current and future processes as never having occurred
