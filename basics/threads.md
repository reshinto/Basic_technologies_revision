# Threads
## Synchronous
### Single Threaded
- each task gets executed 1 after another
- each task waits for its previous task to be completed before getting executed
### Multi-Threaded
- tasks get executed in different threads
  - but waits for other executing tasks on other threads to be completed before getting executed
## Asynchronous
### Single Threaded
- tasks start executing without waiting for a different task to finish
- at a given time, a single task gets executed
### Multi-Threaded
- tasks get executed in different threads without waiting for any tasks and independently finish off their executions
## Concurrency
- execution of tasks in a single core environment
- tasks are context switched betwen one another
## Parallelism
- 2 tasks are being performed simultaneously over the same time period
