# Relational Databases
- it is a type of database that imposes on the data stored in it
- a tabular like structure
- data stored in a relational database is gonna be stored in the form of tables
  - a table typcially represent a specific entity
    - rows in a table represent instances of the entities that the respective tables represent
      - rows in relational databases are often referred to as records
    - columns in a table represent attributes of the entities that the respective tables represent
    - all tables stored in the relational databases are going to have defined schemas
      - the specific rules and plans about how the data should be stored in them
  - when dealing with a relational database, and defined a table, any entry in that table must conform to the table's schema
    - have to add an additional column if in need for additional field
- most relational database supports SQL (Structure Query Language) a databse or query language that comes with powerful querying capabilities
  - used to perform complex queries on the data stored in the database without having to load the data in memory
### SQL databases must use ACID transactions
- ACID transaction is a transaction or operation in a database that has 4 properties
#### Atomicity
- the operations that constitute the transaction with either all succeed or all fail
- there is no in-between state
- e.g.: a bank transfer transaction from 1 bank account to another bank account
  - during this transaction, should it fail at any point before completion, the entire transaction will fail
  - the entire transaction is effectively rolled back
  - only when the all operations in the transaction passes, will the entire transaction pass
#### Consistency
- the transaction cannot bring the database to an invalid state
- after the transaction is committed or rolled back
  - the rules for each record will still apply, and all future transactions will take into account any past transactions in the database
  - there will be not stale state in the database where 1 transaction has executed but another transaction doesn't know that it's executed
#### Isolation
- the execution of multiple transactions concurrently will have the same effect as if they had been executed sequentially like in a queue
#### Durability
- any committed transaction is written to non-volatile storage, effects of that transaction are permanent
- it will not be undone by a crash, power loss, or network partition
### Database Index
- a special auxiliary data structure can be created allow your database to perform certain queries much faster
- indexes can typically only exist to reference structured data, like data stored in relational databses
- in practice, you create an index on 1 or multiple columns in your database to greatly speed up read queries that you run very often
  - with the downside of slightly longer writes to your database, since writes have to also take place in relevant index
#### Cons of using database index
- because it is an auxiliary data structure, it will take up more space
- it also mean that whenever you write to the database or store data in the table that has a database index
  - you also need to write in the database index
  - as a result causing the write operations to be a bit slower and take up more space
#### types of indexes
- each types have their own ways of implementation
- e.g.: bitmap indexes, reverse indexes, dense indexes
## Terms used
### Databases
- is a program that either use disk or memory to do 2 core things
  - record data and query data
- they are also servers that are long lived and interact with the rest of the application through network calls
  - with protocols on top of TCP or even HTTP
- some databases only keep records in memory
  - users of such databases are aware of the fact that those records may be lost forever if the machine or process dies
- databases need persistence of those records and cannot use memory
  - this means that you have to write data to disk
  - anything written to disk will remain during power loss or network partitions
- since machinese die often in a large scale system
  - special disk partitions or volumes are used by the database processes
  - those volumes can get recovered even if the machine were to go down permanently
### Disk
- usually refers to either HDD (Hard-disk drive) or SSD (Solid-state drive)
- data written to disk will persist during power failures and general machine crashes
- disk is also referred to as non-volatile storage
- SSD is far faster than HDD but also far more expensive from a financial point of view
- thus HDD will typically be used for data that's rarely accessed or updated
  - but is stored for a long time
  - SSD is used for data that's frequently accessed and updated
### Memory
- short for RAM (Random Access Memory)
- data stored in memory will be lost when the process that has written that data dies
### Non-Relational Database
- in contrast with relational database (SQL databases), it is a type of databse that is free of imposed, tabular-like structure
- non-relational databases are often referred to as NoSQL databases
- 1 example is [Google Cloud Datastore](https://cloud.google.com/datastore)
  - this only had ```Eventual Consistency```
### SQL (Structured Query Language)
- relational databases can be used using a derivative of SQL such as PostgreSQL in the case of Postgres
### SQL Database
- any database that supports SQL
- this term is often used synonymously with relational databse
- in practice, not every relational database supports SQL
### NoSQL Databse
- any databse that is not SQL compatible is called NoSQL
- usually comes with their own special querying language
  - usually does not support complex queries
    - although 1 could write their own python or javascript to perform complex queries
      - however, when dealing with large scale distributed system, you might have terabytes of data
        - writing a python script to query this data, would need to load that data in memory, which is pretty much impossible
### Strong Consistency
- usually refers to the consistency of ACID transactions as opposed to Eventual Consistency
### Eventual Consistency
- a consistency model which is unlike Strong Consistency
- in this model, reads might return a view of the system that is stale
- an eventually consistent datastore will give guarantees that the state of the database will eventually reflect writes within a time period (could be 10 seconds or minutes)
### Postgres
- a relational databse that uses a dialet of SQL called PostgresSql
- provides ACID transactions
