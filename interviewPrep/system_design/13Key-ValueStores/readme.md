# Key-Value Stores
- one of the most commonly used NoSQL paradigms today
  - the key-value store bases its data model on the associative array data type
  - thus getting a fast, flexible storage machine that resembles a hash table
- Key-Value store is a flexible NoSQL database that's often used for caching and dynamic configuration
  - is flexible because it does not impose structure
  - is also simple because it is a key-value type of mapping
  - is a type of database that allows you to store key-value pairs
    - mappings from keys which are typically strings to arbitrary values which are typically stored as strings
      - some key-value stores comes with specific typings, which allows you to store actual integers or actual arrays, etc
- another way to think of key-value stores is as hash tables
- using key-value stores is very fast and result in low latencies and increased throughput
- although relational databases enables you to have powerful querying abilities
  - its structure that is imposed on you can sometimes be more troublesome than useful
  - during this case, using a non-relational database (NoSQL) might be better
## Popular types
- [Amazon DynamoDB](https://aws.amazon.com/dynamodb/)
- [ETCD](https://etcd.io/)
  - is a strong consistent and highly available key-value store that's often used to implement leader election in a system
- [Redis](https://redis.io/)
  - an in memory key-value store
  - does offer some persisten storage options but is typically used as a really fast, best-effort caching solution
  - often used to implement rate limiting
- [Apache ZooKeeper](https://zookeeper.apache.org/)
  - is a strongly consistent, highly available key-value store
  - often used to store important configuration or to perform leader election
## Terms Used
### Dynamic Configuration
- sometimes you might want to have special parameters or constants in your system that different parts of the system can rely on
  - best place to store these special parameters is in a key-value store
