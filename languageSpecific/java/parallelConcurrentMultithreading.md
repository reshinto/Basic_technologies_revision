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
  - accomplish a single task faster
  - accomplish more tasks in a given time
- the processors has to coordinate with each other as they might be dependent on each other
  - does not necessarily means speed will become twice as fast
    - if a separate task B requires task A but task A is still processing even though task B is completed
    - the entire process will have to wait until task A is completed
  - this adds complexity
### Parallel computing hardware
- parallel computing requires parallel hardware
  - with multiple processors to execute different parts of a program at the same time
- different structural types of parallel computers
  - `Flynn's Taxonomy`: 1 of most widely used systems for classifying multiprocessor architectures
  
    ![Flynn Taxonomy](../../images/flynnTaxonomy.png)
  
    - Single Instruction Single Data (SISD)
    
      ![SISD](../../images/sisd.png)
      
      - simplest of the 4 classes
      - it is the sequential computer with a single processor unit
        - at any given time, can only execute 1 series of instructions and act on 1 element of data at a time
    - Single Instruction Multiple DATA (SIMD)

      ![SIMD](../../images/simd.png)
      
      - a type of parallel computer with multiple processing units
      - all of its processors execute the same instruction at any given time
        - but they can operate on different data element
      - this type of SIMD architecture is well suited for apps that perform the same handful of operations on a massive set of data elements
        - e.g.: image processing
          - most modern computers use graphic processing units (GPU) with SIMD instructions to do it
    - Multiple Instruction Single Data (MISD)
    
      ![MISD](../../images/misd.png)
      
      - the opposite of `SIMD`
      - each processing unit independently executes its own separate series of instructions
        - however, all of those processors are operating on the same single stream of data
