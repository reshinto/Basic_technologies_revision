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
#### Dead-letter queue
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
