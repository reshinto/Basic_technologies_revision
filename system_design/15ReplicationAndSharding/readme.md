# Replication and Sharding
- a system's performance is often only as good as its database
  - optimize the database and the system's performance will improve
  - e.g.: if a system's database is unavailable, then the system itself will likely be unavailable
    - if a system's database has high latency or low throughput, then the system itself will likely have high latency or low throughput
  - this is where replication and sharding will come into play
- data redundancy and data partitioning techniques can be used to enhance a system's fault tolerance, throughput, and overall reliability
## Replication
- the act of duplicating the data from 1 database server to others
### Using replication to backup a database
- this is sometimes used to increase the redundancy of the system and tolerate regional failures
  - replica database must always be up to date with the main database
#### How it works
- whenever the main database is updated, the replica database will also need to be updated and in a synchronous way
  - in the event that the update of the replica database should fail, the update of the main database should not be completed
- as a result, this will cause the write operation to take longer as both databases has to be updated successfully
- when the main database fails, the replica database will take over
- when the main database is up again, the main databse will take over
### Using replication to create database for specific regions
- other times you can use replication to move data closer to the clients
  - thus decreasing the latency of accessing specific data
#### How it works
- if there are 2 servers, 1 in the US for US users, and 1 in China for Chinese users
  - each server in their respective countries will update their own databases first
    - this will allow native users to have high latency and throughput
  - however the native data in each database has to be in sync with each other
    - since other country's database is not of high priority, other country's database can be updated asynchronously after the native country's database has been updated
## Sharding (sometimes called data partitioning)
- it is the act of splitting a database into 2 or more pieces called ```shards```
- it is typically done to increase the throughput of the database
- popular sharding strategies
  - sharding based on a client's region
  - sharding based on the type of data being stored (e.g.: user data gets stored in 1 shard, payments data gets stored in another shard)
  - sharding based on the hash of a column (only for structured data)
### When to use
- when a database reaches a bottleneck and can't handle too many requests at once and throughput is too low
  - although scaling vertically by improving the database more powerful would work but there is only so much that can be done
  - scaling horizontally by adding more database servers is also possible, however, if there are tons of data, replicating it might not be an optimal way
- a better solution would be to split up the data and store parts of the data in their own database server, this is sharding or data partitions
  - e.g.: any paying customers with the name that starts from A to C goes to shard 1, D to F goes to shard 2, etc.
  - this solution however, comes with problems too leading to Hot Spot issue
  - a better way to split up data might be to use hashing that guarantees uniformity
  - a reverse proxy or load balance could be used to configure this logic of determining which shard to use
## Hot Spot
- when distributing a workload across a set of server, that workload might be spread unevenly
- this can happen if the sharding key or hashing function are suboptimal
  - or if the workload is naturally skewed
    - some servers will receive a lot more traffic than others, thus creating a hot spot
