# Load Balancing (LB)
* Definition: the process of distributing network traffic across multiple servers
    * ensures no single server bears too much demand
    * By spreading the work evenly
        * load balancing improves application responsiveness
    * increases availability of applications and websites for users
    * Modern applications cannot run without load balancers
    * Over time, software load balancers have added additional capabilities including security and application
* It helps to spread the traffic across a cluster of servers
    * to improve responsiveness and availability of applications, websites or databases
* keeps track of the status of all the resources while distributing requests
* LB will stop sending traffic to such a server if
    * a server is not available to take new requests
    * is not responding or has elevated error rate
* Typically
    * LB sits between client and server
        * accepts incoming network and application traffic
        * distributing the traffic across multiple backend servers
    * By balancing application request across multiple servers
        * LB reduces individual server load
        * LB prevents any one application server from becoming a single point of failure
        * thus improving overall application availability and responsiveness
![alt text](https://github.com/reshinto/Basic_technologies_revision/system_design/images/loadBalancer.png "Load Balancer")
* To utilize full scalability and redundancy
    * can try to balance the load at each layer of the system at 3 places
        1. Between the user (client) and the web server
        2. Between web servers and an internal platform layer, like application servers or cache servers
        3. Between internal platform layer and database
![alt text](https://github.com/reshinto/Basic_technologies_revision/system_design/images/LB_3places.png "LB 3 places")
## Benefits of Load Balancing
* Users experience faster, uninterrupted service
    * Users won’t have to wait for a single struggling server to finish its previous tasks
    * requests are immediately passed on to a more readily available resource
* Service providers experience less downtime and higher throughput
    * a full server failure won’t affect the end user experience
        * Because load balancer will route around it to a healthy server
* Load balancing makes it easier for system administrators to handle incoming requests
    * it also decreases wait time for users
* Smart load balancers provide benefits that determine traffic bottlenecks before they happen
    * e.g.: predictive analytics
    * thus, smart load balancer gives an organization actionable insights
    * These are key to automation and can help drive business decisions
* System administrators experience fewer failed or stressed components
    * load balancing has several devices perform a little bit of work
        * Instead of a single device performing a lot of work
## Load Balancing Algorithms
* How does the load balancer choose the backend server?
    * Load balancers consider 2 factors before forwarding a request to a backend server
        1. ensure that the server they choose is actually responding appropriately to requests
        2. then use a pre-configured algorithm to select one from the set of healthy servers
* Health Checks
    * Load balancers should only forward traffic to “healthy” backend servers
    * To monitor the health of a backend server
        * “health checks” regularly attempt to connect to backend servers to ensure that servers are listening
    *  If a server fails a health check
        * it is automatically removed from the pool
        * traffic will not be forwarded to it until it responds to the health checks again
* Load balancing methods
    * Least Connection Method
        * directs traffic to the server with the fewest active connections
        * useful when there are a large number of persistent client connections which are unevenly distributed between the servers
    * Least Response Time Method
        * directs traffic to the server with the fewest active connections and the lowest average response time
    * Least Bandwidth Method
        * selects the server that is currently serving the least amount of traffic measured in megabits per second (Mbps)
    * Round Robin Method
        * cycles through a list of servers and sends each new request to the next server
            * When it reaches the end of the list, it starts over at the beginning
            * is most useful when the servers are of equal specification and there are not many persistent connections
    * Weighted Round Robin Method
        * designed to better handle servers with different processing capacities
            * Each server is assigned a weight (an integer value that indicates the processing capacity)
            * Servers with higher weights receive new connections before those with less weights
            * servers with higher weights get more connections than those with less weights
    * IP Hash
        * a hash of the IP address of the client is calculated to redirect the request to a server
## Redundant Load Balancers
* load balancer can be a single point of failure
    * to overcome this, a second load balancer can be connected to the first to form a cluster
    * Each LB monitors the health of the other
    * both of them are equally capable of serving traffic and failure detection
        * in the event the main load balancer fails, the second load balancer takes over
![alt text](https://github.com/reshinto/Basic_technologies_revision/system_design/images/redundantLoadBalancers.png "Redundant Load Balancers")
## Types of Load Balancing
* SDN (software-defined networking)
    * separates the control plane from the data plane for application delivery
        * This allows the control of multiple load balancing
        * helps the network to function like the virtualized versions of compute and storage
        * With the centralized control
            * networking policies and parameters can be programmed directly
                * for more responsive and efficient application services
* UDP (User Datagram Protocol)
    * used for live broadcasts and online games when speed is important and there is little need for error correction
    * has low latency because it does not provide time-consuming health checks
* TCP (transmission control protocol)
    * provides a reliable and error-checked stream of packets to IP addresses
        * which can otherwise easily be lost or corrupted
* SLB (Server Load Balancing)
    * provides network services and content delivery using a series of load balancing algorithms
    * prioritizes responses to the specific requests from clients over the network
    * distributes client traffic to servers to ensure consistent, high-performance application delivery
* Virtual
    * mimic software-driven infrastructure through virtualization
    * runs the software of a physical load balancing appliance on a virtual machine
    * do not avoid the architectural challenges of traditional hardware appliances
        * which include limited scalability and automation, and lack of central management
* Elastic
    * scales traffic to an application as demand changes over time
    * uses system health checks to learn the status of application pool members (application servers)
    * routes traffic appropriately to available servers
    * manages fail-over to high availability targets
    * automatically spins-up additional capacity
* Geographic
    * redistributes application traffic across data centers in different locations for maximum efficiency and security
    * uses multiple data centers in many locations
        * local load balancing on the other hand, happens within a single data center
* Multi-site
    * also known as global server load balancing (GSLB)
    * distributes traffic across servers located in multiple sites or locations around the world
    * servers can be on-premises or hosted in a public or private cloud
    * important for quick disaster recovery and business continuity after a disaster in one location renders a server inoperable
* LBaaS (Load Balancer as a Service)
    * uses advances in load balancing technology
        * to meet the agility and application traffic demands of organizations implementing private cloud infrastructure
    * Using an as-a-service model
        * creates a simple model for application teams to spin up load balancers
