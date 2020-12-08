export default class SnowFlake{
    constructor(startPosX, startPosY, flakeRadius, fallingRadius, speed){
        this.posX = startPosX;
        this.posY = startPosY;
        this.radius = flakeRadius;
        this.fallingRadius = fallingRadius;
        this.speed = speed;
    }
}