# Reverse Linked List
```
Linked list are common data structures used to store data that is not necessarily contiguously stored in memory
Recursion can be used for such things

input: node1 -> node2 -> node3 -> node4 -> node5 -> node6
output: node1 <- node2 <- node3 <- node4 <- node5 <- node6
```
```javascript
function reverseList(head) {
  if (!head || !head.next) {
    return head;
  }
  newFirstNode = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return newFirstNode;
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
input: node1 -> node2 -> node3 -> node4 -> node5 -> node6

current node is node1
since current head and head.next is not null or undefined,
it means that there is a next node which it is pointing to.
therefore, the return value would be added to the stack and code will move to the next node at node2
|--------------------|
| reverseList(node2) |
|--------------------|

move to the next recursion call
current node is node2
since current head and head.next is not null or undefined,
it means that there is a next node which it is pointing to.
therefore, the return value would be added to the stack and code will move to the next node at node3
|--------------------|
| reverseList(node3) |
| reverseList(node2) |
|--------------------|

move to the next recursion call
current node is node3
since current head and head.next is not null or undefined,
it means that there is a next node which it is pointing to.
therefore, the return value would be added to the stack and code will move to the next node at node4
|--------------------|
| reverseList(node4) |
| reverseList(node3) |
| reverseList(node2) |
|--------------------|

move to the next recursion call
current node is node4
since current head and head.next is not null or undefined,
it means that there is a next node which it is pointing to.
therefore, the return value would be added to the stack and code will move to the next node at node5
|--------------------|
| reverseList(node5) |
| reverseList(node4) |
| reverseList(node3) |
| reverseList(node2) |
|--------------------|

move to the next recursion call
current node is node5
since current head and head.next is not null or undefined,
it means that there is a next node which it is pointing to.
therefore, the return value would be added to the stack and code will move to the next node at node6
|--------------------|
| reverseList(node6) |
| reverseList(node5) |
| reverseList(node4) |
| reverseList(node3) |
| reverseList(node2) |
|--------------------|

move to the next recursion call
current node is node6
since current head.next is null, this has hit the base case,
it will start executing by poping the top stack frame from the call stack

node1 -> node2 -> node3 -> node4 -> node5 -> node6

return result: node6
|--------------------|
| node6              |
| reverseList(node5) |
| reverseList(node4) |
| reverseList(node3) |
| reverseList(node2) |
|--------------------|

continue at current node5
node6 is popped off the stack and assigned to newFirstNode
set node5.next.next which is node6.next as node5
break node5.next which was node6 and set as null;

node1 -> node2 -> node3 -> node4 -> node5 | node6 -> node5

return result: node6
|--------------------|
| node6              |
| reverseList(node4) |
| reverseList(node3) |
| reverseList(node2) |
|--------------------|

continue at current node4
node6 is popped off the stack and assigned to newFirstNode
set node4.next.next which is node5.next as node4
break node4.next which was node5 and set as null;

node1 -> node2 -> node3 -> node4 | node6 -> node5 -> node4

return result: node6
|--------------------|
| node6              |
| reverseList(node3) |
| reverseList(node2) |
|--------------------|

continue at current node3
node6 is popped off the stack and assigned to newFirstNode
set node3.next.next which is node4.next as node3
break node3.next which was node4 and set as null;

node1 -> node2 -> node3 | node6 -> node5 -> node4 -> node3

return result: node6
|--------------------|
| node6              |
| reverseList(node2) |
|--------------------|

continue at current node2
node6 is popped off the stack and assigned to newFirstNode
set node2.next.next which is node3.next as node2
break node2.next which was node3 and set as null;

node1 -> node2 | node6 -> node5 -> node4 -> node3 -> node2

return result: node6
|--------------------|
| node6              |
|--------------------|

continue at current node1
node6 is popped off the stack and assigned to newFirstNode
set node1.next.next which is node2.next as node1
break node1.next which was node2 and set as null;

node1 | node6 -> node5 -> node4 -> node3 -> node2 -> node1

return result: node6

output: node6 -> node5 -> node4 -> node3 -> node2 -> node1
```
## Iterative solution
```javascript
function reverseList(head) {
  let newNext = null;
  let current = head;
  while (current) {
    const tmp = current.next;
    current.next = newNext;
    newNext = current;
    current = tmp;
  }
  return newNext;
}
```
