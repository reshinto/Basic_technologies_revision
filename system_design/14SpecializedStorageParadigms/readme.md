# Specialized Storage Paradigms
## Blob storage
- widely used kind of storage in small and large systems
- they don't really count as databases, partially because they only allow the user to store and retrieve data based on the name of the blob
- is similar to key-value store but blob stores have different guarantees
  - it might be slower than key-value stores, but values can be megabytes larger (or gigabytes larger)
  - usually used to store large binaries, database snapshots, or images and other static assets that a website might have
- blob storage is complicated to have on premise
  - only giant companies like Google and Amazon have infrastructure that supports it
  - so usually in the system design interview context, can assume that you will be able to use Google Cloud Storage or Amazon S3
    - they cost money depending on how much storage is used and how often you store and retrieve blobs from that storage
- blob storage e.g.:
  - Google Cloud Storage
    - GCS is a blob storage service provided by Google
  - Amazon S3
    - S3 is a blob storage service provided by Amazon through Amazon Web Services (AWS)
## Time Series Database (TSDB)
- it is a special kind of database optimized for storing and analyzing time-indexed data which are data points that specifically occur at a given moment in time
- use cases
  - good if you are monitoring parts of the system
    - e.g: a bunch of events that all occur at a given timestamp
    - if you are designing an IoT system, where you got millions of devices that are constantly sending telemetry data or capturing certain data in their environments
    - if you are dealing with stock prices that change every second or cryptocurrency prices
- e.g.:
  - [InfluxDB](https://www.influxdata.com/)
    - a popular open-source time series-database
  - [Prometheus](https://prometheus.io/)
    - a popular open-source time series database, typically used for monitoring purposes
  - [Graphite](https://graphiteapp.org/)
## Graph Database
- a type of database that stores data following the graph data model
- data entries in a graph database can have explicitly defined relationships
  - much like nodes in a graph can have edges
- graph databases take advantage of their underlying graph structure to perform complex queries on deeply connected data very fast
- graph database are thus often preferred to relational databases when dealing with systems where data points naturally form a graph and have multiple levels of relationships
  - e.g.: social networks
- database e.g.:
  - [Neo4j](https://neo4j.com/)
    - a popular graph database that consists of nodes, relationships, properties, and labels
## Cypher
- a graph query language that was originally developed for the Neo4j graph database
  - but has been standardized to be used with other graph databases in an effort to make it the SQL for graphs
- Cypher queries are often much simpler than their SQL counterparts
  - e.g.: Cypher query to find data in Neo4j, a popular graph database
    - ```MATCH (some_node:SomeLabel)-[:SOME_RELATIONSHIP]->(some_other_node:SomeLabel {some_property:'value'})```
## Spatial Database
- a type of database optimized for storing and querying spatial data like locations on a map
- Spatial databases rely on spatial indexes like quadtrees to quickly perform spatial queries like finding all locations in the vicinity of a region
### what is spatial data?
- anything that has to do with geometric space, basically locations on a map
### use cases
- if you are storing hotels in the world, or restaurants in a country, or designing google maps
### Spatial indexes examples
- there might be times where you might need to implement your own spatial indexes and storing it in memory
  - might be required if you are designing a system that really cares about very fast latencies, dealing with location based system or system that relies on spatial data, and you don't wanna be querying the database all the time
- in this day and age, a lot of databases e.g.: Postgres are smart and really optimized for all sorts of queries and data types
  - thus is possible that some databases like Postgres might provide out of the box solutions for spatial data
    - this is dependent on the interviewer, discuss with the interviewer to understand what they are looking for
#### Quadtree
- a tree data structure most commonly used to index 2 dimensional spatial data
- each node in a quadtree has either 0 children nodes (and is therefore a leaf node) or exactly 4 children nodes
- typically quadtree nodes contain some form of spatial data
  - e.g.: locations on a map with a maximum capacity of some specified number n
  - so long as nodes aren't at capacity, they remain leaf nodes
  - once they reach capacity, they're given 4 children nodes, and their data entries are split across 4 children nodes
- a quadtree lends itself well to storing spatial data because it can be represented as a grid filled with rectangles that are recursively subdivided into 4 sub-rectangles
  - where each quadtree node is represented by a rectangle and each rectangle represents a spatial region
  - assuming we're storing locations in the world, we can imagine a quadtree with a maximum node-capacity n as follows
    - the root node, which represents the entire world, is the outermost rectangle
    - if the entire world has more than n locations, the outmost rectangle is divided into 4 quadrants, each representing a region of the world
    - so long as a region has more than n locations, its corresponding rectangle is subdivided into 4 quadrants (the corresponding node in the quadtree is given 4 children nodes)
    - regions that have fewer than n locations are undivided rectangles (leaf nodes)
    - the parts of the grid that have many subdivided rectangles represent densely populated areas (like rural areas)
- finding a given location in a perfect quadtree is an extremely fast operation that runs in log4(x) time (where x is the total number of locations), since quadtree nodes have 4 children nodes
#### R-trees
#### K-D trees
#### M-trees
