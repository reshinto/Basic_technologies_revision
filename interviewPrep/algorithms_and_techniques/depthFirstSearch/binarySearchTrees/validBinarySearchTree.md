# Depth First Search: Binary Search Tree
## Valid Binary Search Tree
```
A binary search tree is a binary tree with the property that
any of its node's value is greater than or equal to any node in its left subtree 
and less than or equal to any node's value in its right subtree

Given a binary tree, determine whether it is a binary search tree

BST:
    6
   / \
  4   8
 / \
3   5

Not BST:
    6
   / \
  4   8
 / \
3   8x
```
```javascript
class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function dfs(root, min, max) {
  if (!root) return true;
  if ( min >= root.val || max <= root.val) return false;
  return dfs(root.left, min, root.val) && dfs(root.right, root.val, max);
}

function validBst(root) {
  return dfs(root, -Infinity, Infinity);
}
```
### Explanation
1. Decide on the return value
    - We also have to know whether the left and right subtrees are valid BSTs
      - We get this from subtree return values
2. Identify states
    - To determine whether the substree rooted at the current node is a BST or not
      - we need to know the range (min, max value) the current node value is allowed to be in
- Having decided on the state and return value we can now write the DFS
- Note on the logic in the last line of the DFS
  - When we recursively call DFS on the left node
  - since the left child's value should be less than or equal to current node's value we should pass current node's value as max value
  - Vice versa for right recursive call
- Time Complexity: `O(n)`
  - There are n nodes and n - 1 edges in a tree so if we traverse each once then the total traversal is `O(2n - 1)` which is `O(n)`
