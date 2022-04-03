# Rate Limiting
- the act of limiting the number of requests sent to or from a system
- is most often used to limit the number of incoming requests in order to prevent DoS attacks and can be enforced at the IP=address level, at the user-account level, or at the region level
  - when a user sends over the limit, the server will just return errors
- rate limiting can also be implemented in tiers but will make the rate limiting more complex
  - e.g.
    - the 1st limit could be every request could only be made every 0.5 seconds
    - then then 2nd limit could be only max 3 batch of 0.5 seconds requests could be made at every 10 seconds or per minute
- it is very important for system design as it has a lot of ramifications (security and performance)
- although rate limiting is very important and effective, it isn't the ultimate way to protect the system from attacks
  - rate limiting can protect against simple DoS attacks, but is unable to protect against DDoS attack
    - even to this day, companies like Wikipedia and Blizzard Entertainment still get their servers brought down by DDoS attacks
## Issues when storing accesses in memory at the server
- when we have a large scale distributed system with a lot of servers, storing accesses in memory at the server will fall apart
  - because unless we have very rigorous load balancing that specifically rerouting requests of a single user to the same server every time (to make sure that we had that user's access's in memory in the server that the user's requests were being routed to) this rate limiting would fall apart
- if the client is rerouted to a different server that does not have the accesses stored, the server would not know to return an error to the client
### Therefore for large scale distribute system, handle rate limiting in separated service or database
- can use Redis (an in-memory key value database) for this case
- when using this, server will first check the database regarding the rate limiting
  - if the database determines that user made requests over the limit, it will instruct the server to return an error
## Terms Used
### DoS Attack (Denial-of-Service Attack)
- is an attack in which a malicious user tries to bring down or damage a system in order to render it unavailable to users
- most of the time it consists of flooding the server with traffic, causing the server to not have enough throughput to handle the situation
- some DoS attacks are easily preventable with rate limiting
  - while others can be trickier to defend against
### DDoS Attack (Distributed Denial-of-Service Attack)
- is a DoS attack in which the traffic flooding the target system comes from many different sources (like thousands of machines), making it much harder to defend against
