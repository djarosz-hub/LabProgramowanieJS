export default class SnowFlake{
    constructor(startPosX, startPosY, flakeRadius, fallingRadius, speed, stuck){
        this.posX = startPosX;
        this.posY = startPosY;
        this.radius = flakeRadius;
        this.fallingRadius = fallingRadius;
        this.speed = speed;
        this.stuckOnElement = stuck;
    }
    IsFlakeOutOfWindow(posX, posY,windowWidth,windowHeight){
        if(posX > windowWidth || posY > windowHeight)
            return true;
        return false;
    }
    
}