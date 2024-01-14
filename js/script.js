import HuffmanTree from './huffmanTree.js';
const sendBtn = document.getElementById('send-btn');
const textarea = document.getElementById('originalMessage');
const fileInput = document.getElementById('fileInput');
let msgToSend = '';

textarea.onchange = (e) => {
  msgToSend = e.target.value;
};

fileInput.addEventListener('change', function selectedFileChanged() {
  if (this.files.length === 0) {
    console.error('No file selected.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function fileReadCompleted() {
    msgToSend = textarea.value = reader.result;
  };
  reader.readAsText(this.files[0]);
});

sendBtn.onclick = (e) => {
  e.preventDefault();
  console.log(msgToSend);
};
