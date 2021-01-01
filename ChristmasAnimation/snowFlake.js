export default class SnowFlake{
    constructor(startPosX, startPosY, flakeRadius, fallingRadius, speed, stuck){
        this.posX = startPosX;
        this.posY = startPosY;
        this.radius = flakeRadius;
        this.fallingRadius = fallingRadius;
        this.speed = speed;
        this.stuckOnElement = stuck;
    }
    static IsOutOfWindow(posX, posY,windowWidth,windowHeight){
        if(posX > windowWidth || posY > windowHeight)
            return true;
        return false;
    }
    IsFlakeOnTextArea(posX,posY, yPosOfBurningLine, textToDisplayFontSize,windowWidth,textLengthInPx, xPosOfTextStart){
        return posY > yPosOfBurningLine && 
        posY < yPosOfBurningLine + textToDisplayFontSize/2 &&
        posX > windowWidth/2 - xPosOfTextStart + 10 &&
        posX < windowWidth/2 + textLengthInPx/2 - 10;
    }
    ReturnToTop(index,flakesArray,windowWidth){
        flakesArray[index].posX = Math.floor(Math.random() * (windowWidth)-1/8*windowWidth);
        flakesArray[index].posY = 0;
    }
    
}