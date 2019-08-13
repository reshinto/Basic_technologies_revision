# Key characteristics of a distributed system
* Scalability, Reliability, Availability, Efficiency, and Manageability

## Scalability
* It is the capability of a system, process, or a network to grow and manage increased demand
    * Any distributed system that can continuously evolve in order to support the growing amount of work is considered to be scalable
* A good scalable architecture attempts to balance the load on all the participating nodes evenly
### Horizontal vs Vertical Scaling
* Horizontal Scaling: scale by adding more servers into the pool of resources
    * easier to scale dynamically by adding more machines into existing pool
    * e.g.: Cassandra, MongoDB (allow easy way to scale horizontally by adding more machines to meet growing needs)
* Vertical Scaling: scale by adding more power (CPU, RAM, Storage, etc.) to an existing server
    * usually limited to the capacity of a single server
    * scaling beyong the capacity often involves downtime and comes with an upper limit
    * e.g.: MySQL (allow easy way to scale vertically by switching from smaller to bigger machines, however, this process often involves downtime)
![alt text](https://github.com/reshinto/Basic_technologies_revision/raw/master/system_design/images/verticalScaling_vs_horizontalScaling.png "Vertical scaling vs. Horizontal scaling")
## Reliability
* It is the probability a system will fail in a given period
    * meaning: a distributed system is considered reliable if it keeps delivering its services even when one or several of its software or hardware components fail
* Redundancy is use to protect a transaction should it fail due to the machine that is running the transaction
    * in this case, another server that has the exact replica will replace the data stored
* Redundancy has a cost
    * reliable system has to pay the cost to achieve such resilience for services
        * by eliminating every single point of failure
## Availability
* It is the time a system remains operational to perform its required function in a specific period
    * a simple measure of the percentage of time that a system, service, or a machine remains operational under normal conditions
    * takes into account maintainability, repair time, spares availability, and other logistics considerations
    * Reliability is availability over time considering the full range of possible real-world conditions that can occur
* If a system is reliable, it is available
    * However, if it is available, it is not necessarily reliable
    * meaning: high reliability contributes to high availability
        * but it is possible to achieve a high availability even with an unreliable product
            * by minimizing repair time and ensuring that spares are always available when they are needed
## Efficiency
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
## Manageability
* The system must be easy to operate and maintain
    * Serviceability or manageability is the simplicity and speed with which a system can be repaired or maintained
    * if the time to fix a failed system increases, then availability will decrease
* Things to consider for manageability
    * ease of diagnosing and understanding problems when they occur
    * ease of making updates or modifications
    * how simple the system is to operate
* Early detection of faults can decrease or avoid system downtime
