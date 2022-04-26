# Asynchronous Communications
## Example
### two strategies when dealing with system-to-system calls
#### traditional model which is the synchronous model (standard microservices communications)
- In a standard model, service-to-service communications is over HTTP using RESTful patterns
- The calls are synchronous in nature, meaning that the caller waits for a response
  - that response is sent after the request is fully processed
- Each call becomes a blocking call that the client must wait on a success or failure indicated by status codes from the service being called
- As such, in this model, call paths can become deep
  - it isn't usually a big deal in small, concise operations
  - but it can become a bottleneck for longer processes across many services
#### asynchronous model of interservice communication
- on method of implementation is over HTTP using REST
  - In this model, the client sends a call and the server immediately responds with an accepted status code
  - The client then either polls the server or waits for a push message on a callback URL to determine if the work was done and successful or done and failed
- Another method, is through the use of messaging systems
  - e.g.: Rabbit, Kafka, JMS, or others
  - a message is put on a system and a downstream consumer works on that message
  - Successes or failures can be communicated many different ways or not at all
  - asynchronous communication styles can be more complex
  - it can be very difficult to do them right
  - but there are benefits
    - One of the biggest benefits is offloading strain on the system
      - By not having every call be a blocking call, you can leverage more processing power behind the scenes and not impact your customer
      - not every call needs an immediate response
      - since there is a correlation between user wait times and satisfaction, the offloading to asynchronous can improve satisfaction of users
      - In addition, many jobs take a while to run to completion and using asynchronous communications not only off-loads strain
        - but also keeps the system as a whole healthier
      - Asynchronous communications, especially in workloads and dag or directed in cyclical graph workflows
        - can allow you to build a natural retries without negatively impacting performance on the processes involved
## Pros
### Prevent Gridlock
- Congestion
- Exponential traffic
- Slow services
- Remove synchronous calls
### impact it can have when dealing with Long-Running Processes
- Reduce blocking
- natural retry
- no more call trees
- reduce risk of timeouts
### Reduce Coupling
- prevent building of monolithic microservices
- prevent exponential traffic
- prevent slow services
### Additional Benefits
- can build better quality of service and priority
- Fault tolerance easier to solve
- response not needed immediately
- logging, metrics, analytics does not need blocking
## Trade-offs
### Complexity increases
- Artifact sprawl
  - consumers of messages are individual artifacts that have their own repositories, build pipelines, deployment pipelines, and configuration management
- Disconnected code paths
- Multiple paths
### Observability becomes harder
- lack of immediate response
- log aggregation
- metrics correlation becomes a challenge
### Additional Complexity
- additional components increases
- operational runbooks increases
- issue source identification becomes difficult
## Common Technologies
### Message Broker
- Heart of the system
- able to translate and transform incoming and outgoing messages
- Routing of messages
  - point to point routing
  - inspection based routing
- Aggregations
  - messages can be aggregated if required
- able to handle errors
### Common Message Brokers
#### RabbitMQ
#### Apache ActiveMQ
#### Java Message Service (JMS)
#### Apache Kafka
#### Cache (e.g.: Redis)
- downside is Redis does not provide the robustness of the other tools
### Common Terms
#### Producers
#### Consumers or receiver
#### Dead-letter queue (DLQ)
# Interservice Communications Patterns
- use when in a situation where you just need to push a message to a remote system to do work, and you don't want a block on the downstream system completing its tasks
## Service Communications
### Point-to-Point
- single producer
- single consumer
- send and forget
- responses are another point-to-point
### Publish-Subscribe
- single producer
- one or more consumers
- send and forget
- durable subscriptions
  - guarantees subscriber will get the message at some point in time
## Point-to-point async
- one of the most common uses of asynchronous messaging
```
Producer -> Message Broker -> Consumer
```
### Use Cases
- when no response are needed
- when need admin task to happen
- out of band
  - e.g.: email: send and forget
- scaling
### Considerations
- wire time, is it really saving time?
- extra components worth it?
- plan for failure scenarios
## Publish-subscribe
```
producer -> Message Broker -> Subscriber
                           -> Subscriber
```
### Use Cases
- when multiple responders are required
  - when flow of traffic between sites is limited on purpose to enforce good constraints across the data centers
  - but what happens when you need more than data in sync?
    - you can federate the message broker across multiple data centers and allow triggered actions within each data center to occur in isolation
    - Those triggered actions are often admin tasks like triggers to clean up or update search indices
    - In this model, the central hub can publish a message and a worker in each data center can subscribe to the message
- when multiple tasks must fire across disparate systems
- to allow for consumer choice
  - consumers can choose not to subscribe
### Durable Subscribers
- they always get the message
- powerful in mission-critical operations
- can unregister if needed
- producer agnostic
  - producer doesn't know anything about the consumer
# Event-Driven Microservices Pattern
## Event-driven microservices
### What is it?
- requires a series of steps from start to goal
- each step is triggered from a single event
- move towards an end goal
- each steps play its own isolated role
### Choreographed events
- can be called a call tree
- step to step
  - each step does some work and passes a message down the chain
- no centralized controller
  - just cascade down the pipelines
- pipes
  - some trigger will be passed with sufficient data to the next step for it to do its work and so on down the call chain
### Orchestrated events
- much more common in practice than choreographed events
- comes from the centralized command and control
- still based on isolated steps
- each step still has a job to do
## Choreographed events
```
                      Step 1
                        ^
                        |
                        v
Event Producer -> Message Broker <-> Step 2
                        |
                        v
                      Step 3
                      
Event Producer
-> Message Broker -> Step 1
-> Message Broker -> Step 2
-> Message Broker -> Step 3
```
### Uses cases
- when there is distinct systems
- when there is alternative cascades
### Benefits and Trade-offs
#### pros
- increased performance over orchestration
  - because don't have a centralized orchestrator, steps don't funnel through a single process
  - performance can increase by offloading the steps to message broker
  - each step can be optimized for its sole function
- can reduce cost
  - due to reduced total cost of ownership due to performance and code complexity
#### cons
- reduce reliability in the system
  - because there is no central place to handle error states
    - there is more chance that a single event will fail to fire everywhere that it is needed
    - thus need to ensure that error tracking and Dead Letter Queues exists in the message broker
      - so as to indicate the need to address errors in the workflow
- reduce observability, increase observability complexity
  - because there is no centralized orchestrator
  - it makes determining the status of the event more difficult
  - have to look everywhere until you find the state of the current message to know what's going on
  - in addition, in an asynchronous model, there is also the message broker and each DLQ to look at
## Orchestrated events 
- more common pattern within the asyncrhonous event driven microservices model
- Orchestrator can also be referred as the Command and Control center
```
               call
Event Producer <-> Orchestrator <-> Message Broker <-> Step 1
           polling call                            <-> Step 2
                                                   <-> Step 3

Event Producer -> call -> Orchestrator -> Message Broker -> Step 1 
-> Message Broker -> Orchestrator -> Event Producer 
-> polling call -> Orchestrator -> Message Broker -> Step 2
-> Message Broker -> Orchestrator -> Event Producer 
-> polling call -> Orchestrator -> Message Broker -> Step 3
-> Message Broker -> Orchestrator -> Event Producer 
```
### Use Cases
- when there is sequential processing
  - step A must be completed before step B can proceed
- Command workflow senario
  - to allow many Kubernetes clusters to be spun up at once through a single orchestrator call, since calls become non-blocking asynchronous messages
- when a response is required
### Benefits and Trade-Offs
#### pros
- increase reliability
  - can use its state to resubmit jobs that need to be processed
  - can also build in much more robust error handling for outlier conditions
- increase observability
  - central point can produce more logging and metrics that can help an operations team
#### cons
- reduced performance or choreography
  - Because you have a centralized orchestrator, the steps funnel through a single process, thus decrease performance
- increased cost
  - orchestrator need to keep track of state of the status responses and code paths
  - increase total cost of ownership
  - need to have more complex code
  - costs in both operations and developer efficiencies
## Hybrid events
- good thing about asynchronous model is that you are not forced to use a fixed pattern, hybrids are possible and efficient
### Not Exclusive
- still have a centralized command and control for the system as a whole
- can dispatch choreography events to remote systems when needed
- the events can either stay choreographed or convert back to internal command and control structure
- work gets done and the original command and control knows when everything is completed
  - knows by either directly in line or via some other polling mechanism
## Contracts
- regardless of event model, contracts between systems via the message broker are key
- contract must be well documented to prevent error or disjointed processes
- contract must be passive to change
  - changes can and do happen, but must not break downstream or upstream systems in the process
- contracts must be enforced rigorously
  - so as to be resistant to change and be efficient in the processing
# Stream Data Platform
- handles streams of data
- all done asynchronously
- very useful in microservices
- increased complexity for a reason
## Common Architecture
- a pub/sub model with multiple publishers on the same set of topics
```
Producer -                    - Consumer
Producer -                    - Consumer
Producer -   Message Broker   - Consumer
Producer -                    - Consumer
```
## Producers
- Applications
- Databases
- Servers
- Anything that producers events or logs
## Consumers
- Log aggregators
  - can help paint a real picture of what's going on in the system
- Analytics engines
  - great use cases for streaming data
- Long-term storage
  - many use cases in big data drive their data flow from a stream data platform
  - once the set of data has been identified through analytics or other learning mechanisms
    - data can be collected and shipped to a storage for historical analysis and other uses
- Eventing engines
  - key off key analytical points and trigger downstream events usually through orchestration
## Why go through all the trouble is consumer use cases are enough?
- data is king
- business drives off data
- what you don't know can hurt you
- decision-making
