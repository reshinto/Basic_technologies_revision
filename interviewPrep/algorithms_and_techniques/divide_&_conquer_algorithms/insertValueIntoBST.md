# Insert Value Into Binary Search Tree
```
input: 108

original BST:
  100
    120
  110  140
    115  150
    
new BST:
  100
       120
   110    140
 108 115    150
```
```javascript
function insertNode(head, value) {
  if (!head) {  // create and append new node with value
    return new Node(value);
  }
  // if current value is larger than current tree node value, move to the right child
  if (head.value < value) {
    head.right = insertNode(head.right, value):
  } else { // if current value is smaller than current tree node value, move to the left child
    head.left = insertNode(head.left, value);
  }
  return head;
}
```
- supporting code
  ```javascript
  class Node {
    constructor(value) {
      this.value = value;
      this.right = null;
      this.left = null;
    }
  }

  function printLeaves(root) {
    if (!root) {
      console.log("null");
    }

    if (!root.left && !root.right) {
      console.log(root.value);
    }

    if (root.left) {
      printLeaves(root.left);
    }
    if (root.right) {
      printLeaves(root.right);
    }
  }
  ```
```
input: 108
  
  100
    120
  110  140
    115  150

|----------------------|
| insertNode(100, 108) |
|----------------------|
  
since 108 is more than 100
move 108 to bottom right leaf node
and add insertNode with next node 120 to the stack
|----------------------|
| insertNode(120, 108) |
| insertNode(100, 108) |
|----------------------|
  
since 108 is less than 120
move 108 to bottom left leaf node
and add insertNode with next node 110 to the stack
|----------------------|
| insertNode(110, 108) |
| insertNode(120, 108) |
| insertNode(100, 108) |
|----------------------|

since 108 is less than 110
move 108 to bottom left leaf node
and add insertNode with next node null to the stack
|-----------------------|
| insertNode(null, 108) |
| insertNode(110, 108)  |
| insertNode(120, 108)  |
| insertNode(100, 108)  |
|-----------------------|

since current node is null
create a new node and set value as 108 and connects it to 110
|-----------------------|
| 108                   |
| insertNode(110, 108)  |
| insertNode(120, 108)  |
| insertNode(100, 108)  |
|-----------------------|
  
return 110 and connect it to 120
|-----------------------|
| 110                   |
| insertNode(120, 108)  |
| insertNode(100, 108)  |
|-----------------------|

return 120 and connect it to 100
|-----------------------|
| 120                   |
| insertNode(100, 108)  |
|-----------------------|
  
return 100
|-----------------------|
| 100                   |
|-----------------------|
  
  100
       120
   110    140
 108 115    150
```
## Iterative solution
```javascript
function insertNode(head, value) {
  const newNode = new Node(value)
  if (!head) {
    return newNode;
  }
  let currentNode = head;
  while (currentNode) {
    if (currentNode.value < value) {
      if (!currentNode.right) {
        currentNode.right = newNode;
        break;
      }
      currentNode = currentNode.right;
    } else {
      if (!currentNode.left) {
        currentNode.left = newNode;
        break;
      }
      currentNode = currentNode.left;
    }
  }
  return head;
}
```
