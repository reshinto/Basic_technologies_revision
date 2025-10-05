# Depth First Search: DFS on Tree
## Balanced Binary Tree
```
A balanced binary tree is defined as a tree such that either it is an empty tree,
or both its subtree are balanced and has a height difference of at most 1

In that case, given a binary tree, determine if it's balanced

Parameter
  tree: A binary tree.

Result
  A boolean representing whether the tree given is balanced

Example 1
  Input:
      1
     / \
    2   3
   / \   \
  4   5   6
   \
    7
Output: true

Explanation: By definition, this is a balanced binary tree

Example 2
Input:
    1
   / \
  2   3
 / \   \
4   5   6
 \     /
  7   8
Output: false

Explanation: The subtrees of the node labelled 3 has a height difference of 2, so it is not balanced
```
```javascript
class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function dfs(root) {
  if(!root) return 0;
  const leftHeight = dfs(root.left);
  const rightHeight = dfs(root.right);
  
  if (leftHeight === -1 || rightHeight === -1) return -1;
  if (Math.abs(leftHeight - rightHeight) > 1) return -1;
  return Math.max(leftHeight, rightHeight) + 1;
}

function isBalanced(tree) {
  return dfs(tree) !== -1;
}
```
### Explanation
- This question can be solved using a post-order traversal on the tree
- To find whether a tree is balanced, and to find out about its height
  - we look at the two subtrees and see whether they are balanced and if so, their height
  - If one of the subtree is unbalanced, this tree is unbalanced
  - Otherwise, if the height difference between the trees is greater than 1, the tree is unbalanced
  - Otherwise, the tree is balanced by definition, and the height is the max height between the two subtrees plus 1
- We have established the recursion logic
  - For the base case, we assume the empty subtree has a height of 0
- Implementation
  - Now let's think like a node and apply our two-step formula:
    1. Return value
        - We want to return the height of the current tree to the parents
          - so that current node's parent can decide whether its subtrees' height difference is no more than 1
    2. Identify states(s)
        - To decide whether current node's subtree is balanced
          - we do not need any information other than the height for each subtree returned from each child's recursive call
          - Therefore no additional state is needed
- The time complexity is `O(n)`, where n is the number of nodes in this tree
