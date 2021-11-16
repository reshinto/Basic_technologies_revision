# Database Scaling
- an important topic for any system design
  - because for any large scale applications, the database is usually going to be where the performance bottleneck is
    - because while the application servers are stateless, it can be scaled horizontally as much as required
    - these servers are going to hit the database for retrieving and writing of data
## Key Information
- most web apps are read heavy, around 95% +
  - e.g.: twitter (tweets), facebook (posts), google (searches)
## Basic Scaling Techniques
- used to improve the performance of the database
### Indexes
- create an index based on a certain column that's frequently accessed
  - e.g.: user id

|pros|cons|
|-|-|
|speeds up read performance by creating an index that speeds up the lookup|writes and updates become slightly slower, because everytime a row is updated, you also have to potentially modify the index|
|thus it does not have to do a full table scans across the database|requires more storage for a table that's indexed because you have to store the index itself|

### Denormalization
- it go against a standard best practices with relational databases
- add redundant data to tables so that it reduces the amount of joins you need to do

|pros|cons|
|-|-|
|improves the read performance|sacrificing write performance|
||risk inconsistent data across tables, because all tables have to have the same data|
||code becomes harder to write as you would need to deal with the situation where you not only write to 1 table, but you have to update that data place that column is now located. Usually its abstracted away by some library|

### Connection Pooling
### Caching
### Vertical Scaling
- get a bigger server with faster processor or more memory
- easiest solution when starting out
