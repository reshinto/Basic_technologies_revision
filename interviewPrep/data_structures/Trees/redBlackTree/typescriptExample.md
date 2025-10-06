# TypeScript Example

## utils

```ts
enum Colors {
  Red = 0,
  Black = 1,
}
```

```ts
enum Compare {
  LessThan = -1,
  BiggerThan = 1,
  Equals = 0,
}

function compare<T>(a: T, b: T): number {
  if (a === b) {
    return Compare.Equals;
  }
  return a < b ? Compare.LessThan : Compare.BiggerThan;
}
```

## Red Black Node

```ts
class RedBlackNode<T> extends Node<T> {
  left: RedBlackNode<T> = null;
  right: RedBlackNode<T> = null;
  parent: RedBlackNode<T> = null;
  color: Colors; // The red-black tree node has a special attribute of color

  constructor(public value: T) {
    super(value);
    this.color = Colors.Red; // The default color of the node is red
  }

  public isRed() {
    return this.color === Colors.Red;
  }

  public flipColor() {
    // solution 1
    if (this.color === Colors.Red) {
      this.color = Colors.Black;
    } else {
      this.color = Colors.Red;
    }
    // solution 2: Bitwise operation inverts the color of the node
    // this.color = 1 ^ this.color;
  }
}
```

## not refactored Red Black Tree example (with parent attribute)

```ts
class RedBlackTree<T> extends BinarySearchTree<T> {
  protected root: RedBlackNode<T> = null;

  /**
   * Left left case: rotate right
   *
   *       b                               a
   *      / \                             / \
   *     a   e -> rotationRight(b) ->    c   b
   *    / \                             / \
   *   c   d                           d   e
   *
   * @param node Node<T>
   */
  private rotationRight(node: RedBlackNode<T>) {
    const tmp = node.left;
    node.left = tmp.right;
    if (tmp.right && tmp.right.value) {
      tmp.right.parent = node;
    }
    tmp.parent = node.parent;
    if (!node.parent) {
      this.root = tmp;
    } else {
      if (node === node.parent.left) {
        node.parent.left = tmp;
      } else {
        node.parent.right = tmp;
      }
    }
    tmp.right = node;
    node.parent = tmp;
  }

  /**
   * Right right case: rotate left
   *
   *     a                              b
   *    / \                            / \
   *   c   b   -> rotationLeft(a) ->  a   e
   *      / \                        / \
   *     d   e                      c   d
   *
   * @param node Node<T>
   */
  private rotationLeft(node: RedBlackNode<T>) {
    const tmp = node.right;
    node.right = tmp.left;
    if (tmp.left && tmp.left.value) {
      tmp.left.parent = node;
    }
    tmp.parent = node.parent;
    if (!node.parent) {
      this.root = tmp;
    } else {
      if (node === node.parent.left) {
        node.parent.left = tmp;
      } else {
        node.parent.right = tmp;
      }
    }
    tmp.left = node;
    node.parent = tmp;
  }

  public insert(value: T) {
    // special case: first value
    if (this.root === null) {
      this.root = new RedBlackNode(value);
      this.root.color = Colors.Black;
    } else {
      const newNode = this.insertNode(this.root, value);
      this.fixTreeProperties(newNode);
    }
  }

  protected insertNode(node: RedBlackNode<T>, value: T): RedBlackNode<T> {
    if (compare(value, node.value) === Compare.LessThan) {
      if (node.left === null) {
        node.left = new RedBlackNode(value);
        node.left.parent = node;
        return node.left;
      } else {
        return this.insertNode(node.left, value);
      }
    } else if (node.right === null) {
      node.right = new RedBlackNode(value);
      node.right.parent = node;
      return node.right;
    } else {
      return this.insertNode(node.right, value);
    }
  }

  private fixTreeProperties(node: RedBlackNode<T>) {
    while (
      node &&
      node.parent &&
      node.parent.color === Colors.Red &&
      node.color !== Colors.Black
    ) {
      let parent = node.parent;
      const grandParent = parent.parent;

      // case A
      if (grandParent && grandParent.left === parent) {
        const uncle = grandParent.right;

        // case 1: uncle of node is also red - only recoloring
        if (uncle && uncle.color === Colors.Red) {
          grandParent.color = Colors.Red;
          parent.color = Colors.Black;
          uncle.color = Colors.Black;
          node = grandParent;
        } else {
          // case 2: node is right child - left rotate
          if (node === parent.right) {
            this.rotationLeft(parent);
            node = parent;
            parent = node.parent;
          }

          // case 3: node is left child - right rotate
          this.rotationRight(grandParent);
          // swap color
          parent.color = Colors.Black;
          grandParent.color = Colors.Red;
          node = parent;
        }
      } else {
        // case B: parent is right child of grand parent

        const uncle = grandParent.left;

        // case 1: uncle is read - only recoloring
        if (uncle && uncle.color === Colors.Red) {
          grandParent.color = Colors.Red;
          parent.color = Colors.Black;
          uncle.color = Colors.Black;
          node = grandParent;
        } else {
          // case 2: node is left child - left rotate
          if (node === parent.left) {
            this.rotationRight(parent);
            node = parent;
            parent = node.parent;
          }

          // case 3: node is right child - left rotate
          this.rotationLeft(grandParent);
          // swap color
          parent.color = Colors.Black;
          grandParent.color = Colors.Red;
          node = parent;
        }
      }
    }
    this.root.color = Colors.Black;
  }

  public getRoot() {
    return this.root;
  }
}
```

## refactored Red Black Tree (without parent attribute)

```ts
class RedBlackTree<T> extends BinarySearchTree<T> {
  protected root: RedBlackNode<T> = null;

  /**
   * Left left case: rotate right
   * Whether it is left-handed or right-handed,
   * the implementation is similar to the left-handed and right-handed AVL tree
   *
   *       a                           c
   *      / \                         / \
   *     c   b -> rotateRight(a) ->   d   a
   *    / \                             / \
   *   d   e                           e   b
   *
   * @param node Node<T>
   */
  private rotateRight(node: RedBlackNode<T>): RedBlackNode<T> {
    const tmp = node.left;
    node.left = tmp.right;
    tmp.right = node;
    tmp.color = node.color;
    node.color = Colors.Red;
    return tmp;
  }

  /**
   * Right right case: rotate left
   *
   *     b                              d
   *    / \                            / \
   *   a   d   -> rotateLeft(b) ->    b   e
   *      / \                        / \
   *     c   e                      a   c
   *
   * @param node Node<T>
   */
  private rotateLeft(node: RedBlackNode<T>): RedBlackNode<T> {
    const tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    tmp.color = node.color;
    node.color = Colors.Red;
    return tmp;
  }

  /**
   * @description: Insert element
   */
  public insert(value: T) {
    this.root = this.insertNode(this.root, value);
    this.root.color = Colors.Black;
  }

  /**
   * @description: recursive method to add element
   */
  protected insertNode(node: RedBlackNode<T>, value: T): RedBlackNode<T> {
    // Baseline condition, if inserted into a blank node, insert a red node
    if (node === null) {
      let node = new RedBlackNode(value);
      node.color = Colors.Red;
      return node;
    }

    if (compare(value, node.value) === Compare.LessThan) {
      node.left = this.insertNode(node.left, value);
    } else if (compare(value, node.value) === Compare.BiggerThan) {
      node.right = this.insertNode(node.right, value);
    } else {
      node.value = value;
    }

    return this.balance(node);
  }

  /**
   * @description: remove minimum element
   */
  public deleteMin() {
    if (this.root) return;

    // If the left and right sides of the root node are black, set the root node to red
    if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
      this.root.color = Colors.Red;

    // call recursive method that deletes the smallest value
    this.root = this.deleteMinNode(this.root);
    // Finally correct the root node color to black
    if (this.root) this.root.color = Colors.Black;
  }

  /**
   * @description: Recursive method to delete smallest element
   */
  private deleteMinNode(node: RedBlackNode<T>): RedBlackNode<T> {
    if (node.left === null) return null;

    // If the left and right nodes are black, call moveRedLeft
    if (!this.isRed(node.left) && !this.isRed(node.left.left))
      node = this.moveRedLeft(node);

    // recursively call to find the smallest value after deletion
    node.left = this.deleteMinNode(node.left);
    // Balance nodes after each recursion
    return this.balance(node);
  }

  /**
   * @description: remove max element
   */
  public deleteMax() {
    if (!this.root) return;

    // If all children of the root node are black, set the root node to red
    if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
      this.root.color = Colors.Red;

    // Call the recursive method that deletes the largest node and assign to root
    this.root = this.deleteMaxNode(this.root);
    // Correct the root node color to black
    if (this.root) this.root.color = Colors.Black;
  }

  /**
   * @description: Recursive method to delete largest element
   */
  private deleteMaxNode(node: RedBlackNode<T>): RedBlackNode<T> {
    // When the left child node is red, rotate right
    if (this.isRed(node.left)) node = this.rotateRight(node);

    if (node.right === null) return null;

    // If the left and right nodes are black, call moveRedRight
    if (!this.isRed(node.right) && !this.isRed(node.right.left))
      node = this.moveRedRight(node);

    // recursively call to find max value after deletion
    node.right = this.deleteMaxNode(node.right);

    // balance nodes after each recursion
    return this.balance(node);
  }

  /**
   * @description: delete the specified element
   */
  public delete(value: T) {
    // return directly if there is no node
    if (!this.search(value)) return;

    // If all children of the root node are black, set the root node to red
    if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
      this.root.color = Colors.Red;

    // call recursive method to delete node
    this.root = this.deleteNode(this.root, value);
    // Correct the root node color to black
    if (this.root) this.root.color = Colors.Black;
  }

  /**
   * @description: Recursive method to delete specified element
   */
  private deleteNode(node: RedBlackNode<T>, value: T): RedBlackNode<T> {
    // if the value is smaller than the current node
    if (compare(value, node.value) === Compare.LessThan) {
      if (!this.isRed(node.left) && !this.isRed(node.left?.left))
        node = this.moveRedLeft(node);
      // continue recursion
      node.left = this.deleteNode(node.left, value);
      // if value is not less than current node
    } else {
      if (this.isRed(node.left)) node = this.rotateRight(node);

      // The corresponding node is found and the right child node is empty
      if (compare(value, node.value) === Compare.Equals && node.right === null)
        return null;

      // If the left and right nodes are black, call moveRedRight
      if (!this.isRed(node.right) && !this.isRed(node.right?.left))
        node = this.moveRedRight(node);

      // The corresponding node is found, and the right child node is not empty
      if (compare(value, node.value) === Compare.Equals) {
        const x = this.minNode(node.right);
        node.value = x.value;
        node.right = this.deleteMinNode(node.right);
        // if not found, continue recursion
      } else {
        // If the corresponding node is not found, continue recursion
        node.right = this.deleteNode(node.right, value);
      }
    }
    // balance nodes after each recursion
    return this.balance(node);
  }

  /**
   * @description: return root node
   */
  public getRoot(): RedBlackNode<T> {
    return this.root;
  }

  /**
   * @description: fix node color
   */
  private flipColors(node: RedBlackNode<T>) {
    node.flipColor();
    node.left.flipColor();
    node.right.flipColor();
  }

  /**
   * @description: Balanced tree
   */
  private balance(node: RedBlackNode<T>): RedBlackNode<T> {
    // The core algorithm generates a left-leaning red-black tree through three lines of judgment
    // Right red and left black, rotate left to rotate the red node to the left
    if (this.isRed(node.right) && !this.isRed(node.left))
      node = this.rotateLeft(node);
    // Left red and left left are also red, rotate right
    if (this.isRed(node.left) && this.isRed(node.left?.left))
      node = this.rotateRight(node);
    // Whether it is rotated out or inserted naturally, as long as the two reds are siblings, they will change color and move the red one layer up
    if (this.isRed(node.left) && this.isRed(node.right)) this.flipColors(node);
    return node;
  }

  /**
   * @description: If the node is red and the left and right are black, make the left or left child node red
   */
  private moveRedLeft(node: RedBlackNode<T>): RedBlackNode<T> {
    this.flipColors(node);
    if (this.isRed(node.right.left)) {
      node.right = this.rotateRight(node.right);
      node = this.rotateLeft(node);
      this.flipColors(node);
    }
    return node;
  }

  /**
   * @description: If the node is red, and the node's right and right-left are black, make the node's right or right child red
   */
  private moveRedRight(node: RedBlackNode<T>): RedBlackNode<T> {
    this.flipColors(node);
    if (this.isRed(node.left.left)) {
      node = this.rotateLeft(node);
      this.flipColors(node);
    }
    return node;
  }

  /**
   * @description: Determine if the node is red
   */
  private isRed(node: RedBlackNode<T>) {
    // If empty, assume as black
    // This is very important, equivalent to all black empty nodes at the bottom of the tree
    if (!node) {
      return false;
    }
    return node.isRed();
  }
}
```
