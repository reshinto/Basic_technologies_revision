# Parallel, Concurrent and Multithreading
## Parallel Computing Hardware
### Sequential vs Parallel computing
#### sequential
- program is broken down into a sequence of discrete instructions that are executed one after another
- only can execute 1 instruction at any given moment
- limitations
  - the time it takes for a sequential program to run is limited by the speed of the processor
    - and how fast it can execute that series of instructions
#### parallel
- breaking the tasks for them to be executed simultaneously by different processors
- the processors has to coordinate with each other as they might be dependent on each other
  - does not necessarily means speed will become twice as fast
    - if a separate task B requires task A but task A is still processing even though task B is completed
    - the entire process will have to wait until task A is completed
  - this adds complexity
