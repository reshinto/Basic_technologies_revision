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
- similar to car pooling where everyone rides in the same car to save resources or money
- allow multiple application threads to use the same database connection
  - in this case, instead of every application thread using its own connection
    - they are pooled together and use the same one
- which saves on overhead of independent database connections

### Caching
- serve traffic from memory rather than having to read from disk
- not directly related to database
- cache sits in front of database to handle serving content
- can't cache everything
  - dynamic data that is frequently updated would not work well
- e.g.: Redis, Memcached
- best way to scale the database is to not let traffic reach the database at all
  - according to facebook, 99% of their requests are served from cache

### Vertical Scaling
- get a bigger server with faster processor or more memory
- easiest solution when starting out

## Replication and Partitioning
### Read Replicas
- duplicate the database and set it as the master server dedicated only to writes
- create replica servers to handle reads
- have to handle making sure new data reaches replicas
- have built in fault tolerance as even if any of the replica were to go down, there would be backups to take its place

![alt text](https://github.com/reshinto/Basic_technologies_revision/raw/master/system_design/images/replicas.png "replicas")

### Sharding (a type of partitioning)
- also called as horizontal partitioning
- schema of table stays the same, but it's now split across multiple DBs
  - reason for this is because if read replica is set up, you need to handle more writes
    - can split the task
      - e.g.: names of users from A-M goes to the first shard, while users from N-Z goes to the second shard

|pros|cons|
|-|-|
|can hanlde more traffic|Hot Keys situation where some keys does not have as much traffic compared to the others leading to uneven traffic|
||no joins across shards because the data is separate, if we attempt to join them, it would be very slow|

- famous example of hot key senario
  - instagram: justin bieber user id had way more traffic than an average user
    - thus there is no good way to handle the traffic whenever he posts a picture, the servers would go crazy
- some cases, there's no way good way to handle sharding, just have to deal with it

![alt text](https://github.com/reshinto/Basic_technologies_revision/raw/master/system_design/images/sharding.png "sharding")

### Vertical Partitioning
- divide up the schema of database into separate tables
  - typically done by functionality if there is 1 big row of user data
    - data that does not make sense to be used together would make sense to split them apart so that you do not retrieve a bunch of data that is not required
- best when most data in row isn't needed for most queries

|pros|cons|
|-|-|
|generally it is easier to implement than sharding|could potentially end up having to shard or horizontally partition anyway, which would get complicated because the data has already been vertically partitioned|

![alt text](https://github.com/reshinto/Basic_technologies_revision/raw/master/system_design/images/verticalPartitioning.png "Vertical Partitioning")

## When to consider NoSQL
- when the benefit of relational database is gone
  - e.g.: normalized data, strong consistency, simple data model
- when you made a lot of trade offs trying to scale, it becomes unrecognizable compared to a standard SQL setup
- the reason why you would choose a NoSQL isn't because NoSQL is magical
  - you choose it because you know up front what you are sacrificing and what specifically you need for your application that you can make a trade off
    - when you start of with a relational databases, you thought you would stay with all the best practices
- examples:
  - when dealing with transactions and banking, you would want consistency with SQL
  - for stuff like google or social media where you don't need perfect consistency right away, you could make those trade offs for scale with NoSQL
    - but by the time you end up scaling, you have lost all of it
