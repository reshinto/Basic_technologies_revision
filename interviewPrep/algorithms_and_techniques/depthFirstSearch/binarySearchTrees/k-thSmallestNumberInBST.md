# Depth First Search: Binary Search Trees
## K-th Smallest Number In BST
```
Given the root node of a valid BST and a number k, return the kth smallest number in this BST (1-indexed)

Input
  bst: a binary tree representing the existing BST
  k: an integer

Output
  The kth smallest number in bst

Example 1:
  Input:
    bst = <See explanation>
    k = 4
  
  Output: 6

Explanation:
    8
   / \
  5   10
 / \    \
2   6    14
 \
  3
  
Constraints
  1 <= k <= n <= 10^5, where n is the size of bst
```
```javascript
class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function dfs(tree, result) {
  if (tree.left) dfs(tree.left, result);
  result.push(tree.val);
  if (tree.right) dfs(tree.right, result);
}

function kthSmallest(bst, k) {
  const result = [];
  dfs(bst, result);
  return result[k-1];
}
```
### Explanation
- To find the kth smallest element in a BST is simple
- Consider the root node of a BST:
  - because everything in the left subtree is smaller and everything in the right tree is larger
  - the root node is the m + 1th largest value in the BST, where m is the size of the left subtree
- In that case, we can compare this number to k
  - If they are equal, then the root is the value we want
  - If it is smaller, we look in the right subtree and find the k - m - 1th smallest value there
    - as everything there is larger than the root and the left subtree
  - If it's larger, we look in the left subtree and find the kth smallest value there
- time complexity is `O(k)`
