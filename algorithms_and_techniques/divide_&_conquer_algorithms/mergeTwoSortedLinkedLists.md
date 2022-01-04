# Merge Two Sorted Linked Lists
```
input1: node1 -> node8 -> node22 -> node40
input2: node4 -> node11 -> node16 -> node20
output: node1 -> node4 -> node8 -> node11 -> node16 -> node20 -> node22 -> node40
```
- before working on the recursion, need to think about the following
  - What is the base case / stopping condition?
- What is the smallest amount of work I can do in each iteration?
```javascript
function sortedMerge(nodeA, nodeB) {
  // return nodeB if nodeA does not exist
  if (!nodeA) {
    return nodeB;
  }
  // return nodeA if nodeB does not exist
  if (!nodeB) {
    return nodeA;
  }

  if (nodeA.value < nodeB.value) {
    nodeA.next = sortedMerge(nodeA.next, nodeB);
    return nodeA;
  } else {
    nodeB.next = sortedMerge(nodeA, nodeB.next);
    return nodeB;
  }
}
```
- supporting code
  ```javascript
  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }

    setNext(node) {
      this.next = node;
    }

    getNext() {
      return this.next;
    }
  }

  function printLinkedList(node) {
    let tmp = node;
    let result = "";
    while (tmp) {
      result += tmp.value + " ";
      tmp = tmp.getNext();
    }
    console.log(result);
  }
  ```
```
input1: node1 -> node8 -> node22 -> node40
input2: node4 -> node11 -> node16 -> node20

since node1 and node4 are both not null, base case is skipped
when comparing node1 and node4, 1 is less than 4
set node1 next to return value by adding to the stack
|-----------------------------|
|  sortedMerge(node8, node4)  |
|-----------------------------|

since node8 and node4 are both not null, base case is skipped
when comparing node8 and node4, 4 is less than 8
set node4 next to return value by adding to the stack
|-----------------------------|
|  sortedMerge(node8, node11) |
|  sortedMerge(node8, node4)  |
|-----------------------------|

since node8 and node11 are both not null, base case is skipped
when comparing node8 and node11, 8 is less than 11
set node8 next to return value by adding to the stack
|------------------------------|
|  sortedMerge(node22, node11) |
|  sortedMerge(node8, node11)  |
|  sortedMerge(node8, node4)   |
|------------------------------|

since node22 and node11 are both not null, base case is skipped
when comparing node22 and node11, 11 is less than 22
set node11 next to return value by adding to the stack
|------------------------------|
|  sortedMerge(node22, node16) |
|  sortedMerge(node22, node11) |
|  sortedMerge(node8, node11)  |
|  sortedMerge(node8, node4)   |
|------------------------------|

since node22 and node16 are both not null, base case is skipped
when comparing node22 and node16, 16 is less than 22
set node16 next to return value by adding to the stack
|------------------------------|
|  sortedMerge(node22, node20) |
|  sortedMerge(node22, node16) |
|  sortedMerge(node22, node11) |
|  sortedMerge(node8, node11)  |
|  sortedMerge(node8, node4)   |
|------------------------------|

since node22 and node20 are both not null, base case is skipped
when comparing node22 and node20, 20 is less than 22
set node20 next to return value by adding to the stack
|------------------------------|
|  sortedMerge(node22, null)   |
|  sortedMerge(node22, node20) |
|  sortedMerge(node22, node16) |
|  sortedMerge(node22, node11) |
|  sortedMerge(node8, node11)  |
|  sortedMerge(node8, node4)   |
|------------------------------|

since nodeB is null, base case is activated and returns node22
|------------------------------|
|  node22                      |
|  sortedMerge(node22, node20) |
|  sortedMerge(node22, node16) |
|  sortedMerge(node22, node11) |
|  sortedMerge(node8, node11)  |
|  sortedMerge(node8, node4)   |
|------------------------------|
node20 next = node22
node20 -> node22 -> node40

|------------------------------|
|  node20                      |
|  sortedMerge(node22, node16) |
|  sortedMerge(node22, node11) |
|  sortedMerge(node8, node11)  |
|  sortedMerge(node8, node4)   |
|------------------------------|
node16 next = node20
node16 -> node20 -> node22 -> node40

|------------------------------|
|  node16                      |
|  sortedMerge(node22, node11) |
|  sortedMerge(node8, node11)  |
|  sortedMerge(node8, node4)   |
|------------------------------|
node11 next = node16
node11 -> node16 -> node20 -> node22 -> node40

|------------------------------|
|  node11                      |
|  sortedMerge(node8, node11)  |
|  sortedMerge(node8, node4)   |
|------------------------------|
node8 next = node11
node8 -> node11 -> node16 -> node20 -> node22 -> node40

|------------------------------|
|  node8                       |
|  sortedMerge(node8, node4)   |
|------------------------------|
node4 next = node8
node4 -> node8 -> node11 -> node16 -> node20 -> node22 -> node40

|------------------------------|
|  node4                       |
|------------------------------|
node1 next = node4
node1 -> node4 -> node8 -> node11 -> node16 -> node20 -> node22 -> node40
```
## Iterative solution
```javascript
```
