import CanvasField from './canvasField.js';
const CanvasGame = new CanvasField();
CanvasGame.initiate();
window.addEventListener('deviceorientation', (ev)=>CanvasGame.getPhonePosition(ev));
