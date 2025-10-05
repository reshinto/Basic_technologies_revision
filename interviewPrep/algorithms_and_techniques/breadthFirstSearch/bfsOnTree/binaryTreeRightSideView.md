# Breadth First Search: BFS On Tree
## Binary Tree Right Side View
```
Given a binary tree, return the rightmost node of each level.

Example:
  lvl 0 -------- 1
                / \
  lvl 1 ------ 2   3
              / \   \        ->    [1, 3, 6, 7]
  level 2 -- 4   5   6
              \
  level 3 ---- 7
```
```javascript
class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function binaryTreeRightSideView(root) {
  if (!root) return [];
  const finalArr = [];
  let tmpArr = [];
  const queue = [];

  queue.push(root);
  queue.push(null);
  finalArr.push([root.val]);

  while (queue.length > 1) {
    const current = queue.shift();
    if (current === null) {
      finalArr.push(tmpArr);
      tmpArr = [];
      queue.push(null);
    } else {
      if (current.left) { 
        queue.push(current.left); 
        tmpArr.push(current.left.val);
      }
      if (current.right) {
        queue.push(current.right);
        tmpArr.push(current.right.val);
      }
    }
  }
  return finalArr.map(arr => arr[arr.length - 1]);
}
```
### Explanation
- We can do a level order traversal and add the last node to return the result.
- Time Complexity: `O(n)`
  - We traverse every edge and node once but since the number of edges is n - 1, then this simply becomes `O(n)`
