# Caching
- improves speed and performance of application
  - reading from memory is faster than disk, 50 - 200 times faster
  - can serve the same amount of traffic with fewer resources
  - pre-calculate and cache data in advance
  - most apps have far more reads than writes, perfect for caching
- saves money long term
## Definition
- It is like short-term memory
  - has a limited amount of space
  - but is typically faster than the original data source
  - contains the most recently accessed items
- caching enables
  - better use of already available resources
  - unattainable product requirements feasible
- take advantage of the locality of reference principle "recently requested data is likely to be requested again"
- used in almost every layer of computing
  - e.g.: hardware, operating systems, web browsers, web applications, etc
- can exist at all levels in architecture
  - but are often found at the level nearest to the front end
    - where they are implemented to return data quickly without taxing downstream levels
## use cases
- most likely will use caching in all, or almost all of the Systems Design interviews
- the reason for using caching is to avoid redoing the same operations, especially computationally complex operations that might take a lot of time for multiple times
- therefore, caching is used to speed up a system, to reduce or improve the latency of a system
  - caching is storing data in a location that's different from the 1 where the data originally is, such that it's faster to access this data from this new location
- it can also be used in a bunch of places in a system
  - can cache at the client level so that it no longer requires to request data from the server
  - can also cache at the server level
    - if a client always need to interact with the server
    - but the server doesn't always need to go to the database to retrieve the data
    - so the server will go to the database once and caches it at the server level
  - can also cache in between 2 components in a system
    - e.g.: cache in between a server and a database
  - can also cache at the hardware level
    - there is a lot of caching going on at the hardware level in modern day computers
      - e.g.: CPU caches: are caches that live at the CPU level
        - this makes it faster to retieve data from memory
- in summary: caching while it is great, has a lot of pitfalls, and we have to watch out for those pitfalls
  - in general, if the data that we are dealing with is static or immutable data then caching is good
  - however, if data is mutable, then things will be trickier
    - because there will be 2 different locations where the data exists
    - have to make sure these locations are in sync
      - else the data might become stale, depending on the use case this might not be good
  - a rule of thumb: consider caching if only storing static or immutable data
    - consider caching if only have a single thing reading or writing that data
    - consider caching is data consitency or staleness is not important
## Times when caching will be helpful
1. when doing a lot of network requests and you want to avoid doing all of the network requests
    - taking the client -> server -> database model
      - requests from client to server, then to database
      - response from the database to server, then to client
    - caching at the client level or server level will avoid unneccessary network requests
2. when doing very computationally long operation
    - caching at the logic location where it takes time to compute would help save time
3. when reading from the database multiple times is not desired
    - can either have a single cache at some detached componentwhere all servers to refer to
      - such as a ```Redis``` a popular in-memory database which uses a key value store
    - or each server will have its own cache
## Cache Invalidation
- Caching requires maintenance for keeping cache coherent with the source of truth (e.g., database)
- If the data is modified in the database
  - it should be invalidated in the cache
  - else can cause inconsistent application behavior
  - This problem is solved via Cache Invalidation
### Understanding the problem
- if we are designing a system or web app, where users can read, write, and edit posts
  - we have the client (browser) that the user is interacting with
  - we have the server where a user who's writing a post makes a request to the server to write the post
  - we have the database where the post are stored
  - if we want to cache the posts at for example the server level
    - now we have 2 sources of truth
      - posts are now stored in the database and in the server
    - so if user edits a post
      - client makes a network request with the new post
      - server make a network request to the database and stores the post in the database
      - post is also stored at the server as cache when it got displayed in the browser
    - an issue arises: how to deal with these 2 sources of truth
      - how to know when to write to the cache and when to write to the database?
        - do it at the same time? do not do that at the same time?
### First popular type: Write through cache
- it is type of caching system where when you make an edit or write to a piece of data
  - the system will write that piece of data both in cache and in the main source of truth (in this case the database) at the same time / operation
    - cached data allows for fast retrieval
    - same data gets written in the permanent storage
      - this will have complete data consistency between the cache and the storage
    - ensures that nothing will get lost in case of a crash, power failure, or other system disruptions
   
  |pros|cons|
  |-|-|
  |allows the cache and database to always be in sync|higher latency for write operations, because every write operation must be done twice before returning success to the client|
  |minimizes the risk of data loss|have to go to the database everytime the cache or database is overwritten, thus doing both things as the same time|
  
### Second popular type: Write back cache
- difference between this and the ```Write through cache``` is that the server update only the cache
  - cache will be out of sync with the database
    - the system will asynchronously update the database with the values that are stored in the cache
      - can be done in different ways
        - on certain intervals
          - e.g.: every 5 seconds, 5 minutes, or every 5 hours
          - or a different type of schedule e.g.: whenever cache gets filled up and requires eviction

- in summary: whenever a user makes a network request to the server to make any modifications, only the cache will be updated, and then later at a specific schedule, the database will be asynchronously updated

  |pros|cons|
  |-|-|
  |write to the permanent storage is done after specified intervals or under certain conditions, results in low latency and high throughput for write-intensive applications| this speed comes with the risk of data loss in case of a crash or other adverse event, because the only copy of the written data is in the cache|
  ||if something ever happens to the cache, and the data is lost before the database has been asynchronously updated, then the data will be lost permanently|
  ||data inconsistency or staleness will occur, especially if there are multiple servers with their own cache, for this case, it would be better to have 1 component solely for caching so that all servers can retrieve the similar cache data|

### Write around cache
- similar to write through cache
  - but data is written directly to permanent storage, bypassing the cache
  
  |pros|cons|
  |-|-|
  |can reduce the cache being flooded with write operations that will not subsequently be re-read|a read request for recently written data will create a “cache miss”|
  ||must be read from slower back-end storage and experience higher latency|
        
## Eviction policies for stale cache data
- determines how we get rid of stale data in caches
  - or what policy or rules we have to follow to get rid of data in caches
- there are lots of ways to evict data from a cache
  - thus depends on the use case, the product, or system that you are building or designing
  - therefore need to discuss with interviewer to figure out what things are valued
- 2 reasons for needing this
  1. preventing stale data
  2. caching only most valuable data to save resources
### TTL (Time to Live)
- set a time period before a cache entry is deleted automatically
- used to prevent stale data
- time set can depend on how essential it is for data to be fresh
  - example
    - blog post: very rarely it would be updated, so a longer cache time could be implemented
    - tweet counts: this does not need to be immediately updated, so data can remain stale for few seconds or even a minute
### FIFO (First In First Out) policy (most common)
- cache evicts the first block accessed first regardless of how often it was accessed before
### LIFO (Last In First Out) policy
- cache evicts the block accessed most recently first regarless of how often it was accessed before
### LRU (Least Recently Used) policy
- get rid of the least recently used pieces of data when cache is full
  - you have some way of tracking what pieces of data are the least recently used
    - usually based on assumption that a piece of data that was used least recently is the one that we least care about
### MRU (Most Recently Used) Policy
- Discards, in contrast to LRU, the most recently used items first
### LFU (Least Frequently Used) policy
- get rids of the least frequently used of that data, not necessarily the least recently used
  - track number of times key is accessed
  - drop lease used when cache is full
### RR (Random Replacement) Policy (least common)
- Randomly selects a candidate item and discards it to make space when necessary

## Caching layers
![alt text](https://github.com/reshinto/Basic_technologies_revision/raw/master/interviewPrep/system_design/images/cachingLayers.png "Caching Layers")

### DNS (Domain Name System) cache
- when typing a website address, you would go to an ip address first
  - before being able to retrieve the ip address, you would need to access it from a DNS server
- by caching the request to the DNS server once and storing it at the client, the client can then go to the ip address directly
### CDN (Content Delivery Network)
- it is a 3rd party service that acts like a cache for your servers
  - for sites serving large amounts of static media
- sometimes, web apps can be slow for users in a particular region if your servers are located only in another region
- a CDN has servers all around the world
  - this means that the latency to a CDN's servers will almost always be far better than the latency to your servers
- a CDN's servers are often referred to as PoPs (Points of Presence)
  - 2 of the most popular CDNs are ```Cloudflare``` and ```Google Cloud CDN```
- In a typical CDN setup
  - a request will first ask the CDN for a piece of static media
  - the CDN will serve that content if it has it locally available
  - If it isn’t available
    - the CDN will query the back-end servers for the file
    - cache it locally
    - serve it to the requesting user
- If the system we are building isn’t yet large enough to have its own CDN
  - can ease future transition
    - by serving the static media off a separate subdomain (e.g. static.yourservice.com)
      - using a lightweight HTTP server (e.g. Nginx)
    - cut-over the DNS from your servers to a CDN later
### Application Server Cache
- Placing a cache directly on a request layer node enables the local storage of response data
- Each time a request is made to the service, the node will quickly return local cached data if it exists
- If it is not in the cache, the requesting node will query the data from disk
- The cache on one request layer node could be located
  - in memory (very fast)
  - on the node’s local disk (faster than going to network storage)
- If the request layer is expanded to multiple nodes
  - possible to have each node host its own cache
  - however, if load balancer randomly distributes requests across the nodes
    - the same request will go to different nodes
      - thus increasing cache misses
      - 2 choices for overcoming this hurdle: 1) global caches 2) distributed caches

![alt text](https://github.com/reshinto/Basic_technologies_revision/raw/master/interviewPrep/system_design/images/appServerCache.png "App Server Cache")

### Database
- most database would have their own internal caching to cache frequent accessed data
## Terms used
### Cache
- a piece of hardware or software that stores data, typically meant to retrieve that data faster than otherwise
- caches are often used to store responses to network requests as well as results of computationally-long operations
- data in a cache can become ```stale``` if the main source of truth for that data (i.e. the main database behind the cache) gets updates and the cache doesn't
### Cache Hit
- when requested data is found in a cache
### Cache Miss
- when requested data could have been found in a cache but isn't
- this is typically used to refer to a negative consequence of a system failure or of a poor design choice
  - e.g.: if a server goes down, our load balancer will have to forward requests to a new server, which will result in cache misses
## Distributed Cache
- works same as traditional cache
- has built-in functionality to replicate data
- shard data across servers if amount of data is too big for a single server
- and locate proper server for each key
- reason for doing this is, at scale, you don't want your entire system to break down just because your single cache server goes down
  - you'll want some replication to ensure system is more reliable
- whenever an active server is down, the application will detect it and reroute it to a passive server
  - under ideal conditions, the passive servers will not do anything
  - before a passive server gets brought up online, it needs to be `warm-up` which is to pre-query the database and fill up the cache data

![alt text](https://github.com/reshinto/Basic_technologies_revision/raw/master/interviewPrep/system_design/images/distributedCache.png "Distributed Cache")


## Code example
### Caching retrieval
```python
def app_request(tweet_id):
    cache = {}
    data = cache.get(tweet_id)
    if data:
        return data
    else:
        data = db_query(tweet_id)
        # set data in cache
        cache[tweet_id] = data
        return data
```
### Caching writing
```python
def app_update(tweet_id, data):
    cache = {}
    db_update(data)
    cache.pop(tweet_id)
```
