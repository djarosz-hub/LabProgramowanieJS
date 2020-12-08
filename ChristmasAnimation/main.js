import FlakesCreator from './flakesCreator.js';
import SnowFlake from './snowFlake.js';

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
// console.log(flakesArray);
function animate(){
    ctx.clearRect(0,0,windowWidth,windowHeight);
    for(let i = 0; i< flakesNumber; i++){
        const flk = flakesArray[i];
        ctx.beginPath();
        const xMove = 1+flk.fallingRadius;
        const yMove = 1+flk.speed;
        // console.log(xMove);
        // console.log(yMove);
        ctx.arc(flk.posX+=xMove, flk.posY+=yMove,flk.radius,0,Math.PI*2);
        if(flk.posX > windowWidth || flk.posY > windowHeight){
            flakesArray[i].posX = Math.floor(Math.random() * (windowWidth)-1/8*windowWidth);
            // flakesArray[i].posX = 0;
            flakesArray[i].posY = 0;
        }
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    }
    requestAnimationFrame(animate);

}
requestAnimationFrame(animate);
