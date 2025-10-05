# DFS: dfs on tree
## Max Depth of a Binary Tree
```
Max depth of a binary tree is the longest root-to-leaf path. Given a binary tree, find its max depth.

    5
   / \
  4   6
 / \
3   8

Output: 3
```
### using return value method
```javascript
class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function treeMaxDepth(root) {
  if (!root) return 0;
  return Math.max(treeMaxDepth(root.left), treeMaxDepth(root.right)) + 1;
}
```
#### Explanation
1. Decide on the return value
    - The problem asks the total max depth, so we return the depth for the current subtree after we visit a node
2. Identify states
    - To decide the depth of current node, we only need depth from its children and don't need any additional state
    - Having decided on the state and return value we can now write the DFS
- Time Complexity: `O(n)`
- There are n nodes and n - 1 edges in a tree so if we traverse each once then the total traversal is `O(2n - 1)` which is `O(n)`
### using global variable method
```javascript
class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function treeMaxDepth(root) {
  if (!root) return 0;
  let depth = 1;

  function dfs(node) {
    if (!node) return;
    if (node.left || node.right) {
      depth++;
    }
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  return depth;
}
```
