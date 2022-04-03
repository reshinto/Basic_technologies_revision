# Leader Election
- a form of algorithmic democracy, is how servers in a distributed system chooses a master node
- in other words, it is the process by which nodes in a cluster (for instance, servers in a set of servers) elect a leader amongst them
  - it is responsible for primary operations of the service that these nodes support
  - when correctly implemented, leader election guarantees that all nodes in the cluster know which 1 is the leader at any given time
  - can elect a new leader if the leader dies for whatever reason
## When to use example
- when you need to connect a third party service to a database
  - you would need a service to connect them
    - problem would arise if this single machine or service fails
    - solution would be to introduce redundancy, adding multiple servers
      - a new problem would arise where we do not want to replicate sensitive requests like payments across multiple servers, such requests should only be done once
      - solution is to use Leader Election
        - instead of having all servers to do the same thing, via leader election, the servers will elect the leader and only the leader would perform the sensitive request
          - if anything happens to the leader, a new leader will be elected from the rest of the servers and will take over
          - the act of all servers to provide consensus to allow a server to become the leader is difficult to implement, which is something you do not do by yourself
          - the consensus algorithm is used and applied for this case
## Terms Used
### Consensus Algorithm
- a type of complex algorithms used to have multiple entities agree on a single data value
  - like who the leader is amongst a group of machines
  - 2 popular consensus algorithms are Paxos and Raft
#### Paxos & Raft
- when implemented correctly, allow for the synchronization of certain operations even in a distributed setting
#### Can also use another 3rd tools that implements Paxos & Raft
- Etcd or ZooKeeper
  - these tools aren't meant to be used for leader election but allows you to implement your own leader election a in very easy way
- Etcd is a strongly consistent and highly available key-value store that's often used to implement leader election in a system
  - implements Raft consensus algorithm
- ZooKeeper is a strongly consistent, highly available key-value store, often used to store important configuration or to perform leader election
#### How to use Etcd to implement your own simple leader election
- have multiple servers communicate with Etcd with the key-value store
- at any given point of time, you would have 1 special key-value pair in the Etcd key-value store
  - that key-value pair would represent who the leader is
    - the key is leader or some special key that represents the leader
    - value is the name of the server or IP address of the server
- because Etcd guarantees high availability and strong consistency
  - you know that the value of the leader in the key-value pair at any given point in time is correct for any machine that is reading from it
