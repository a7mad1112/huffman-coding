import MinHeap from './minHeap.js';
class HuffmanNode {
  constructor(character, frequency) {
    this.character = character;
    this.frequency = frequency;
    this.left = null;
    this.right = null;
  }
}

export default class HuffmanTree {
  constructor() {
    this.minHeap = new MinHeap();
    this.codes = {};
  }

  /*
  frequencies example:
  {
    A: 2,
    B: 5,
    C: 1
  }
  */
  buildTree(frequencies) {
    // Create leaf nodes for each character and add them to the MinHeap
    for (const [character, frequency] of Object.entries(frequencies)) {
      const newNode = new HuffmanNode(character, frequency);
      this.minHeap.add(newNode);
    }

    while (this.minHeap.heap.length > 1) {
      const left = this.minHeap.remove();
      const right = this.minHeap.remove();
      const merged = new HuffmanNode(null, left.frequency + right.frequency);
      merged.left = left;
      merged.right = right;
      this.minHeap.add(merged);
    }

    const root = this.minHeap.peek();
    this.generateCodes(root, '');
  }

  generateCodes(node, code) {
    if (!node) {
      return;
    }
    if (node.character != null) {
      this.codes[node.character] = code;
    }
    this.generateCodes(node.left, code + '0');
    this.generateCodes(node.right, code + '1');
  }

  encode(message) {
    return message
      .split('')
      .map((character) => this.codes[character])
      .join('');
  }

  decode(encodedMessage) {
    let decoded = '';
    let node = this.minHeap.heap[0];
    for (const bit of encodedMessage) {
      node = bit === '0' ? node.left : node.right;
      if (node.character == null) {
        continue;
      } else {
        decoded += node.character;
      }
      if (node.left == null && node.right == null) {
        node = this.minHeap.heap[0];
      }
    }
    return decoded;
  }
}
