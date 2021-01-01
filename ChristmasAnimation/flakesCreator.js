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
        const m = Math;
        for(let i = 0; i< this.flakesNumber; i++){
            const rndXPos = m.random() * this.windowWidth;
            const rndYPos = m.random() * this.windowHeight;
            const rndRadius = m.floor(m.random() * (4 - 1)) + 1;
            const rndFallingRadius = m.random() * this.flakesFallingRadius;
            const rndSpeed = m.random() * this.flakesSpeed;
            const stuckOnElemenet = false;
            const flake = new SnowFlake(rndXPos,rndYPos,rndRadius,rndFallingRadius,rndSpeed,stuckOnElemenet);
            this.flakesArray.push(flake);
        }
    }
    GetFlakes(){
        return this.flakesArray;
    }
}