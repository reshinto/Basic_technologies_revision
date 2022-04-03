# Branch Sums

  Write a function that takes in a Binary Tree and returns a list of its branch
  sums ordered from leftmost branch sum to rightmost branch sum.
  
  A branch sum is the sum of all values in a Binary Tree branch. A Binary Tree
  branch is a path of nodes in a tree that starts at the root node and ends at
  any leaf node.
  
  Each BinaryTree node has an integer value, a
  left child node, and a right child node. Children
  nodes can either be BinaryTree nodes themselves or
  None / null
  
  Sample Input
  ```
  tree =     1
          /     \
         2       3
       /   \    /  \
      4     5  6    7
    /   \  /
  8     9 10
  ```
  Sample Output
  ```[15, 16, 18, 10, 11]```
  ```
  // 15 == 1 + 2 + 4 + 8
  // 16 == 1 + 2 + 4 + 9
  // 18 == 1 + 2 + 5 + 10
  // 10 == 1 + 3 + 6
  // 11 == 1 + 3 + 7
  ```
```python
# This is the class of the input root. Do not edit it.
class BinaryTree:
  def __init__(self, value):
    self.value = value
    self.left = None
    self.right = None
        
       
# solution 1
def branchSums(root):
  # Write your code here.
  if root is None:
    return []
  sums = []
  unvisited = {}
  total = 0
  tree_nodes = []
  tree_nodes.append(root)
  
  while len(tree_nodes) > 0:
    current = tree_nodes.pop()
    if current.value in unvisited:
      total = unvisited[current.value]
    total += current.value
    if not current.left and not current.right:
      sums.append(total)
      total -= current.value
    if current.right:
      tree_nodes.append(current.right)
      unvisited[current.right.value] = total
    if current.left:
      tree_nodes.append(current.left)
  return sums
  

# solution 2
def branchSums(root):
  # Write your code here.
  sums = []
  dfs(root, 0, sums)
  return sums
  

def dfs(current, total, sums):
  if current:
    total += current.value
    if not current.left and not current.right:
      sums.append(total)
      return
    dfs(current.left, total, sums)
    dfs(current.right, total, sums)
```
```javascript
// This is the class of the input root.
// Do not edit it.
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// solution 1
function branchSums(root) {
  // Write your code here.
  const sums = [];
  dfs(root, 0, sums);
  return sums;
}

function dfs(current, total, sums) {
  if (!current) {
    return;
  }
  total += current.value;
  if (!current.left && !current.right) {
    sums.push(total);
    return;
  }
  dfs(current.left, total, sums);
  dfs(current.right, total, sums);
}
```
