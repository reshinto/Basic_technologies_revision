# Find Closest Value In BST

  Write a function that takes in a Binary Search Tree (BST) and a target integer
  value and returns the closest value to that target value contained in the BST.
  
  You can assume that there will only be one closest value.
  
  Each BST node has an integer value, a
  left child node, and a right child node. A node is
  said to be a valid BST node if and only if it satisfies the BST
  property: its value is strictly greater than the values of every
  node to its left; its value is less than or equal to the values
  of every node to its right; and its children nodes are either valid
  BST nodes themselves or None / null
  
  Sample Input
  ```
  tree =   10
         /     \
        5      15
      /   \   /   \
     2     5 13   22
   /           \
  1            14
  ```
  ```target = 12```
  
  Sample Output
  13
  
```python
# This is the class of the input tree. Do not edit.
class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


# solution 1
def findClosestValueInBst(tree, target):
  # Write your code here.
  current = tree
  closest = tree.value
  while current:
    if abs(target - closest) > abs(current.value - target):
      closest = current.value
    if target > current.value:
      current = current.right
    elif target < current.value:
      current = current.left
    else:
      break
  return closest
        
        
# solution 2
def findClosestValueInBst(tree, target):
  # Write your code here.
  return traverse(tree, target, tree.value)
    
  
def traverse(current, target, closest):
  if current is None:
    return closest
  if abs(target - closest) > abs(current.value - target):
    closest = current.value
  if target > current.value:
    return traverse(current.right, target, closest)
  elif target < current.value:
    return traverse(current.left, target, closest)
  else:
    return closest
```
```javascript
// This is the class of the input tree. Do not edit.
class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// solution 1
function findClosestValueInBst(tree, target) {
  // Write your code here.
  return traverse(tree, target, tree.value);
}

function traverse(current, target, closest) {
  while (current) {
    if (Math.abs(target - closest) > Math.abs(target - current.value)) {
      closest = current.value;
    }
    if (target > current.value) {
      current = current.right;
    } else if (target < current.value) {
      current = current.left;
    } else {
      break;
    }
  }
  return closest;
}

// solution 2
function findClosestValueInBst(tree, target) {
  // Write your code here.
  return traverse(tree, target, tree.value);
}

function traverse(current, target, closest) {
  if (!current) {
    return closest;
  }
  if (Math.abs(target - closest) > Math.abs(target - current.value)) {
    closest = current.value;
  }
  if (target > current.value) {
    return traverse(current.right, target, closest);
  } else if (target < current.value) {
    return traverse(current.left, target, closest);
  } else {
    return closest;
  }
}
```
