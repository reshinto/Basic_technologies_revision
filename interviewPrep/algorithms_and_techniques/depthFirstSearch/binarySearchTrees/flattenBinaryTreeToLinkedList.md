# Depth First Search: Binary Search Trees
## Flatten Binary Tree to Linked List
```
Given a binary tree, return a linked list that is a "flattened" version of the tree
The linked list still uses the same nodes as a normal binary tree,
only the left subtree is always empty,
and the right subtree always points to the next element in the linked list (or the empty tree)

The flattened tree represents the pre-order traversal of the tree

Input
  tree: the binary tree to be flattened

Output
  A tree representing the flattened binary tree

Example 1:
  Input:
    tree = <See explanation>
  
  Output: <See explanation>

  Explanation:
    Input tree:
        1
       / \
      2  3
     / \
    4   5
    Flattened tree:
    1
     \
      2
       \
        4
         \
          5
           \
            3
Note that this uses the binary tree structure to represent the linked list
```
```javascript
class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
```
- solution 1
```javascript
function dfs(tree, stack) {
  if (!tree) return null;
  stack.push(tree);
  dfs(tree.left, stack);
  dfs(tree.right, stack);
}

function flattenTree(tree) {
  if (!tree) return null;
  const stack = []
  dfs(tree, stack);
  for (let i=0; i<stack.length; i++) {
    const node = stack[i];
    node.left = null;
    if (i < stack.length - 1) {
      node.right = stack[i+1];
    } else {
      node.right = null;
    }
  }
  return tree;
}
```
- solution 2
```javascript
function flattenTree(tree) {
  if(!tree) return tree;
  
  let cur = tree;
  const tempRight = flattenTree(cur.right);
  cur.right = flattenTree(cur.left);
  cur.left = null;
  
  while(cur && cur.right) {
    cur = cur.right;
  }
  cur.right = tempRight;  // append at the end of the linked list
  return tree;
}
```
### Explanation
- we do a pre-order traversal
- The time complexity is `O(n)`, where n is the size of the tree
