# Storage
- any system will require some form of storage
  - example
    - store user information
    - store metrics about the system
- storage is very complicated
  - does a database impose some kind of structure on the way that data is stored in it or does it not?
    - this is related to relational databases
  - when it comes to availability, if its about the uptime of the system, then the choice of database is really important
    - different databases are gonna give different things
    - cause if the database goes down then the entire system will go down with the database
    - this is related to the topic distributed storage
  - if you don't want the entire system to get brought down when the database is down
    - will need to store data not on 1 machine but on multiple machines
    - this comes with a lot of complexity
    - brings questions
      - how do you store data on multiple machines?
      - do you split the data up?
      - do you replicate the data across multiple machines?
      - this leads to consistency issues
        - it is a concept in storage that refers to the staleness or the up-to-dateness of data
          - e.g.: if you access data from a database, especially if that database is distributed across multiple machines, are you ever gonna get stale data
            - or will you always get the most up to date version of that data
- some databases are gonna give you certain properties or certain guarantees
  - but they're gonna trade off others
- other databases are gonna give you different properties in exchange for other trade-offs
## Terms used
### Databases
- databases are programs that either use disk or memory to do 2 core things
  1. record(store) data
  2. query(retrieve) data
- they are servers that are long lived and interact with the rest of the application through network calls, with protocols on top of TCP or even HTTP
- some databases only keep records in memory, and the users of such databases are aware of the fact that those records may be lost forever if the machine or process dies
- databases need persistence of those records, and cannot use memory
  - means that you have to write the data to disk
  - anything written to disk will remain through power loss or network partitions
    - this is used to keep permanent records
- since machines die often in a large scale system
  - special disk partitions or volumes are used by the database processes
    - and those volumes can get recovered even if the machine were to go down permanently
### Disk
- usually refers to either HDD (Hard-Disk Drive) or SSD(Solid-State Drive)
- data written to disk will persist through power failures and general machine crashes
- disk is also referred to as Non-Volatile Storage
- SSD is far faster than HDD
  - based on the latencies of accessing data from SSD and HDD
  - it is also far more expensive from a financial point of view
  - because of that, HDD will typically be used for data that's rarely accessed or updated
  - but that's stored for a long time
  - SSD will be used for data that's frequently accessed and updated
### Memory
- short for Random Access Memory(RAM)
- data stored in memory will be lost when the process that has written that data dies
- 1 advantage of using memory over disk is that reading and writing data in memory is much faster than reading or writing data in disk
### Persistent Storage
- usually refers to disk
- but in general it is any form of storage that persists if the process in charge of managing it dies
