class Node {
  constructor(datum) {
    this.datum = datum;
    this.left = null;
    this.right = null;
  }
}

let pruneDuplicates = arr => {
  let prunedArray = [];
  for (i = 0; i < arr.length; i++) {
    if (prunedArray.indexOf(arr[i]) === -1) prunedArray.push(arr[i]);
  }
  return prunedArray;
};

class BinarySeachTree {
  constructor() {
    this.root = null;
  }
  buildTree(arr) {
    let uniqueArr = pruneDuplicates(arr.sort((a, b) => a - b));
    return this.insertArraytoBST(uniqueArr, 0, uniqueArr.length - 1);
  }
  insertArraytoBST(arr, start, end) {
    if (start > end) return null;
    let mid = parseInt((start + end) / 2);
    let node = new Node(arr[mid]);
    if (this.root === null) this.root = node;
    node.left = this.insertArraytoBST(arr, start, mid - 1);
    node.right = this.insertArraytoBST(arr, mid + 1, end);

    return node;
  }
  searchNode(x, root) {
    if (root == null) return null;
    else if (root.datum === x) return root;
    else if (x < root.datum) return this.searchNode(x, root.left);
    else if (x > root.datum) return this.searchNode(x, root.right);
  }
  insertNode(x, root) {
    if (this.root === null) this.root = new Node(x);
    else if (root.datum > x && !this.root.left) root.left = new Node(x);
    else if (root.datum < x && !this.root.right) root.right = new Node(x);
    else if (root.datum > x) this.insertNode(x, root.left);
    else if (root.datum < x) this.insertNode(x, root.right);
  }
  deleteNode(x, root) {
    if (root === null) return null;
    if (x < root.datum) root.left = this.deleteNode(x, root.left);
    else if (x > root.datum) root.right = this.deleteNode(x, root.right);
    else {
      if (root.left === null) return root.right;
      else if (root.right === null) return root.left;
      root.datum = this.minValue(root.right);
      root.right = this.deleteNode(root.right, root.datum);
    }
    return root;
  }
  minValue(root) {
    let minV = root.datum;
    while (root.left !== null) {
      minV = root.left.datum;
      root = root.left;
    }
    return minV;
  }
  inorder(root) {
    if (!root) return;
    this.inorder(root.left);
    console.log(root.datum);
    this.inorder(root.right);
  }
}

const bst = new BinarySeachTree();
bst.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(bst.inorder(bst.root));
console.log(bst.deleteNode(23, bst.root));
console.log(bst.inorder(bst.root));
