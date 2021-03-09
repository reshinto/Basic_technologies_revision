# Peer-To-Peer Networks
- a collection of machines referred to as peers that divide a workload between themselves to presumably complete the workload faster than would otherwise be possible
- often used in file-distribution systems
  - such as torrenting which basically involves 1 person or 1 machine that has a piece of data, typically a large file and spreading that file in chunks to a bunch of peers, to a bunch of other mahcines all over the world
    - then have these peers work together to obtain all of the missing pieces that they need to puzzle them back together
## Use cases
- if designing a system where it is able to deploy or transfer large files to thousands of machines at once
  - if we are designing a system for a big tech firm with their own powerful data center
    - we can assume that our system has a total network throughput of 40 gigabits per second
      - which comes down to 5 gigabytes per second since there are 8 bits per byte
  - assuming we have 1 machine, we wanna design our system such that we can deploy or transfer large files (gigabyte files) from 1 machine to 1,000 machines repeatedly
    - a use case is where you get video footage from security cameras multiple times per day, and you wanna send these video files to a 1,000 machines throughout the day
    - another use case is where if you are deploying very large machine learning models that you wanna train on the 1,000 machines and you are doing that multiple times a day
  - 1,000 machines will take 1,000 seconds which is 17 minutes and is quite long for this kind of operation especially if we are doing this repeatedly throughout the day
    - thus we can see that we have a bottleneck in our system
- To improve the system, instead of having only 1 machine serving the 5 GB files, we can have multiple machines for example 10
  - now when we request for the 5 GB files, we are requesting in a distributed manner from those 10 machines
  - still have an issue, transferring 5 GB in 17 minutes / 10 is still more than a minute and is not amazing, depending on our use case it might be quite bad
  - also we would need to replicated all the files to all 10 machines which is not optimal
- another possible solution could be to sort the files and have them split up amongst the 10 machines
  - we then don't need to replicate all the files across the 10 machines
  - however, it goes back to the initial problem where all machinese will request from the same 1 machine for that specific file thus creating a bottleneck again
- The best solution for this case would be to implement the Peer-To-Peer network
  - we will have 1 machine trying to send the 5 GB file to 1,000 machines
    - the solution would be instead of sending the 5 GB file to each and every 1 of the 1,000 machines, we split up this 5 GB file into very small chunks (e.g.: 1,000 5 MB files) and then send each chunk to each of our peers (in this case, 1,000 5 MB file transfer will take 1 second, transfer of 1 5 MB file will take 0.001 second)
      - then we let our peers communicate with 1 another to grab the missing chunks  (999 5 MB files) that they all need to create the final file (which will take 1/1000 * 999 = 0.999 seconds)
      - let the peers build up their own total file
      - all of the peers could simultaneously talk to each other
      - peers are able to send their received chunks to other peers concurrently while the main machine that is sending the 1,000  5 MB files
        - however, in order for this to work, our peers need to know which peers to talk to next
          - this requires peer discovery and peer selection methods
### how to perform peer discovery and peer selection
- mainly have 2 primary ways of doing this
#### first method: using a tracker
- to have some sort of central database which orchestrates the entire peer-to-peer network or knows at all times or can figure out at any time which peer should talk to next
  - this means that while the peers are communicating with each other, it will also communicate with the central machine or database (also know as a tracker) that will tell them which peer to talk to next
#### second method: using gossip protocol or epidemic protocol
- instead of having a central database or a tracker to tell them what to do, they just talk between themselves and figure it out themselves
  - e.g.: you have a chunk that i need, and you don't seem to have that peer's chunk so go get it
- every peer carries information about what peer carries what data or what chunk of the file
  - peers essentially carry mappings that map certain peers to certain chunks
    - each peer would have their own hash table where they map a peer IP address to the data chunk
      - this is referred to as a ```distributed hash table (DHT)```
#### technology example
- [Kraken](https://github.com/uber/kraken)
## Terms Used
### Gossip Protocol
- when a set of machines talk to each other in a uncoordinated manner in a cluster to spread information through a system without requiring a central source of data
