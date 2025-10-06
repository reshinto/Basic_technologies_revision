# Node Depths

The distance between a node in a Binary Tree and the tree's root is called the
node's depth.

Write a function that takes in a Binary Tree and returns the sum of its nodes'
depths.

Each BinaryTree node has an integer value, a
left child node, and a right child node. Children
nodes can either be BinaryTree nodes themselves or
None / null

Sample Input

```
  tree =    1
         /     \
        2       3
      /   \   /   \
     4     5 6     7
   /   \
  8     9
```

Sample Output
16

```
// The depth of the node with value 2 is 1.
// The depth of the node with value 3 is 1.
// The depth of the node with value 4 is 2.
// The depth of the node with value 5 is 2.
// Etc..
// Summing all of these depths yields 16.
```

```python
# This is the class of the input binary tree.
class BinaryTree:
  def __init__(self, value):
    self.value = value
    self.left = None
    self.right = None


# solution 1
def nodeDepths(root):
  # Write your code here.
  sum = 0
  s = [{"node": root, "d": 0}]
  while len(s) > 0:
    current = s.pop()
    node, d = current["node"], current["d"]
    if not node:
      continue
    s.append({"node": node.right, "d": d+1})
    s.append({"node": node.left, "d": d+1})
    sum += d
  return sum


# solution 2
def nodeDepths(root):
  # Write your code here.
  sum = 0
  s = [{"node": root, "d": 0}]
  while len(s) > 0:
    current = s.pop()
    node, d = current["node"], current["d"]
    if node.right:
      s.append({"node": node.right, "d": d+1})
    if node.left:
      s.append({"node": node.left, "d": d+1})
    sum += d
  return sum


# solution 3
def nodeDepths(root):
  # Write your code here.
  return getDepth(root, 0)


def getDepth(current, depth):
  if not current:
    return 0
  return depth + getDepth(current.left, depth+1) + getDepth(current.right, depth+1)
```

```javascript
// This is the class of the input binary tree.
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// solution 1
function nodeDepths(root) {
  // Write your code here.
  return getDepths(root, 0);
}

function getDepths(current, depth) {
  if (!current) {
    return 0;
  }
  return (
    depth +
    getDepths(current.left, depth + 1) +
    getDepths(current.right, depth + 1)
  );
}

// solution 2
function nodeDepths(root) {
  // Write your code here.
  let sum = 0;
  const s = [{node: root, d: 0}];
  while (s.length > 0) {
    const {node, d} = s.pop();
    if (!node) {
      continue;
    }
    sum += d;
    s.push({node: node.right, d: d + 1});
    s.push({node: node.left, d: d + 1});
  }
  return sum;
}
```
