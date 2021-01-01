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
const textToDisplay = 'Merry Christmas';
const textToDisplayFontSize = 80;
function animate(){
    ctx.clearRect(0,0,windowWidth,windowHeight);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${textToDisplayFontSize}px Mountains of Christmas`;
    const textLengthInPx = ctx.measureText(textToDisplay).width;
    const gradient = ctx.createRadialGradient(
        windowWidth/2,
        windowHeight/2,
        100,
        windowWidth/2,
        windowHeight/2,
        300
    );
    gradient.addColorStop(0,'gold');
    gradient.addColorStop(1,'red');
    ctx.fillStyle = gradient;
    ctx.fillText(textToDisplay,windowWidth/2,windowHeight/2);
    const xPosOfTextStart = textLengthInPx/2;
    const yPosOfBurningLine = windowHeight/2 - textToDisplayFontSize/4;
    for(const [index,flk] of flakesArray.entries()){
        ctx.beginPath();
        let xMove = 1+flk.fallingRadius;
        let yMove = 1+flk.speed;
        if(flk.stuckOnElement === true){
            xMove = 0;
            yMove = 0;
        }
        ctx.arc(flk.posX+=xMove, flk.posY+=yMove,flk.radius,0,Math.PI*2);
        if(flk.IsFlakeOutOfWindow(flk.posX,flk.posY,windowWidth,windowHeight)){
            flakesArray[index].posX = m.floor(m.random() * (windowWidth)-1/8*windowWidth);
            flakesArray[index].posY = 0;
        }
        // console.log(yPosOfBurningLine);
        // console.log(xPosOfTextStart);
        // console.log(textLengthInPx);

        if(flk.posY > yPosOfBurningLine && 
            flk.posY < yPosOfBurningLine+textToDisplayFontSize &&
            flk.posX > xPosOfTextStart &&
            flk.posX < xPosOfTextStart+textLengthInPx)
        {
            flk.stuckOnElement = true;
        }
        // if(flk.stuckOnElement === true){
        //     ctx.fillStyle = '#ffff00';   
        // }
        // else
        ctx.fillStyle = '#ffffff';
        ctx.fill();

    }

    requestAnimationFrame(animate);

}
requestAnimationFrame(animate);