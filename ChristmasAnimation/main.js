// import FlakesOrganizer from './flakesOrganizer.js';
import SnowFlake from './snowFlake.js';
const htmlCanvas = document.getElementById('canvas');
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
htmlCanvas.width = windowWidth;
htmlCanvas.height = windowHeight;
const ctx = htmlCanvas.getContext('2d');
const flakesArray =[];
const flakesNumber = 1;
for(let i = 0; i< flakesNumber; i++){
    const rndXPos = Math.random() * window.innerWidth;
    const rndYPos = Math.random() * window.innerHeight;
    const rndRadius = Math.floor(Math.random() * (5 - 1)) + 1;
    const rndFallingRadius = Math.floor(Math.random() * (80 - 10)) + 10;
    const rndSpeed = Math.floor(Math.random() * (10-1))+10;
    const flake = new SnowFlake(rndXPos,rndYPos,rndRadius,rndFallingRadius,rndSpeed);
    flakesArray.push(flake);
}
let counter = 0;
function animate(){
    ctx.clearRect(0,0,windowWidth,windowHeight);
    for(let i = 0; i< flakesNumber; i++){
        const flk = flakesArray[i];
        ctx.beginPath();
        ctx.arc(flk.posX+counter,flk.posY+counter,flk.radius,0,Math.PI*2);
        if(flk.posX+counter > windowWidth || flk.posY+counter > windowHeight){
            flakesArray[i].posX = 0;
            flakesArray[i].posY = 0;
            console.log('out');
        }
        // console.log(flakesArray);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    }
    counter++;
    requestAnimationFrame(animate);

}
requestAnimationFrame(animate);
