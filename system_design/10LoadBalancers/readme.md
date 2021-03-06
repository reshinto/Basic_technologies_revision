# Load Balances
- it acts as a digital traffic cop for the system, distributing network requests across multiple servers and ensuring that the system operates at peak performance day and night
- load balancers can also be overloaded, therefore multiple load balancers can be used
  - different server selection strategies can also be applied to different load balancers
  - load balancers can also communicate between each other so as to determine the best redirection strategy for the specific request
- it is a type of reverse proxy that distributes traffic across servers
  - can be found in many parts of a system, from the DNS layer all the way to the database layer
## How does a load balancer gets updated information on the servers
- depends on configurations
- can either register the new server or deregister a removed server by itself
- or someone has to update and configure the information
## 2 types of load balancers
### Software type
- can do more compared to hardware type, as it has more power over customization and scaling
### Hardware type
- they are physical machines that are dedicated to load balancing
- limited to the hardware that is given
- hardware is often expensive
## possible ways to solve server overload
### Vertically scale the system
- this is to increase the power of the server, however, this will be limited as there is only so much we can do to increase the performance of a single server of a single machine
### Horizontally scale the system
- this is by adding more machines or add more servers to the system
- however this requires a strategy to be put in place to allow clients to know which server to make the request from
  - in this case, a load balance will be useful
## Terms used
### Server-Selection Strategy
- commonly used strategies a load balancer uses to choose servers when distributing traffic amongst multiple servers
  - round-robin
    - it goes through all servers in 1 order
      - so if clients issues request and goes through the load balancer
      - the load balancer will then distribute the request to the first server, then to the second server and so on, before going back to the first server again
  - weighted round-robin
    - place weights on specific servers
    - order of servers from 1st to last will still be followed
      - however, the number of redirection of requests per server will depend on the weight it was given
      - therefore, some server might take on more request than others due to more weight
        - this is done because some servers might be more powerful than the others
  - random selection
    - could cause problems
      - 1 server by chance could get overloaded
  - performance-based or load-based selection
    - choosing the server with the best performance metrics by conducting health checks
      - e.g.: how much traffic a server is handling at an given time
      - how long a server is taking to respond to traffic
      - how much resources a server is using
  - IP-based routing
    - when load balancer gets requests from clients
      - it hashes the clients IP addresses
        - depending on the value of the hash it will redirect to the server accordingly
    - this strategy can be useful if got caching going on in the servers
      - if we are caching the results of requests in the servers
        - it will be helpful to have requests from a specific client always be redirected to the server in which the response of that particular client's request has been cached
    - this can help you maximize cache hits
  - path-based server selection
    - load balancer distributes requests to servers according to the path of the requests
      - for example, it could be split based on features, payments related feature is redirected to payment handled related servers, and other features related requests are redirected to their respective related servers
    - this is useful as if we want to deploy a big change to a service
      - this will only affect the servers that handles this service
### Hot Spot
-when distributing a workload across a set of servers, that workload might be spread unevenly
  - this can happen if the ```sharding key``` or the ```hashing function``` are suboptimal
  - or if workload is naturally skewed
    - some servers receiving a lot more traffic than others, thus creating a ```hot spot```
