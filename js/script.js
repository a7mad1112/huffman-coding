import HuffmanTree from './huffmanTree.js';
const sendBtn = document.getElementById('send-btn');
const textarea = document.getElementById('originalMessage');
const fileInput = document.getElementById('fileInput');
const encodedMsg = document.querySelector('#encodedMsg > span');
const decodedMsg = document.querySelector('#decodedMsg > span');
const encodedFileInput = document.getElementById('encodedFileInput');
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
  let jsonFile = {};
  jsonFile.encodedMsg = huffmanTree.encode(textarea.value);
  jsonFile.huffmanTree = huffmanTree.minHeap.heap;
  jsonFile = JSON.stringify(jsonFile);
  downloadFile(jsonFile, 'encodedMsg.json');
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

function downloadFile(msg, fileName) {
  const blob = new Blob([msg], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}

encodedFileInput.addEventListener('change', function selectedFileChanged() {
  if (this.files.length === 0) {
    console.error('No file selected.');
    return;
  }
  let encodedFileContent;

  const reader = new FileReader();
  reader.onload = function fileReadCompleted() {
    encodedFileContent = JSON.parse(reader.result);
    encodedMsg.innerHTML = encodedFileContent.encodedMsg;
    console.log(encodedFileContent)
    decodedMsg.innerHTML = HuffmanTree.decode(encodedFileContent.encodedMsg, encodedFileContent.huffmanTree)
  };
  reader.readAsText(this.files[0]);
});
