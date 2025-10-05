# Graph: Vanilla BFS
## Shortest Path
```
Given an (unweighted) graph, return the length of the shortest path between two nodes A and B.

Input:
  graph: {
    0: [1, 2],
    1: [0, 2, 3],
    2: [0, 1],
    3: [1]
  }
  A: 0
  B: 3
Output: 2

    0
   / \
  1 - 2
 /
3

You can use the BFS template from BFS on graphs as your starter code.
```
```javascript
function shortestPath(graph, a, b) {
  return bfs(graph, a, b);
}

function getNeighbors(graph, node) {
  return graph[node];
}

function bfs(graph, root, target) {
  const queue = [root];
  const visited = new Set([root]);
  let level = 0;
  while (queue.length) {
    const n = queue.length;
    for (let i=0; i<n; i++) {
      const node = queue.shift();
      if (node === target) return level;
      for (const neighbor of getNeighbors(graph, node)) {
        if (visited.has(neighbor)) continue;
        queue.push(neighbor);
        visited.add(neighbor);
      }
    }
    level++;
  }
}
```
### Explanation
- BFS is best for finding distance between two nodes since it traverses level by level.
  - Apply the template from `BFS template`
  - Since the graph is already built for us, get_neighbors function retrieves the adjacency list.
- Time Complexity: `O(n+m)`
  - Again we adopt the convention that n denote the number of nodes in the graph and m the numebr of edges.
  - The time spent is equal to the number of nodes and edges in the worst case.
  - Consider for example a linear graph 0->1->2->3 and so on where we want to get from end to end
    - we would traverse every node and edge exactly once.
- A quick note on "unweighted".
  - Sometimes graph's edges can have weight.
  - For example, a graph that represents city connections and edges' weights represent the distance between cities.
- BFS can find the shortest path for unweighted graphs.
  - For weighted graphs, we need algorithms like Dijkstra's algorithm.
