# Depth First Search: Binary Search Trees
## Invert Binary Tree
```
Given a binary tree, invert it and return the new value
You may invert it in-place

To "invert" a binary tree, switch the left subtree and the right subtree, and invert them both
Inverting an empty tree does nothing

Input
  tree: a binary tree that needs to be inverted

Output
  The inverted binary tree

Example 1:
  Input:
    tree = <See explanation>
  
  Output: <See explanation>

Explanation:
  Original tree:
      1
     / \
    2   3
   / \   \
  4   5   6
   \
    7

  Inverted tree:
      1
     / \
    3   2
   /   / \
  6   5   4
         /
        7
```
```javascript
class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function invertBinaryTree(tree) {
  if (!tree) return null;
  const left = invertBinaryTree(tree.left);
  const right = invertBinaryTree(tree.right);
  tree.left = right;
  tree.right = left;
  return tree;
}
```
### Explanation
1. Decide on the return value
    - For the return value, this question asks for an inverted version of the original tree
      - so each step we return the inverted version of the current subtree
2. Identify states
    - No additional states are carried other than the current tree that we are inverting
- The resulting time complexity is `O(n)`, where n is the size of the tree
