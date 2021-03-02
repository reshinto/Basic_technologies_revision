# Latency and Throughput
- if you've ever experience lag in a video game,
  - it was most likely due to a combination of high latency and low throughput
- Latency and Throughput are the 2 most important measures of the performance of a system
## Terms used
### Latency
- it is basically how long it takes for data to traverse a system
  - and more specifically, how long does it take for data to get from 1 point in a system, to another point in the system
- in other words, it is the time it takes for a certain operation to complete in a system
- when talking about latency, we might refer to a lot of different kinds of things in a system
  - might be talking about the latency of a network request
    - how long does it take for 1 request to go from a client to a server, and then back from server to client
    - we refer to the time that it takes for a request to go from a client to a server, and then back from the server to the client as latency
  - however, if on a machine like for instance a server, and it is reading a piece of data from memory, or reading that piece of data from disk
    - the time that it's gonna take to read that data is also referred as latency
- basically different things in systems have different latencies
  - therefore, there is a trade off between different ways that a system is built
    - as certain things are gonna have higher latencies, and other things are gonna have lower latencies
- most often this measure is a time duration, like milliseconds or seconds
- when designing a system, you would want to optimize the system by lowering the overall latencies of the systems
- some systems needs low latencies
  - such as video games, when you experience lag, it is due to the server being played on is located halfway across the world from you
    - and it takes a while for your computer (the client) to make a network requests to the video games server
- some systems does not need to care about latencies
  - such as some websites, as its not important if it takes a couple seconds for a page to load
    - what they care about more is maybe the accuracy or up time
      - they want their website to always show accurate information or never to be down
      - but are ok to lose some latency
#### latencies orders of magnitude examples for different types of data transfers or operations in a system
  - reading 1 mb from RAM: 250 µs (0.25 ms)
  - reading 1 mb from SSD: 1,000 µs (1 ms)
  - transfer 1 mb over 1 Gbps network: 10,000 µs (150 ms)
    - does not take into account of distance, this assumes computers are next each other
  - reading 1 mb from HDD: 20,000 µs (150 ms)
  - sending a packet (1,000 or 1,500 bytes) over a network to a different country on a round trip: 150,000 µs (150 ms)
    - why does it take that long?
      - electricity has to travel, and it takes some time when it has to travel halfway across the world
### Throughput
- how much work can a machine perform in a given period of time
  - throughput in this context normally refer to the amount of work that a computer or machine can perform in a given amount of time
    - this usually refers to how much data can be transferred from 1 point in a system to another point in a system in a given amount of time
    - typically measure this throughput in gigabits per second, or Kilobits pers second, megabits per second
- in summary, it is the number of operations that a system can handle properly per time unit
- e.g.: if there are multiple clients trying to make requests to a single server
  - the throughput will be how many requests can the server handle in a given amount of time
  - or how many bits can the server handle or let through per second
#### how to increase throughput or how to optimize a system for throughput?
- the naive answer
  - just pay for it as normally this is controlled by the cloud provider
  - however, increasing throughput does not neccessary fix a potential problem that you might have in a system
    - e.g.: when a server is handling multiple requests from multiple clients
      - that expects to server thousands of requests or even millions of requests per second (such as google search)
        - just trying to blindly increase throughput on this network won't make sense
          - because you will still eventually have some sort of bottleneck
- better solution
  - is to have multiple servers to handle all of the requests
    - therefore, instead of multiple request going through the same pipeline same bottleneck, they might go to different servers instead
## Latency and Throughput are not neccessarily correlated
- e.g.: you might have a system, or parts of a system, smaller parts of a system,
  - that have very low latency, which supports really fast data transfers
  - might also have another part of a system that has very low throughput
    - that ends up with the low latency data transfers or operations that the system had to be canceled out
- in summary, you cannot make assumptions about latency or throughput based on the other
