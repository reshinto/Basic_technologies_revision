# Caching
* It is like short-term memory
  * has a limited amount of space
  * but is typically faster than the original data source
  * contains the most recently accessed items
* caching enables
  * better use of already available resources
  * unattainable product requirements feasible
* take advantage of the locality of reference principle "recently requested data is likely to be requested again"
* used in almost every layer of computing
  * e.g.: hardware, operating systems, web browsers, web applications, etc
* can exist at all levels in architecture
  * but are often found at the level nearest to the front end
    * where they are implemented to return data quickly without taxing downstream levels
## Application server cache
* Placing a cache directly on a request layer node enables the local storage of response data
* Each time a request is made to the service, the node will quickly return local cached data if it exists
* If it is not in the cache, the requesting node will query the data from disk
* The cache on one request layer node could be located
  * in memory (very fast)
  * on the node’s local disk (faster than going to network storage)
* If the request layer is expanded to multiple nodes
  * possible to have each node host its own cache
  * however, if load balancer randomly distributes requests across the nodes
    * the same request will go to different nodes
      * thus increasing cache misses
      * 2 choices for overcoming this hurdle: 1) global caches 2) distributed caches
## Content Distribution Network (CDN)
* a kind of cache that comes into play for sites serving large amounts of static media
* In a typical CDN setup
  * a request will first ask the CDN for a piece of static media
  * the CDN will serve that content if it has it locally available
  * If it isn’t available
    * the CDN will query the back-end servers for the file
    * cache it locally
    * serve it to the requesting user
* If the system we are building isn’t yet large enough to have its own CDN
  * can ease future transition
    * by serving the static media off a separate subdomain (e.g. static.yourservice.com)
      * using a lightweight HTTP server (e.g. Nginx)
    * cut-over the DNS from your servers to a CDN later
## Cache Invalidation
* Caching requires maintenance for keeping cache coherent with the source of truth (e.g., database)
* If the data is modified in the database
  * it should be invalidated in the cache
  * else can cause inconsistent application behavior
  * This problem is solved via Cache Invalidation
    * have 3 main schemes that are used
      1. Write-through cache
          * data is written into the cache and the corresponding database at the same time
          * cached data allows for fast retrieval
          * same data gets written in the permanent storage
            * this will have complete data consistency between the cache and the storage
          * ensures that nothing will get lost in case of a crash, power failure, or other system disruptions
          * Advantage: minimizes the risk of data loss
          * Disadvantage: higher latency for write operations
            * because every write operation must be done twice before returning success to the client
      2. Write-around cache
          * similar to write through cache
          * but data is written directly to permanent storage, bypassing the cache.
          * Advantage: can reduce the cache being flooded with write operations that will not subsequently be re-read
          * Disadvantage:
            * a read request for recently written data will create a “cache miss”
            * must be read from slower back-end storage and experience higher latency
      3. Write-back cache
          * data is written to cache alone and completion is immediately confirmed to the client
          * write to the permanent storage is done after specified intervals or under certain conditions
            * results in low latency and high throughput for write-intensive applications
              * however, this speed comes with the risk of data loss in case of a crash or other adverse event
                * because the only copy of the written data is in the cache
## Cache eviction policies
* most common cache eviction policies
  1. First In First Out (FIFO)
      * cache evicts the first block accessed first regardless of how often it was accessed before
  2. Last In First Out (LIFO)
      * cache evicts the block accessed most recently first regarless of how often it was accessed before
  3. Least Recently Used (LRU)
      * Discards the least recently used items first
  4. Most Recently Used (MRU)
      * Discards, in contrast to LRU, the most recently used items first
  5. Least Frequently Used (LFU)
      * Counts how often an item is needed. Those that are used least often are discarded first
  6. Random Replacement (RR)
      * Randomly selects a candidate item and discards it to make space when necessary
