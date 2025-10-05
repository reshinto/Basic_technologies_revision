# Depth First Search: DFS on Tree
## Visible Tree Node | Number of Visible Nodes
```
In a binary tree, we define a node "visible" when no node on the root-to-itself path (inclusive) has a greater value. The root is always "visible" since there are no other nodes between the root and itself. Given a binary tree, count the number of "visible" nodes.

Input:
    5v
   / \
  4   6v
 / \
3   8v
v = visible

Output: 3

For example: 
  Node 4 is not visible since 5>4
  similarly Node 3 is not visible since both 5>3 and 4>3
  Node 8 is visible since all 5<=8, 4<=8, and 8<=8
```
```javascript
class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function dfs(root, max) {
  if (!root) return 0;

  let total = 0;
  if (root.val >= max) total++;
  total += dfs(root.left, Math.max(root.val, max));
  total += dfs(root.right, Math.max(root.val, max));
  return total;
}

function visibleTreeNode(root) {
  return dfs(root, -Infinity);
}
```
### Explanation
- We can DFS on the tree and keep track of the max value we have seen as we go
1. Decide on the return value
    - The problem asks for the total number of visible nodes
    - so we return the total number of visible nodes for the current subtree after we visit a node
2. Identify states
    - The definition for a "visible" node is its value is greater than any other node's value on the root-to-itself path
    - To determine whether the current node is visible or not, we need to know the max value from the root to it
    - We can carry this as a state as we traverse down the tree
- Having decided on the state and return value we can now write the DFS
- Time Complexity: `O(n)`
  - There are n nodes and n - 1 edges in a tree so if we traverse each once then the total traversal is `O(2n - 1)` which is `O(n)`
