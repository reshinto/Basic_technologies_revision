# Caching
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
## 2 popular types of caches that caches data for reading and writing
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
  - pros: allows the cache and database to always be in sync
  - cons: still have to go to the database as everytime the cache or database is overwritten, you would be doing both things as the same time
### Second popular type: Write back cache
- difference between this and the ```Write through cache``` is that the server is gonna update only the cache
  - cache will be out of sync with the database
    - the system will asynchronously update the database with the values that are stored in the cache
      - can be done in different ways
        - on certain intervals
          - e.g.: every 5 seconds, 5 minutes, or every 5 hours
          - or a different type of schedule e.g.: whenever cache gets filled up and requires eviction
- in summary: whenever a user makes a network request to the server to make any modifications, only the cache will be updated, and then later at a specific schedule, the database will be asynchronously updated
- cons: if something ever happens to the cache, and the data is lost before the database has been asynchronously updated, then the data will be lost permanently
  - data inconsistency or staleness will occur, especially if there are multiple servers with their own cache
    - for this case, it would be better to have 1 component solely for caching so that all servers can retrieve the similar cache data
## Eviction policies for stale cache data
- determines how we get rid of data in caches
  - or what policy or rules we have to follow to get rid of data in caches
- there are lots of ways to evict data from a cache
  - thus depends on the use case, the product, or system that you are building or designing
  - therefore need to discuss with interviewer to figure out what things are valued
### LRU (Least Recently Used) policy
- get rid of the least recently used pieces of data in a cache
  - you have some way of tracking what pieces of data are the least recently used
    - usually based on assumption that a piece of data that was used least recently is the one that we least care about
### LFU (Least Frequently Used) policy
- get rids of the least frequently used of that data, not necessarily the least recently used
### LIFO (Last In First Out) policy
### FIFO (First In First Out) policy
### Random policy
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
### Cache Eviction Policy
- the policy by which values get evicted or removed from a cache
- popular cache eviction polices include LRU (Least Recently Used), FIFO (First in First out), and LFU (Least-Frequently Used)
### CDN (Content Delivery Network)
- it is a 3rd party service that acts like a cache for your servers
- sometimes, web apps can be slow for users in a particular region if your servers are located only in another region
- a CDN has servers all around the world
  - this means that the latency to a CDN's servers will almost always be far better than the latency to your servers
- a CDN's servers are often referred to as PoPs (Points of Presence)
  - 2 of the most popular CDNs are ```Cloudflare``` and ```Google Cloud CDN```
