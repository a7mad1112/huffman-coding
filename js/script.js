// // Import the HuffmanTree class
// import HuffmanTree from './huffmanTree.js';

// // Example usage:

// // Create an instance of HuffmanTree
// const huffmanTree = new HuffmanTree();

// // Define the message to encode
// const messageToEncode = 'hello world';

// // Calculate the frequency of each character in the message
// const frequencies = {};
// for (const char of messageToEncode) {
//   frequencies[char] = (frequencies[char] || 0) + 1;
// }

// // Build the Huffman tree
// huffmanTree.buildTree(frequencies);

// // Encode the message
// const encodedMessage = huffmanTree.encode(messageToEncode);

// // Print the encoded message and the Huffman codes
// console.log(`Original Message: ${messageToEncode}`);
// console.log(`Encoded Message: ${encodedMessage}`);
// console.log('Huffman Codes:', huffmanTree.codes);

// console.log('######################################');

// // Decode the message
// // const decodedMessage = huffmanTree.decode(encodedMessage);

// // Print the decoded message
// // console.log(`Decoded Message: ${decodedMessage}`);

import MinHeap from './minHeap.js';
const heap = new MinHeap();

class HuffmanNode {
  constructor(character, frequency) {
    this.character = character;
    this.frequency = frequency;
    this.left = null;
    this.right = null;
  }
}

heap.add(new HuffmanNode('G', 7));
heap.add(new HuffmanNode('A', 1));
heap.add(new HuffmanNode('B', 2));
heap.add(new HuffmanNode('C', 3));
heap.add(new HuffmanNode('Y', 1));
heap.add(new HuffmanNode('X', 2));

heap.printHeap();
