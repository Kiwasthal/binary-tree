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
let height = -1;

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
  searchNode(x, root = this.root) {
    if (root == null) return null;
    else if (root.datum === x) return root;
    else if (x < root.datum) return this.searchNode(x, root.left);
    else if (x > root.datum) return this.searchNode(x, root.right);
  }
  insertNode(x, root = this.root) {
    if (this.root === null) this.root = new Node(x);
    else if (root.datum > x && !this.root.left) root.left = new Node(x);
    else if (root.datum < x && !this.root.right) root.right = new Node(x);
    else if (root.datum > x) this.insertNode(x, root.left);
    else if (root.datum < x) this.insertNode(x, root.right);
  }
  deleteNode(x, root = this.root) {
    if (!root) return null;
    if (x == root.datum) {
      if (!root.left && !root.right) return null;
      if (!root.left) return root.right;
      if (!root.right) return root.left;
      let temp = root.right;
      let parent = null;

      while (temp) {
        if (!temp.left) break;
        parent = temp;
        temp = temp.left;
      }

      root.datum = temp.datum;
      if (!parent) root.right = temp.right;
      else if (!parent.left.right) parent.left = null;
      else parent.left = temp.right;
    } else if (x < root.datum) {
      root.left = this.deleteNode(x, root.left);
      return root;
    }
    root.right = this.deleteNode(x, root.right);
    return root;
  }
  find(x, root = this.root) {
    if (root === null) return null;
    if (root.datum === x) return root;
    if (x > root.datum) return this.find(x, root.right);
    if (x < root.datum) return this.find(x, root.left);
  }
  levelOrder(callback) {
    if (this.root === null) return;
    let queue = [this.root];
    let print = [];
    while (queue.length) {
      let cur = queue[0];
      callback ? callback(cur) : print.push(cur.datum);
      if (cur.left != null) queue.push(cur.left);
      if (cur.right != null) queue.push(cur.right);
      queue.shift();
    }
    if (!callback) return print;
  }
  // levelOrderRec(callback, root = this.root, h = this.BSTheight(), print = []) {
  //   if (root == null) return print;
  //   print.push(root.datum);
  //   if (h > 1) {
  //     this.levelOrderRec(callback, root.left, h - 1, print);
  //     this.levelOrderRec(callback, root.right, h - 1, print);
  //   }
  //   return print;
  // }
  inorder(callback, root = this.root, print = []) {
    if (!root) return;
    this.inorder(callback, root.left, print);
    callback ? callback(root) : print.push(root.datum);
    this.inorder(callback, root.right, print);
    return print;
  }
  preorder(callback, root = this.root, print = []) {
    if (!root) return;
    callback ? callback(root) : print.push(root.datum);
    this.inorder(callback, root.left, print);
    this.inorder(callback, root.right, print);
    return print;
  }
  postorder(callback, root = this.root, print = []) {
    if (!root) return;
    this.inorder(callback, root.left, print);
    this.inorder(callback, root.right, print);
    callback ? callback(root) : print.push(root.datum);
    return print;
  }
  findNodeHeight(x, root) {
    if (root == null) return -1;
    let leftH = this.findNodeHeight(x, root.left);
    let rightH = this.findNodeHeight(x, root.right);
    let res = Math.max(leftH, rightH) + 1;
    if (root.datum === x) height = res;
    return res;
  }
  height(x, root = this.root) {
    this.findNodeHeight(x, root);

    return height;
  }

  depth(x, root = this.root) {
    if (root === null) return -1;
    let distance = -1;
    if (
      root.datum === x ||
      (distance = this.depth(x, root.left)) >= 0 ||
      (distance = this.depth(x, root.right)) >= 0
    )
      return distance + 1;
    return distance;
  }
}

const bst = new BinarySeachTree();
bst.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// bst.deleteNode(6345, bst.root);
console.log(bst.inorder());
console.log(bst.levelOrder());
console.log(bst.depth(4));
console.log(bst.height(4));
