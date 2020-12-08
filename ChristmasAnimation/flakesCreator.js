import SnowFlake from './snowFlake.js';
export default class FlakesCreator{
    constructor(flakesNumber,flakesSpeed, flakesFallingRadius, windowWidth,windowHeight){
        this.flakesArray = [];
        this.flakesNumber = flakesNumber;
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        this.flakesFallingRadius = flakesFallingRadius;
        this.flakesSpeed = flakesSpeed;
    }
    CreateFlakes(){
        for(let i = 0; i< this.flakesNumber; i++){
            const rndXPos = Math.random() * this.windowWidth;
            const rndYPos = Math.random() * this.windowHeight;
            const rndRadius = Math.floor(Math.random() * (4 - 1)) + 1;
            const rndFallingRadius = Math.random() * this.flakesFallingRadius;
            const rndSpeed = Math.random() * this.flakesSpeed;
            const flake = new SnowFlake(rndXPos,rndYPos,rndRadius,rndFallingRadius,rndSpeed);
            this.flakesArray.push(flake);
        }
    }
    GetFlakes(){
        return this.flakesArray;
    }
}