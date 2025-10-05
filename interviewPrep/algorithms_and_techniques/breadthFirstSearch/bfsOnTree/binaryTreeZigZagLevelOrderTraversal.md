# Breadth First Search: BFS On Tree
## Binary Tree Zigzag Level Order Traversal
```
Given a binary tree, return its level order traversal but alternate left to right order.

Example:
  level 0 ----- 1
               / \           [
  level 1 --- 2   3            [1],
             / \   \      ->   [3, 2],
  level 2 - 4   5   6          [4, 5, 6],
             \   \             [8, 7],
  level 3 --- 7   8          ]
```
```javascript
class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function zigZagTraversal(root) {
  let level = 0;
  const queue = [root];
  const result = [];
  if (!root) return result;

  while(queue.length) {
    const n = queue.length;
    const temp = [];
    for (let i=0; i<n; i++) {
      const top = queue.pop();
      if (level % 2 === 0) temp.push(top.val);
      else temp.unshift(top.val);
      if (top.left !== null) queue.unshift(top.left);
      if (top.right !== null) queue.unshift(top.right);  
    }
    result.push([...temp]);
    level++;
  }
  return result;
}
```
### Explanation
- This problem is almost the same as level order traversal.
  - We just have to keep a flag to track if we are currently traversing left-to-right or right-to-left.
- Comparing this to level order traversal solution, we just added a flag.
- Time Complexity: `O(n)`
  - We traverse every edge and node once but since the number of edges is n - 1, then this simply becomes O(n).
