import Keyboard from './keyboard.js';
const keyboard  = new Keyboard();
document.querySelector('#recordBtn').addEventListener('click',()=>keyboard.onRecordPress());
document.body.addEventListener('keypress', (ev)=> keyboard.onKeyPress(ev));
document.querySelector('#playBtn').addEventListener('click',()=>keyboard.onPlayPress());
