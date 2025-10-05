# Depth First Search: Binary Search Trees
## Insert Into BST
```
Given the root node of a valid BST and a value to insert into the tree,
return a new root node representing the valid BST with the addition of the new item
If the new item already exists in the binary search tree, do not insert anything

You must expand on the original BST by adding a leaf node. Do not change the structure of the original BST

Input
  bst: a binary tree representing the existing BST.
  val: an integer representing the value to be inserted.

Output
  A valid BST with the inserted number, or the same BST if the number already exists.

Example 1:
Input:
  tree = <See explanation>
  val = 7

Output: <See explanation>

Explanation:
Before insertion:
    8
   / \
  5  10
 / \   \
2   6   14
 \
  3

After insertion:
    8
   / \
  5  10
 / \   \
2   6   14
 \   \
  3   7
```
```javascript
class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function insertBst(bst, val) {
  if (!bst) return new Node(val);
  if (val < bst.val) {
    bst.left = insertBst(bst.left, val);
  } else if (val > bst.val) {
    bst.right = insertBst(bst.right, val);
  }
  return bst;
}
```
