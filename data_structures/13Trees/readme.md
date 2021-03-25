# Trees
- a special type of graph
- trees excel at storing data hierarchically and are commonly used as a means of testing your knowledge of recursion during coding interviews
- it is a data structure that consists of nodes, each with some value and pointers to child-nodes
  - which recursively form subtrees in the tree
- the 1st node in a tree is referred to as the root of the tree
  - while the nodes at the bottom of a tree (the nodes with no child-nodes) are referred to as leaf nodes or leaves
  - the paths between the root of a tree and its leaves are called branches
  - the height of a tree is the length of its longest branch
  - the depth of a tree node is its distance from its tree's root
    - also known as the node's level in the tree
- a tree is effectively a graph that's connected, directed, and acyclic
  - has an explicit root node, and whose nodes all have a single parent (except for the root node)
  - in most implementations of trees, tree nodes don't have a pointer to their parent, but can if desired
## Types of trees
### Binary Trees
- the root node has 2 child nodes
- every other nodes have up to 2 child nodes
- the structure of a binary tree is such that many of its operations have a logarithmic time complexity, making binary tree a commonly used data structure
```python
class BinaryTree:
  def __init__(self, value):
    self.value = value
    self.left = None
    self.right = None
```
#### K-ary Tree
- a tree where every node (including the root) have up to k child nodes
  - e.g.: a binary tree is a k-ary tree where k == 2
#### Perfect Binary Tree
- a binary tree whose interior nodes all have 2 child nodes and whose leaf nodes all have the same depth
    ```
            1
        /         \
       2           3
      /  \       /   \
     4    5     6     7
     /\   /\    /\    /\
    8  9 10 11 12 13 14 15
    ```
#### Complete Binary Tree
- a binary tree that's almost perfect
- its interior nodes all have 2 child nodes
- but its leaf nodes don't necessarily all have the same depth
- furthermore, the nodes in the last level of a complete binary tree are as far left as possible
    ```
          1
        /   \
       2     3
      / \   / \
     4   5 6   7
     /\
    8  9
    ```
- a binary tree is incomplete if the nodes in its last level aren't as far left as possible
    ```
          1
        /   \
       2     3
      / \   / \
     4   5 6   7
        /   \
       8     9
    ```
#### Balanced Binary Tree
```
       1
     /    \
    2      3
   / \    / \
  4   5  6   7
 / \        /
10  9      8
```
- a binary tree whose nodes all have left and right subtrees whose heights differ by no more than 1
- a balanced binary tree is such that the logarithmic time complexity of its operations is maintained
- e.g.: inserting a node at the bottom of the following imbalanced binary tree's left subtree would clearly not be a logarithmic-time operation, since it would involve traversing through most of the tree's nodes
    ```
             1
           /  \
          2    3
         /
        4
       /
      8
     /
    10
    ```
#### Full Binary Tree
- a binary tree whose nodes all have either 2 child nodes or 0 child nodes
    ```
      1
     / \
    2   3
       / \
      6   7
     / \
    8   9
    ```
### Heaps
- they are typically binary heaps
- a special type of binary trees, where every node in the tree satisfies the min or max heap property
#### Min Heaps
#### Max Heaps
### Ternary Tree
- the root node has 3 child nodes
- every other nodes have up to 3 child nodes
### Tries
- a tree like data structure that typically stores characters in a string
### AVL Trees
- able to rebalance themselves to obtain the log N complexity
### Red Black Trees
- able to rebalance themselves to obtain the log N complexity
## standard operations and complexities
### Storing all types of tree: O(N) space
- N is the total number of nodes in the tree
### Traversing through the entire tree: O(N) time
### Traversing 1 subtree at every step for a balance binary tree: O(log N) time on average
- if the tree is skewed, it becomes O(N) time on worst
## Binary Search
```python
def binary_search(tree, target):
  current = tree
  while current:
    if current.value == target:
      return current.value
    if target > current.value:
      current = current.right
    elif target < current.value:
      current = current.left
    else:
      break
  return None
```
## Traversal Types
### Breath First Traversal
### Depth First Traversal
#### Inorder (Left, Root, Right)
1. Traverse the left subtree, i.e., call Inorder(left-subtree)
2. Visit the root.
3. Traverse the right subtree, i.e., call Inorder(right-subtree)
```python
def dfs(current_node):
	if current_node:
  	dfs(current_node.left)
    print(current_node.value)
	  dfs(current_node.right)
```
```python
def dfs(root):
  if root is None:
    return
 
  node_stack = []
  node_stack.append(root)
 
  while(len(node_stack) > 0):
    current = node_stack.pop()
         
    # Note that right child is pushed first so that left is processed first
    if current.right:
      node_stack.append(current.right)
    
    print(current.value)
        
    if current.left:
      node_stack.append(current.left)
```
#### Preorder (Root, Left, Right)
1. Visit the root.
2. Traverse the left subtree, i.e., call Preorder(left-subtree)
3. Traverse the right subtree, i.e., call Preorder(right-subtree)
```python
def dfs(current_node):
	if current_node:
    print(current_node.value)
	  dfs(current_node.left)
	  dfs(current_node.right)
```
```python
def dfs(root):
  if root is None:
    return
 
  node_stack = []
  node_stack.append(root)
 
  while(len(node_stack) > 0):
    current = node_stack.pop()
    print(current.value)
         
    # Note that right child is pushed first so that left is processed first
    if current.right:
      node_stack.append(current.right)  
    if current.left:
      node_stack.append(current.left)
```
#### Postorder (Left, Right, Root)
1. Traverse the left subtree, i.e., call Postorder(left-subtree)
2. Traverse the right subtree, i.e., call Postorder(right-subtree)
3. Visit the root.
```python
def dfs(current_node):
	if current_node:
  	dfs(current_node.left)
	  dfs(current_node.right)
    print(current_node.value)
```
```python
def dfs(root):
  if root is None:
    return
 
  node_stack = []
  node_stack.append(root)
 
  while(len(node_stack) > 0):
    current = node_stack.pop()
         
    # Note that right child is pushed first so that left is processed first
    if current.right:
      node_stack.append(current.right)  
    if current.left:
      node_stack.append(current.left)
      
    print(current.value)
```
