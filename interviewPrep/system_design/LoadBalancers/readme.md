# Load Balancers
- it acts as a digital traffic cop for the system, distributing network requests across multiple servers and ensuring that the system operates at peak performance day and night
  - ensures no single server bears too much demand
  - By spreading the work evenly
    - load balancing improves application responsiveness
  - increases availability of applications and websites for users
  - Modern applications cannot run without load balancers
  - Over time, software load balancers have added additional capabilities including security and application
  - It helps to spread the traffic across a cluster of servers
    - to improve responsiveness and availability of applications, websites or databases
  - keeps track of the status of all the resources while distributing requests
  - LB will stop sending traffic to such a server if
    - a server is not available to take new requests
    - is not responding or has elevated error rate
  - basically it helps to improve reliability and scalability of the app
- load balancers can also be overloaded, therefore multiple load balancers can be used
  - different server selection strategies can also be applied to different load balancers
  - load balancers can also communicate between each other so as to determine the best redirection strategy for the specific request
- it is a type of reverse proxy that distributes traffic across servers
  - can be found in many parts of a system, from the DNS layer all the way to the database layer
- Typically
  - LB sits between client and server
    - accepts incoming network and application traffic
    - distributing the traffic across multiple backend servers
  - By balancing application request across multiple servers
    - LB reduces individual server load
    - LB prevents any one application server from becoming a single point of failure
    - thus improving overall application availability and responsiveness
    ![alt text](https://github.com/reshinto/Basic_technologies_revision/raw/master/interviewPrep/system_design/images/loadBalancer.png "Load Balancer")
- To utilize full scalability and redundancy
  - can try to balance the load at each layer of the system at 3 places
    1. Between the user (client) and the web server
    2. Between web servers and an internal platform layer, like application servers or cache servers
    3. Between internal platform layer and database
    ![alt text](https://github.com/reshinto/Basic_technologies_revision/raw/master/interviewPrep/system_design/images/LB_3places.png "LB 3 places")
## How does a load balancer gets updated information on the servers
- depends on configurations
- can either register the new server or deregister a removed server by itself
- or someone has to update and configure the information
## 2 layer types of load balancer
### Layer 4
- only has access to TCP and UDP data
- faster because it does not need to use as much processing power to look at each request
- lack of information can lead to uneven traffic
- most popular Layer 4 load balancing techniques are:
  - round-robin, weighted round-robin, least connections, weighted least connections
### Layer 7
- full access to HTTP protocol and data
- can terminate SSL and decrypt traffic
- check for authentication
- smarter routing options
- more cpu intensive
  - but is no longer a big factor due to the drop in hardware costs over the years
- the staff who are responsible for the apps themselves need to ensure that their apps are perfectly tuned for optimal application performance
- Layer 7 switching directs its requests at the application layer, this type of switching is also known as:
  - Request switching, Application switching, Content based routing
## 2 types of load balancers
### Software or Hardware type
- SLB (Server Load Balancing)
    - provides network services and content delivery using a series of load balancing algorithms
    - prioritizes responses to the specific requests from clients over the network
    - distributes client traffic to servers to ensure consistent, high-performance application delivery
### Software type
- can do more compared to hardware type, as it has more power over customization and scaling
- examples: Nginx, HAProxy
  - SDN (software-defined networking)
    - separates the control plane from the data plane for application delivery
      - This allows the control of multiple load balancing
      - helps the network to function like the virtualized versions of compute and storage
      - With the centralized control
        - networking policies and parameters can be programmed directly
          - for more responsive and efficient application services
  - UDP (User Datagram Protocol)
    - used for live broadcasts and online games when speed is important and there is little need for error correction
    - has low latency because it does not provide time-consuming health checks
  - TCP (transmission control protocol)
    - provides a reliable and error-checked stream of packets to IP addresses
      - which can otherwise easily be lost or corrupted
  - Virtual
    - mimic software-driven infrastructure through virtualization
    - runs the software of a physical load balancing appliance on a virtual machine
    - do not avoid the architectural challenges of traditional hardware appliances
      - which include limited scalability and automation, and lack of central management
  - Elastic
    - scales traffic to an application as demand changes over time
    - uses system health checks to learn the status of application pool members (application servers)
    - routes traffic appropriately to available servers
    - manages fail-over to high availability targets
    - automatically spins-up additional capacity
  - LBaaS (Load Balancer as a Service)
    - uses advances in load balancing technology
      - to meet the agility and application traffic demands of organizations implementing private cloud infrastructure
    - Using an as-a-service model
      - creates a simple model for application teams to spin up load balancers
### Hardware type: F5, Citrix
- they are physical machines that are dedicated to load balancing
- limited to the hardware that is given
- hardware is often expensive
  - as it could lead to vendor lock-in
- can handle tons of taffic because they are specifically designed only to be load balancers
- examples
  - Geographic
    - redistributes application traffic across data centers in different locations for maximum efficiency and security
    - uses multiple data centers in many locations
      - local load balancing on the other hand, happens within a single data center
  - Multi-site
    - also known as global server load balancing (GSLB)
    - distributes traffic across servers located in multiple sites or locations around the world
    - servers can be on-premises or hosted in a public or private cloud
    - important for quick disaster recovery and business continuity after a disaster in one location renders a server inoperable
## possible ways to solve server overload
### Vertically scale the system
- this is to increase the power of the server, however, this will be limited as there is only so much we can do to increase the performance of a single server of a single machine
### Horizontally scale the system
- this is by adding more machines or add more servers to the system
- however this requires a strategy to be put in place to allow clients to know which server to make the request from
  - in this case, a load balance will be useful
## Benefits of Load Balancing
- Users experience faster, uninterrupted service
  - Users won’t have to wait for a single struggling server to finish its previous tasks
  - requests are immediately passed on to a more readily available resource
- Service providers experience less downtime and higher throughput
  - a full server failure won’t affect the end user experience
    - Because load balancer will route around it to a healthy server
- Load balancing makes it easier for system administrators to handle incoming requests
  - it also decreases wait time for users
- Smart load balancers provide benefits that determine traffic bottlenecks before they happen
  - e.g.: predictive analytics
  - thus, smart load balancer gives an organization actionable insights
  - These are key to automation and can help drive business decisions
- System administrators experience fewer failed or stressed components
  - load balancing has several devices perform a little bit of work
    - Instead of a single device performing a lot of work
## Load Balancing Algorithms
- How does the load balancer choose the backend server?
  - Load balancers consider 2 factors before forwarding a request to a backend server
    1. ensure that the server they choose is actually responding appropriately to requests
    2. then use a pre-configured algorithm to select one from the set of healthy servers
- Health Checks
  - Load balancers should only forward traffic to “healthy” backend servers
  - To monitor the health of a backend server
    - “health checks” regularly attempt to connect to backend servers to ensure that servers are listening
  - If a server fails a health check
    - it is automatically removed from the pool
    - traffic will not be forwarded to it until it responds to the health checks again
- Load balancing methods / Server-Selection Strategy
  - Least Connection Method
    - check how much traffic a server is handling at an given time
    - directs traffic to the server with the fewest active connections
    - useful when there are a large number of persistent client connections which are unevenly distributed between the servers
      - such as chat or streaming apps
  - Least Response Time Method / performance-based selection
    - check how long a server is taking to respond to traffic
    - directs traffic to the server with the fewest active connections and the lowest average response time
  - Least Bandwidth Method / load-based selection
    - check how much resources a server is using
    - selects the server that is currently serving the least amount of traffic measured in megabits per second (Mbps)
  - Round Robin Method
    - cycles through a list of servers and sends each new request to the next server in 1 order
      - When it reaches the end of the list, it starts over at the beginning
      - is most useful when the servers are of equal specification and there are not many persistent connections
    - simplest type of routing, but can result in uneven traffic
  - Weighted Round Robin Method
    - designed to better handle servers with different processing capacities
      - Each server is assigned a weight (an integer value that indicates the processing capacity)
      - order of servers from 1st to last will still be followed
        - however, the number of redirection of requests per server will depend on the weight it was given
        - Servers with higher weights receive new connections before those with less weights
        - servers with higher weights get more connections than those with less weights
  - random selection
    - could cause problems
      - 1 server by chance could get overloaded
  - IP Hash / IP-based routing
    - when load balancer gets requests from clients
      - it hashes the clients IP addresses
        - depending on the value of the hash it will redirect to the server accordingly
    - this strategy can be useful if got caching going on in the servers
      - if we are caching the results of requests in the servers
        - it will be helpful to have requests from a specific client always be redirected to the server in which the response of that particular client's request has been cached
    - this can help you maximize cache hits
    - useful for stateful sessions
  - path-based server selection
    - load balancer distributes requests to servers according to the path of the requests
      - for example, it could be split based on features, payments related feature is redirected to payment handled related servers, and other features related requests are redirected to their respective related servers
    - this is useful as if we want to deploy a big change to a service
      - this will only affect the servers that handles this service 
## Redundant Load Balancers
- load balancer can be a single point of failure
  - to overcome this, a second load balancer can be connected to the first to form a cluster
  - Each LB monitors the health of the other
  - both of them are equally capable of serving traffic and failure detection
    - in the event the main load balancer fails, the second load balancer takes over
![alt text](https://github.com/reshinto/Basic_technologies_revision/raw/master/interviewPrep/system_design/images/redundantLoadBalancers.png "Redundant Load Balancers")
## Terms used
### Hot Spot
- when distributing a workload across a set of servers, that workload might be spread unevenly
  - this can happen if the ```sharding key``` or the ```hashing function``` are suboptimal
  - or if workload is naturally skewed
    - some servers receiving a lot more traffic than others, thus creating a ```hot spot```
