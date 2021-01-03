export default class SteamCloud{
    constructor(windowWidth, math, textLength){
        this.xPos = (windowWidth/2 - textLength/2)+ math.random()*textLength;
        this.yPos = 0;
        this.radius = 5;
        this.growRate = math.random() + 1;
        this.disappearingRate = 0.015;
    }
}