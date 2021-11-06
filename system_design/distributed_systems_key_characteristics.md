# Distributed System Characteristics
## Common characteristics of a Distributed system that it would have
### No shared clock
- all individual servers are running on their own time
  - this leads to an issue called `clock drift`
    - where the timers on each computer get out of sync
      - leading to big issues with ordering of events
      - if problem is not handled, possible of getting an error such as negative latency looking like time travel
        - because if 1 clock is off on a computer and when it sends a request to another
          - the timestamp on the request will be out of sync with the other computer
- according to google, if a server is synchronized once a day
  - you can get a 17 second drift in either direction
    - this will cause a huge issue for apps related to stock exchange or auction site like ebay
  - google handle the problem by using true time
    - which is using a combination of gps receivers and an atomic clock
### No shared memory
- each node or server in the system is going to have its own RAM, its own storage
  - if it needs data from somewhere else, it would need to request that from the part of the system that does have it
### Shared resources
- anything in the distributed system should be able to be shared between nodes on the system
  - can be hardware, software or data
### Concurrency and Consistency
- the different part of the system are going to be working together and working at the same time
  - need to make sure that there's consistency between how that all works

## Distributed System Communication
### Different parts of Distribute System need to be able to communicate
- since information needs to be passed around the distributed system
  - they need some way to communicate
### Requires agreed upon format or protocol for communication
- lots of strategies to do this
  - but at basic level it requires some sort of uniform format or protocol
    - so that the different parts can understand what the others are saying when they pass messages back and forth
### Lots of things can go wrong, need to handle them somehow
- when communications are being done on scale, a lot of things can go wrong that was not thought about
  - client can't find server
    - it sends a request, but the server is not responding
    - need a way for the client to find another server that can serve it
  - server crash mid request
    - when a client connects to a server, but during the processing, the server breaks down
    - need a way to resent that request
  - server response is lost
    - when a server has a response, however the network fails when sending it back to the client
    - server thinks the job is done, but client still doesn't have the response
  - client crashes
    - when client breaks when the server is processing, and thus when the server is done, it has nothing to send the data back to
    - server would need to store that response until it detects the client again and then it can send the data out

## Benefits
### More reliable, fault tolerant
- when running on a single machine, if it goes down, the entire system goes down
### Scalability
- the whole system is designed to work on multiple machines
  - it's very easy to just add a few more machines or nodes
- so if you are gradually getting more traffic
  - it's really easy to add some more nodes and scale up
### Lower latency, increased performance
- can have the application running out of multiple data centers all around the world
  - this means server is closer to user so it's reduced latency increased performance
### Cost effective
- at some point, it's not possible to just buy a larger single machine
- with a distributed system, you can buy a bunch of commodity servers that are very cheap
  - can buy in bulk and then just run the software off those

## Fallacies
- network is reliable
- latency is 0
- bandwidth is finite
- topology doesn't change
- network is secure
- only 1 administrator
- transport cost is 0

## System Design Performance Metrics
* Scalability, Reliability, Availability, Efficiency, and Manageability

### Scalability
* It is the capability of a system, process, or a network to grow and manage increased demand
  * Any distributed system that can continuously evolve in order to support the growing amount of work is considered to be scalable
* A good scalable architecture attempts to balance the load on all the participating nodes evenly
#### Horizontal vs Vertical Scaling
* Horizontal Scaling: scale by adding more servers into the pool of resources
  * easier to scale dynamically by adding more machines into existing pool
  * e.g.: Cassandra, MongoDB (allow easy way to scale horizontally by adding more machines to meet growing needs)
* Vertical Scaling: scale by adding more power (CPU, RAM, Storage, etc.) to an existing server
  * usually limited to the capacity of a single server
  * scaling beyong the capacity often involves downtime and comes with an upper limit
  * e.g.: MySQL (allow easy way to scale vertically by switching from smaller to bigger machines, however, this process often involves downtime)
![alt text](https://github.com/reshinto/Basic_technologies_revision/raw/master/system_design/images/verticalScaling_vs_horizontalScaling.png "Vertical scaling vs. Horizontal scaling")
### Reliability
* It is the probability a system will fail in a given period
  * meaning: a distributed system is considered reliable if it keeps delivering its services even when one or several of its software or hardware components fail
* Redundancy is use to protect a transaction should it fail due to the machine that is running the transaction
  * in this case, another server that has the exact replica will replace the data stored
* Redundancy has a cost
  * reliable system has to pay the cost to achieve such resilience for services
    * by eliminating every single point of failure
### Availability
* It is the time a system remains operational to perform its required function in a specific period
  * a simple measure of the percentage of time that a system, service, or a machine remains operational under normal conditions
  * takes into account maintainability, repair time, spares availability, and other logistics considerations
  * Reliability is availability over time considering the full range of possible real-world conditions that can occur
* If a system is reliable, it is available
  * However, if it is available, it is not necessarily reliable
  * meaning: high reliability contributes to high availability
    * but it is possible to achieve a high availability even with an unreliable product
      * by minimizing repair time and ensuring that spares are always available when they are needed
### Efficiency
* 2 standard measures of its efficiency
  1. the response time (or latency) that denotes the delay to obtain the first item
  2. the throughput (or bandwidth) which denotes the number of items delivered in a given time unit (e.g., a second)
      * The 2 measures correspond to the following unit costs
        1. Number of messages globally sent by the nodes of the system regardless of the message size
        2. Size of messages representing the volume of data exchanges
* The complexity of operations supported by distributed data structures can be characterized as a function of one of these cost units
  * the analysis of a distributed structure in terms of ‘number of messages’ is over-simplistic
    * It ignores the impact of network topology, network load, its variation, the possible heterogeneity of the software and hardware components involved in data processing and routing, etc
      * However, it is difficult to develop a precise cost model that would accurately take into account all these performance factors
      * therefore, we have to live with rough but robust estimates of the system behavior
### Manageability
* The system must be easy to operate and maintain
  * Serviceability or manageability is the simplicity and speed with which a system can be repaired or maintained
  * if the time to fix a failed system increases, then availability will decrease
* Things to consider for manageability
  * ease of diagnosing and understanding problems when they occur
  * ease of making updates or modifications
  * how simple the system is to operate
* Early detection of faults can decrease or avoid system downtime
