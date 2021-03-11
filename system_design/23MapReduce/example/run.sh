#! /bin/bash

# Clean up stray files from the previous rul.
rm -f host1/map_results/*.txt
rm -f host2/map_results/*.txt
rm -f map_results/*.txt
rm -f reduce_results/results.txt

# Run the map step on both hosts in parallel.
HOST=host1 node map.js &
HOST=host2 node map.js &

# Wait for them to both be done.
wait

# Run the shuffle step.
HOSTS=host1,host2 node shuffle.js

# Run the reduce step.
node reduce.js

# View the final result of the MapReduce job.
cat reduce_results/results.txt
