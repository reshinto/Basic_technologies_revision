# Data Partitioning
* a technique to break up a big database (DB) into many smaller parts
* It is the process of splitting up a DB/table across multiple machines
  * to improve the manageability, performance, availability, and load balancing of an application
* after a certain scale point
  * it is cheaper and more feasible to scale horizontally
    * by adding more machines
  * It is more expensive to grow it vertically by adding beefier servers
## Partitioning Methods
* 3 most popular schemes used by various large scale applications
  1. Horizontal partitioning
      * put different rows into different tables
      * also called as range based partitioning
        * as we are storing different ranges of data in separate tables
      * also called as Data Sharding
      * key problem
        * if the value whose range is used for partitioning isn’t chosen carefully
          * the partitioning scheme will lead to unbalanced servers
  2. Vertical Partitioning
      * divide our data to store tables related to a specific feature in their own server
      * it is straightforward to implement and has a low impact on the application
      * main problem
        * if our application experiences additional growth
          * it may be necessary to further partition a feature specific DB across various servers
  3. Directory Based Partitioning
      * A loosely coupled approach to work around issues mentioned in the above schemes
        * is to create a lookup service
          * which knows your current partitioning scheme and abstracts it away from the DB access code
      * to find out where a particular data entity resides
        * we query the directory server that holds the mapping between each tuple key to its DB server
      * loosely coupled approach means
          * can perform tasks like
            * adding servers to the DB pool
            * changing our partitioning scheme without having an impact on the application
## Partitioning Criteria
1. Key or Hash-based partitioning
    * apply a hash function to some key attributes of the entity we are storing; that yields the partition number
    * This approach should ensure a uniform allocation of data among servers
    * fundamental problem
      * it effectively fixes the total number of DB servers
        * adding new servers = changing the hash function
          * this would require redistribution of data and downtime for the service
            * A workaround for this problem is to use Consistent Hashing
2. List partitioning
    * each partition is assigned a list of values
      * whenever we want to insert a new record, we will see which partition contains our key and then store it there
3. Round-robin partitioning
    * a simple strategy that ensures uniform data distribution
    * With ‘n’ partitions, the ‘i’ tuple is assigned to partition (i mod n)
d. Composite partitioning
    * combine any of the above partitioning schemes to devise a new scheme
      * e.g.: first applying a list partitioning scheme and then a hash based partitioning
    * Consistent hashing could be considered a composite of hash and list partitioning
      * where the hash reduces the key space to a size that can be listed
## Common Problems of Data Partitioning
* On a partitioned database, there are certain extra constraints on the different operations that can be performed
  * constraints are due to operations across multiple tables rows in the same table will no longer run on the same server
  * Constraints and additional complexxities introduced by partitioning
    1. Joins and Denormalization
        * Performing joins on a database which is running on one server is straightforward
          * but will no longer be so once once a database is partitioned and spread across multiple machines
            * because joins that span database partitions will not be feasible
        * Such joins will not be performance efficient since data has to be compiled from multiple servers
        * solution: denormalize the database
          * so that queries that previously required joins can be performed from a single table
          * however, service now has to deal with all the perils of denormalization such as data inconsistency
    2. Referential integrity
        * trying to enforce data integrity constraints such as foreign keys in a partitioned database can be difficult
        * Most of RDBMS do not support foreign keys constraints across databases on different database servers
          * this means that apps that require referential integrity on partitioned databases have to enforce it in app code
            * in such cases, applications have to run regular SQL jobs to clean up dangling references
    3. Rebalancing
        * many reasons we have to change our partitioning scheme
          1. The data distribution is not uniform
          2. There is a lot of load on a partition
* In such cases, either we have to create more DB partitions or have to rebalance existing partitions
  * this means the partitioning scheme changed and all existing data moved to new locations
  * Doing this without incurring downtime is extremely difficult
* Using a scheme like directory based partitioning make rebalancing a palatable experience
  * at the cost of increasing the complexity of the system
  * and creating a new single point of failure (i.e. the lookup service/database)
