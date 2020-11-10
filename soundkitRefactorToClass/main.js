import Keyboard from './keyboard.js';
const keyboard  = new Keyboard();
document.querySelector('#recordBtn').addEventListener('click',keyboard.onRecordPress);
document.body.addEventListener('keypress', keyboard.onKeyPress);
document.querySelector('#playBtn').addEventListener('click',keyboard.onPlayPress);
