import FlakesCreator from './flakesCreator.js';
// import SnowFlake from './snowFlake.js';

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

const m = Math;
function animate(){
    ctx.clearRect(0,0,windowWidth,windowHeight);
    for(const [index,flk] of flakesArray.entries()){
        //this loop = 16.7ms/60fps 
        //1000ms - 302 scripting 5rendering 8painting 493system 192idle
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
// function animate(){
//     ctx.clearRect(0,0,windowWidth,windowHeight);
//     for(let i = 0; i< flakesNumber; i++){
//         //1000ms - 321 scripting 5rendering 8painting 524 system 143idle
//         const flk = flakesArray[i];
//         ctx.beginPath();
//         const xMove = 1+flk.fallingRadius;
//         const yMove = 1+flk.speed;
//         ctx.arc(flk.posX+=xMove, flk.posY+=yMove,flk.radius,0,Math.PI*2);
//         if(flk.posX > windowWidth || flk.posY > windowHeight){
//             flakesArray[i].posX = Math.floor(Math.random() * (windowWidth)-1/8*windowWidth);
//             flakesArray[i].posY = 0;
//         }
//         ctx.fillStyle = '#ffffff';
//         ctx.fill();
//     }
//     requestAnimationFrame(animate);

// }

// function animate(){
//     ctx.clearRect(0,0,windowWidth,windowHeight);
//     flakesArray.forEach((flk,index) =>{
//         //1000ms - 332 scripting 5rendering 8painting 510 system 140idle

//         ctx.beginPath();
//         const xMove = 1+flk.fallingRadius;
//         const yMove = 1+flk.speed;
//         ctx.arc(flk.posX+=xMove, flk.posY+=yMove,flk.radius,0,Math.PI*2);
//         if(flk.posX > windowWidth || flk.posY > windowHeight){
//             flakesArray[index].posX = Math.floor(Math.random() * (windowWidth)-1/8*windowWidth);
//             flakesArray[index].posY = 0;
//         }
//         ctx.fillStyle = '#ffffff';
//         ctx.fill();
//     });
//     requestAnimationFrame(animate);
// }


