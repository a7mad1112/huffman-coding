export default class MinHeap {
  //? # in javaScript means a private member
  #heap;
  #compare;
  constructor(compareFunction = (a, b) => a - b) {
    this.#heap = [];
    // the defalut behavior of compare function is to compare two numbers
    // (in some cases the programmer need deal with objects comparisons)
    this.#compare = compareFunction;
  }

  // heap based array formula:
  // root is at index 0 in array.
  // left child of i-th node is at (2*i + 1)th index.
  // right child of i-th node is at (2*i + 2)th index.
  // parent of i-th node is at (i-1)/2 index.

  //? methods to get the indexes of items
  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }
  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  //? mtehods to check items if exist or not
  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.#heap.length;
  }
  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.#heap.length;
  }
  hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }

  //? a methods to get the items (accessors)
  leftChild(index) {
    if (this.hasLeftChild(index))
      return this.#heap[this.getLeftChildIndex(index)];
    return null;
  }
  rightChild(index) {
    if (this.hasRightChild(index))
      return this.#heap[this.getRightChildIndex(index)];
    return null;
  }
  parent(index) {
    if (this.hasParent(index)) return this.#heap[this.getParentIndex(index)];
    return null;
  }

  // Functions to create Min Heap
  #swap(indexOne, indexTwo) {
    [this.#heap[indexOne], this.#heap[indexTwo]] = [
      this.#heap[indexTwo],
      this.#heap[indexOne],
    ];
  }

  peek() {
    if (this.#heap.length === 0) {
      return null;
    }
    return this.#heap[0];
  }

  // remove an element will remove the
  // top element with highest priority(the minimum value is the highest priority)
  remove() {
    if (this.#heap.length === 0) {
      return null;
    }
    const item = this.#heap[0];
    this.#heap[0] = this.#heap[this.#heap.length - 1];
    this.#heap.pop();
    this.#heapifyDown();
    return item;
  }

  add(item) {
    this.#heap.push(item);
    this.#heapifyUp();
  }

  //? after adding an element, the heap tree have to be maintained. this method is responsible to do this
  #heapifyUp() {
    let index = this.#heap.length - 1;
    while (
      this.hasParent(index) &&
      this.#compare(this.parent(index), this.#heap[index]) > 0
    ) {
      this.#swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  //? after removing an element, the heap tree have to be maintained. this method is responsible to do this
  #heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallChildIndex = this.getLeftChildIndex(index);
      if (
        this.hasRightChild(index) &&
        // comparing the left with the right, if the left smaller then the value in comparison will be negative
        this.#compare(this.rightChild(index), this.leftChild(index)) < 0
      ) {
        smallChildIndex = this.getRightChildIndex(index);
      }
      if (this.#compare(this.#heap[index], this.#heap[smallChildIndex]) < 0) {
        break;
      } else {
        this.#swap(index, smallChildIndex);
      }
      index = smallChildIndex;
    }
  }

  printHeap() {
    const minHeapString = this.#heap.join(', ');
    console.log(minHeapString);
  }
}
