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
