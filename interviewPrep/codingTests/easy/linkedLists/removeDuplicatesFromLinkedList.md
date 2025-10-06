# Remove Duplicates From Linked List

You're given the head of a Singly Linked List whose nodes are in sorted order
with respect to their values. Write a function that returns a modified version
of the Linked List that doesn't contain any nodes with duplicate values. The
Linked List should be modified in place (i.e., you shouldn't create a brand
new list), and the modified Linked List should still have its nodes sorted
with respect to their values.

Each LinkedList node has an integer value as well as
a next node pointing to the next node in the list or to
None / null if it's the tail of the list.

Sample Input
`linkedList = 1 -> 1 -> 3 -> 4 -> 4 -> 4 -> 5 -> 6 -> 6 `

Sample Output
`1 -> 3 -> 4 -> 5 -> 6 `

```python
# This is an input class. Do not edit.
class LinkedList:
  def __init__(self, value):
    self.value = value
    self.next = None


def removeDuplicatesFromLinkedList(linkedList):
  # Write your code here.
  current = linkedList
  while current:
    while current.next and current.value == current.next.value:
      current.next = current.next.next
    current = current.next
  return linkedList
```

```javascript
// This is an input class. Do not edit.
class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function removeDuplicatesFromLinkedList(linkedList) {
  // Write your code here.
  let current = linkedList;
  while (current) {
    while (current.next && current.value === current.next.value) {
      current.next = current.next.next;
    }
    current = current.next;
  }
  return linkedList;
}
```
