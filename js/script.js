import HuffmanTree from './huffmanTree.js';
const sendBtn = document.getElementById('send-btn');
const textarea = document.getElementById('originalMessage');
const fileInput = document.getElementById('fileInput');
const encodedMsg = document.querySelector('#encodedMsg > span');
const decodedMsg = document.querySelector('#decodedMsg > span');
fileInput.addEventListener('change', function selectedFileChanged() {
  if (this.files.length === 0) {
    console.error('No file selected.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function fileReadCompleted() {
    textarea.value = reader.result;
  };
  reader.readAsText(this.files[0]);
});

sendBtn.onclick = (e) => {
  e.preventDefault();
  if (textarea.value == '') {
    alert('Please write a msg...');
    return;
  }
  const huffmanTree = new HuffmanTree();
  const frequencies = convertTextIntoFrequencies(textarea.value);
  huffmanTree.buildTree(frequencies);
  encodedMsg.innerHTML = huffmanTree.encode(textarea.value);
  decodedMsg.innerHTML = huffmanTree.decode(encodedMsg.innerHTML);
  textarea.value = '';
  fileInput.value = null;
};

const convertTextIntoFrequencies = (txt) => {
  /*
  Frequencies Example:
  {
  'A': 2,
  'B': 5,
  'C': 1,
  }
  */
  const frequencies = {};
  for (const char of txt) {
    frequencies[char] = (frequencies[char] || 0) + 1;
  }
  return frequencies;
};
