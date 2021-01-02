import FlakesCreator from './flakesCreator.js';
import SnowFlake from './snowFlake.js';

const htmlCanvas = document.getElementById('canvas');

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
htmlCanvas.width = windowWidth;
htmlCanvas.height = windowHeight;
const ctx = htmlCanvas.getContext('2d');

const flakesNumber = 800;
const flakesSpeed = 5;
const flakesFallingRadius = 3;
const cloudsCount = 100;
const m = Math;
const flakesCreator = new FlakesCreator(flakesNumber,flakesSpeed, flakesFallingRadius, windowWidth,windowHeight);
flakesCreator.CreateFlakes();
const flakesArray = flakesCreator.GetFlakes();
const dropsArray = [];
const steamCloudsArray = [];
for(let i = 0; i < cloudsCount; i++){
    const steamCloudObj = {
        radius: m.random()*5 + 1,
        growRate:1
    };
    steamCloudsArray.push(steamCloudObj);
}
const textToDisplay = 'Merry Christmas';
const textToDisplayFontSize = 80;
let waterLevel = 0;
const maxWaterLevel = windowHeight/2 - textToDisplayFontSize/4;

function animate(){
    ctx.clearRect(0,0,windowWidth,windowHeight);
    ctx.save();

    ctx.beginPath();
    ctx.moveTo(0,windowHeight);
    ctx.lineTo(windowWidth,windowHeight);
    ctx.lineTo(windowWidth,windowHeight-waterLevel);
    ctx.lineTo(0,windowHeight-waterLevel);
    ctx.closePath();
    const waterGradient = ctx.createLinearGradient(0,windowHeight,0,windowHeight-waterLevel);

    waterGradient.addColorStop(0,'#013448');
    waterGradient.addColorStop(1,'#235669');

    ctx.fillStyle = waterGradient;
    ctx.shadowColor = '#235669';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = -5;
    ctx.shadowBlur = 10;
    ctx.fill();

    ctx.restore();
    ctx.save();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${textToDisplayFontSize}px Mountains of Christmas`;
    const textLengthInPx = ctx.measureText(textToDisplay).width;
    const textGradient = ctx.createRadialGradient(
        windowWidth/2,
        windowHeight/2,
        100,
        windowWidth/2,
        windowHeight/2,
        300
    );
    textGradient.addColorStop(0,'gold');
    textGradient.addColorStop(1,'red');
    ctx.fillStyle = textGradient;
    ctx.shadowColor = 'red';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur =10;
    ctx.fillText(textToDisplay,windowWidth/2,windowHeight/2);
    const xPosOfTextStart = textLengthInPx/2;
    const yPosOfBurningLine = windowHeight/2 - textToDisplayFontSize/4;
    ctx.restore();

    for(const [index,flk] of flakesArray.entries()){
        ctx.beginPath();
        const xMove = 1+flk.fallingRadius;
        const yMove = 1+flk.speed;
        if(flk.stuckOnElement === true){
            const dropObj = {
                posX:flk.posX,
                posY:flk.posY,
                r:flk.radius,
                speed:m.random()+1
            };
            dropsArray.push(dropObj);
            flk.ReturnToTop(index,flakesArray,windowWidth);
            flk.stuckOnElement = false;
        }
        ctx.arc(flk.posX+=xMove, flk.posY+=yMove,flk.radius,0,m.PI*2);
        if(SnowFlake.IsOutOfWindow(flk.posX,flk.posY,windowWidth,windowHeight-waterLevel)){
            flk.ReturnToTop(index,flakesArray,windowWidth);
        }
        if(flk.IsFlakeOnTextArea(flk.posX,flk.posY,yPosOfBurningLine,textToDisplayFontSize,windowWidth,textLengthInPx,xPosOfTextStart))
        {
            flk.stuckOnElement = true;
        }
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    }

    for(const [index,drop] of dropsArray.entries()){
        ctx.beginPath();
        ctx.arc(drop.posX, drop.posY, drop.r, 0, m.PI*2);
        ctx.fillStyle = '#346779';
        ctx.fill();
        drop.posY += drop.speed * 5;
        if(SnowFlake.IsOutOfWindow(drop.posX,drop.posY,windowWidth,windowHeight-waterLevel)){
            dropsArray.splice(index,1);
            if(waterLevel < maxWaterLevel)
                waterLevel += 1;
        }
    }
    ctx.save();
    if(waterLevel > maxWaterLevel - textToDisplayFontSize/3)
    {
        for(const cloud of steamCloudsArray){
            ctx.beginPath();
            cloud.growRate += m.random();
            ctx.arc((windowWidth/2-textLengthInPx/2)+m.random()*textLengthInPx,
                windowHeight-waterLevel,
                cloud.radius+cloud.growRate,
                0,
                m.PI*2);
            ctx.globalAlpha = 1 - (0.1 * cloud.growRate);
            ctx.fillStyle = 'white';
            ctx.fill();
        }
    }
    ctx.restore();
    requestAnimationFrame(animate);

}
requestAnimationFrame(animate);