import FlakesCreator from './flakesCreator.js';

const htmlCanvas = document.getElementById('canvas');

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
htmlCanvas.width = windowWidth;
htmlCanvas.height = windowHeight;
const ctx = htmlCanvas.getContext('2d');

const flakesNumber = 1000;
const flakesSpeed = 5;
const flakesFallingRadius = 3;
const flakesCreator = new FlakesCreator(flakesNumber,flakesSpeed, flakesFallingRadius, windowWidth,windowHeight);
flakesCreator.CreateFlakes();
const flakesArray = flakesCreator.GetFlakes();

const m = Math;
function animate(){
    ctx.clearRect(0,0,windowWidth,windowHeight);
    for(const [index,flk] of flakesArray.entries()){
        ctx.beginPath();
        const xMove = 1+flk.fallingRadius;
        const yMove = 1+flk.speed;
        ctx.arc(flk.posX+=xMove, flk.posY+=yMove,flk.radius,0,Math.PI*2);
        if(flk.posX > windowWidth || flk.posY > windowHeight){
            flakesArray[index].posX = m.floor(m.random() * (windowWidth)-1/8*windowWidth);
            flakesArray[index].posY = 0;
        }
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    }
    requestAnimationFrame(animate);

}
requestAnimationFrame(animate);