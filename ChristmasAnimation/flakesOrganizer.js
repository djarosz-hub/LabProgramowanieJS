import SnowFlake from './snowFlake.js';
export default class FlakesOrganizer{
    constructor(){
        this.flakesArray = [];
    }
    CreateFlakes(){
        const flakesNumber = 10;
        for(let i = 0; i< flakesNumber; i++){
            const rndXPos = Math.random() * window.innerWidth;
            const rndYPos = Math.random() * window.innerHeight;
            const rndRadius = Math.floor(Math.random() * (10 - 1)) + 1;
            const rndFallingRadius = Math.floor(Math.random() * (80 - 10)) + 10;
            const rndSpeed = Math.floor(Math.random() * (10-1))+10;
            const flake = new SnowFlake(rndXPos,rndYPos,rndRadius,rndFallingRadius,rndSpeed);
            this.flakesArray.push(flake);
        }
    }
}