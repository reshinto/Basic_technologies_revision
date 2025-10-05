# Breadth First Search: BFS On Tree
## Binary Tree Min Depth
```
Given a binary tree, find the depth of the shallowest leaf node.

Example:
  level 0 ----- 1
               / \
  level 1 --- 2   3
             / \   \
  level 2 - 4   5   6
             \   \
  level 3 --- 7   8
  
  Output: 6
    6 is the shallowest leaf, with depth of 2
```
```javascript
class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function binaryTreeMinDepth(root) {
  if (!root) return 0;

  let queue = [[root, 1]];

  while(queue.length) {
    const shifted = queue.shift();
    const node = shifted[0];
    const level = shifted[1]
    if (!node.left && !node.right) return level;
    node.left && queue.push([node.left, level + 1])
    node.right && queue.push([node.right, level + 1])
  }
}
```
### Explanation
- We can solve this problem with either DFS or BFS.
  - With DFS, we traverse the whole tree looking for leaf nodes and record and update the minimum depth as we go.
  - With BFS though, since we search level by level we are guaranteed to find shallowest leaf node earlier than other leaf nodes.
  - This is the biggest advantage of BFS over DFS.
- Time Complexity: `O(n)`
  - We traverse every edge and node once but since the number of edges is n - 1, then this simply becomes `O(n)`
