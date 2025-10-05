# Depth First Search: DFS on Tree
## Lowest Common Ancestor
```
Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree

According to the definition of LCA on Wikipedia: 
  The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants
  where we allow a node to be a descendant of itself
  
Example 1:
      3
   /    \
  5      1
 / \    / \
6   2  0   8
   / \
  7   4

Input: root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3

Example 2:
      3
   /    \
  5      1
 / \    / \
6   2  0   8
   / \
  7   4

Input: root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.

Example 3:
1
 \
  2
Input: root = [1,2], p = 1, q = 2
Output: 1
 
Constraints:
  The number of nodes in the tree is in the range [2, 105]
  -109 <= Node.val <= 109
  All Node.val are unique
  p != q
  p and q will exist in the tree
```
```javascript
class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

var lowestCommonAncestor = function(root, p, q) {
  // Current node is one of the target and the other node is in a subtree
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  // One target node is on the left subtree, the other target node on the right subtree, so the current node itself is the LCA
  if (left && right) return root;
  // Current node is in the path between LCA and target node in case 2
  // report target node or LCA back to parent
  if (left) return left;
  if (right) return right;
  // case 4, not found return null
  return null;
};
```
```
      3
   /    \
  5      1
 / \    / \
6   2  0   8
   / \
  7   4

root = 3, p = 5, q = 4
left:
----------------
| lca(5, 5, 4) |
----------------
root = 5 === p, return 5
left = 5
right:
----------------
| lca(1, 5, 4) |
----------------


root = 1, p = 5, q = 4
left:
----------------
| lca(0, 5, 4) |
| lca(1, 5, 4) |
----------------

root = 0, p = 5, q = 4
left:
--------------------
|  lca(null, 5, 4) |
|   lca(0, 5, 4)   |
|   lca(1, 5, 4)   |
--------------------
!root, return root = null
----------------
| lca(0, 5, 4) |
| lca(1, 5, 4) |
----------------
left = null
right:
--------------------
|  lca(null, 5, 4) |
|   lca(0, 5, 4)   |
|   lca(1, 5, 4)   |
--------------------
!root, return root = null
--------------------
|   lca(0, 5, 4)   |
|   lca(1, 5, 4)   |
--------------------
right = null
since left and right is null, return null

root = 1, p = 5, q = 4
--------------------
|   lca(1, 5, 4)   |
--------------------
left: null
right:
root = 8, p = 5, q = 4
--------------------
|   lca(8, 5, 4)   |
|   lca(1, 5, 4)   |
--------------------
left:
--------------------
|  lca(null, 5, 4) |
|   lca(8, 5, 4)   |
|   lca(1, 5, 4)   |
--------------------
!root, return root = null
----------------
| lca(0, 5, 4) |
| lca(1, 5, 4) |
----------------
left = null
right:
--------------------
|  lca(null, 5, 4) |
|   lca(8, 5, 4)   |
|   lca(1, 5, 4)   |
--------------------
!root, return root = null
--------------------
|   lca(8, 5, 4)   |
|   lca(1, 5, 4)   |
--------------------
right = null
since left and right is null, return null

root = 1, p = 5, q = 4
--------------------
|   lca(1, 5, 4)   |
--------------------
left: null
right: null
since left and right is null, return null

root = 3, p = 5, q = 4
left: 5
right: null
since right is null, and left is not null, return left
```
### Explanation
- When we think as a node, there could be five scenarios of how we are relative to the LCA and two target nodes
  - Current node is LCA
    - One target node is on the left subtree, the other target node on the right subtree, so the current node itself is the LCA
    - Current node is one of the target and the other node is in a subtree
  - Current node is not LCA
    - Current node is neither target node and its subtrees has no target node.
    - Current node is in the path between LCA and target node in case 2.
    - LCA is in the subtree of current node
1. Decide on return value
    - To return LCA to root, we have to return it after we find it
    - If current node is not LCA we also have to return the information back to parent
    - If current node is one of the target nodes we return it otherwise we return null
2. Identify states
    - To decide whether current node is LCA, we need to know which of the above scenarios we are in
    - We can determine that from the return value of subtrees
    - Therefore no states needed
- Time Complexity: `O(n)`
  - There are n nodes and n - 1 edges in a tree so if we traverse each once then the total traversal is `O(2n - 1)` which is `O(n)`
