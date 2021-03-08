# Etcd leader election example
## How to run
- install etcd
> brew install etcd
- start etcd service
> brew services start etcd
- install all dependencies
> pipenv install
- open 4 terminals and enter into virtual environment for all of them
> pipenv shell
- run 1 server in 4 terminals
  - ```python leader_election.py server1```
  - ```python leader_election.py server2```
  - ```python leader_election.py server3```
  - ```python leader_election.py server4```
- server1 will be the leader since it is run first
- should any of the follower servers were to crash, nothing will change
- should the leader server crash, a new leader will be selected among the follower servers
