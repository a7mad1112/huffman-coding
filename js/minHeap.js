export default class MinHeap {
  constructor() {
    this.heap = [];
  }

  // Helper Methods
  // Root is at index 0 in array.
  // Left child of i-th node is at (2*i + 1)th index.
  // Right child of i-th node is at (2*i + 2)th index.
  // Parent of i-th node is at (i-1)/2 index.
  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }
  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }
  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.heap.length;
  }
  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.heap.length;
  }
  hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }
  leftChild(index) {
    return this.heap[this.getLeftChildIndex(index)];
  }
  rightChild(index) {
    return this.heap[this.getRightChildIndex(index)];
  }
  parent(index) {
    return this.heap[this.getParentIndex(index)];
  }

  // Functions to create Min Heap

  swap(indexOne, indexTwo) {
    const temp = this.heap[indexOne];
    this.heap[indexOne] = this.heap[indexTwo];
    this.heap[indexTwo] = temp;
  }

  peek() {
    if (this.heap.length === 0) {
      return null;
    }
    return this.heap[0];
  }

  // Removing an element will remove the
  // top element with highest priority
  remove() {
    if (this.heap.length === 0) {
      return null;
    }
    const item = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.heapifyDown();
    return item;
  }

  add(item) {
    this.heap.push(item);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    // Compare using the custom comparison function
    while (
      this.hasParent(index) &&
      this.compare(this.parent(index), this.heap[index]) > 0
    ) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      // Compare using the custom comparison function
      if (
        this.hasRightChild(index) &&
        this.compare(this.rightChild(index), this.leftChild(index)) < 0
      ) {
        smallerChildIndex = this.getRightChildIndex(index);
      }
      // Compare using the custom comparison function
      if (this.compare(this.heap[index], this.heap[smallerChildIndex]) < 0) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }
      index = smallerChildIndex;
    }
  }

  // Custom comparison function based on the frequency of HuffmanNodes
  compare(nodeA, nodeB) {
    return nodeA.frequency - nodeB.frequency;
  }

  printHeap() {
    var heap = ` ${JSON.stringify(this.heap[0])} `;
    for (var i = 1; i < this.heap.length; i++) {
      heap += ` ${JSON.stringify(this.heap[i])} `;
    }
    console.log(heap);
  }
}
