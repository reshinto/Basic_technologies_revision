# Proxies
- often used by hackers to conceal their identity and obfuscate their location
  - these special intermediary servers boast many important real-life applications
    - within the context of caching, access control, censorship bypassing, amongst other things
- there are 2 primary types of proxies
  - Forward Proxy also normally referred to as just Proxy, Reverse Proxy
## Terms used
### Forward Proxy
- a server that sits between clients and servers and acts on behalf of the client,
  - typically used to mask the client's identity (IP address)
    - server would normally only be able to see the proxy IP address and not the client
    - do note that there are some proxies that might still make the source IP address retrievable or visible in some way to the server
  - note that forward proxies are often referred to as just proxies
- the client does a request that's meant to go to the server, but first goes to the forward proxy
  - forward proxy will then forward the request to the server
  - then the server gets the request from the proxy and not from the client
  - when the server responds, it will give its response to the proxy
  - the proxy will then return the response to the client
- this is a simple example of how VPNs work, allowing you to access websites not accessable from your home country
- key point is the server thinks it is interacting with the client directly
### Reverse Proxy
- a server that sits between clients and servers and acts on behalf of the servers
  - typically used for logging, load balancing, or caching
  - when the client makes a DNS query, it will only see the reverse proxy IP address
- when the client sends a request to the server, it thinks it is sending to the server directly
  - however, it is actually being sent to the reverse proxy configured by the server side first
  - the reverse proxy will then forward the request to the server
  - then the server will return a response back to the reverse proxy
  - the reverse proxy will then return back the response to the client
- this is a good tool to have in a system design
  - can be used to filter out requests to ignore
  - or can be used to take care of logging for the system
  - 1 of the best use case is to use the reverse proxy as a load balancer
  - also can be used for security purposes
    - if there is a malicious client that wishes to bring down the server by issuing a ton of requests to a given server
      - the reverse proxy can act as a shield for that
          - because it will distribute the request as a load balancer evenly amongst the various servers, so that no single server gets all of the requests
- key point is the client thinks it is interacting with the server directly
### Nginx
- a popular webserver that is often used as a reverse proxy and load balancer
### Load Balancer
- it is something like a server that is gonna effectively distribute or that can distribute load, like request load between a bunch of servers
- when designing a complex system, there will be a bunch of servers
  - then we can use the reverse proxy to work as a load balancer
    - that decides which incoming requests from clients should be made to which server
