# MapReducer example
## How to use
- run shell file with bash
> bash run.sh
- allow chmod permission
> chmod a+x run.sh
- run shell file without bash
> ./run.sh
## How it works
- the shell script is meant to replicate what the central control plane of the distributed file system would do
  - it knows where the data lives, it determines what the Map and Reduce functions are gonna be, where the programs are gonna live
- latencies are checked if it is over 10 seconds and will be written as 1 each per line in the over_10_seconds.txt file in their respective host/map_results folder
- latencies are also checked if it is under 10 seconds and will be written as 1 each per line in the under_10_seconds.txt file in their respective host/map_results folder
- total number of latencies that are over 10 seconds will be accumulated and be written in the map_results folder
- total number of latencies that are under 10 seconds will be accumulated and be written in the mpa_results folder
- total count of the number of latencies over 10 seconds will be counted and be written in the reduce_results folder
- total count of the number of latencies under 10 seconds will be counted and be written in the reduce_results folder
