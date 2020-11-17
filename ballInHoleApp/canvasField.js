import Ball from './ball.js';
import PhonePosition from './phonePosition.js';

export default class CanvasField{
    constructor(){
        this.gameStartTime = Date.now();
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.holesArray = [];
        this.ball = new Ball(this.windowWidth,this.windowHeight);
        this.phonePosition = new PhonePosition();
    }
    initiate(){
        const htmlCanvas = document.getElementById('canvas');
        htmlCanvas.width = this.windowWidth;
        htmlCanvas.height = this.windowHeight;
        this.ctx = htmlCanvas.getContext('2d');
        this.getBestTimeFromLS();
        alert('Rotate Your device to collect red circles as fast as possible, falling into black hole ends game. Hold Your device in vertical portrait mode.\n'+ 'Best time: '+this.bestTimeFromLs + ' seconds.');
        this.createHolesAmount();
        this.createHolesCoords();
        this.start();
    }
    start(){
        this.interval = setInterval(() => {
            this.moveBall();
        }, 1000/60);
    }
    getBestTimeFromLS(){
        this.bestTimeFromLs = '';
        if(localStorage.getItem('gameBestTime')){
            this.bestTimeFromLs = localStorage.getItem('gameBestTime');
        }
        else
            this.bestTimeFromLs = '--:--';
    }
    createHolesAmount(){
        let holesPrompt = window.prompt('Type amount of holes in game', '10');
        this.holesAmount = !isNaN(holesPrompt) ? ++holesPrompt : 11; 
    }
    createHolesCoords(){
        for(let i = 0; i < this.holesAmount; i++){
            let x = Math.random()*this.windowWidth;
            let y = Math.random()*this.windowHeight;
            if((Math.abs(x - (this.windowWidth/2))) < 30){
                if((Math.abs(y - (this.windowHeight/2)) < 30))
                    y += 70;   
                else
                    x += 70;
            }
            if ( x <= 16 )
                x+=15;
            if( this.windowWidth - 16 < x)
                x-=15;
            if ( y <= 16 )
                y+= 15;
            if ( this.windowHeight - 16 < y)
                y-=15;
            const holeObj = {
                x:x,
                y:y,
                r:15,
            };
            this.holesArray.push(holeObj);
        }
    }
    drawHoles(ctx,holesArray){
        let indexer = 0;
        for(const hole of holesArray){
            ctx.beginPath();
            ctx.arc(hole.x,hole.y,hole.r,0,Math.PI*2);
            if(indexer == holesArray.length - 1)
                ctx.fillStyle = 'red';
            else
                ctx.fillStyle = 'black';
            ctx.fill();
            indexer++;
        }
    }
    getPhonePosition(ev){
        console.log('phonepos');
        console.log(ev);
        console.log('ball:', this.ball);
        console.log('ph:',this.phonePosition);
        if(!this.phonePosition.firstPositionTaken){
            this.phonePosition.initialAlpha = ev.alpha;
            this.phonePosition.initialBeta = ev.beta;
            this.phonePosition.firstPositionTaken = true;
        }
        else{
            this.phonePosition.alpha = ev.alpha;
            this.phonePosition.beta = ev.beta;
            this.calculateBallSpeed();
        }
    }
    calculateBallSpeed(){
        this.ball.speedX = 1 + Math.abs((this.phonePosition.beta - this.phonePosition.initialBeta)/30);
        this.ball.speedY = 1 + Math.abs((this.phonePosition.alpha - this.phonePosition.initialAlpha)/30);
    }
    calculateHorizontalMove(){
        const ballXMove = (this.phonePosition.alpha - this.phonePosition.initialAlpha)/30;
        return ballXMove;
    }
    calculateVerticalMove(){
        if(this.phonePosition.beta < -90)
            return 0;
        const ballYMove = (this.phonePosition.beta-this.phonePosition.initialBeta)/30;
        return ballYMove;
    }
    moveBall(){
        // console.log('rendering');
        const verticalMove = this.calculateVerticalMove();
        const horizontalMove = this.calculateHorizontalMove();
        this.ball.x +=horizontalMove*this.ball.speedX;
        this.ball.y +=verticalMove*this.ball.speedY;
        this.redrawCanvas();
        if(this.holesArray.length == 0)
            this.gameEnd(true);
    }
    redrawCanvas(){
        this.ctx.clearRect(0,0,this.windowWidth,this.windowHeight);
        this.checkColission(this.holesArray);
        this.drawHoles(this.ctx,this.holesArray);
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x,this.ball.y,this.ball.r,0,Math.PI*2);
        this.ctx.fillStyle = '#6DCF00';
        this.ctx.fill();
    }
    checkColission(holesArr){
        let indexer = 0;
        for(const hole of holesArr){
            if(Math.abs(this.ball.x - hole.x) < this.ball.r+hole.r && Math.abs(this.ball.y - hole.y) < this.ball.r+hole.r){
                if(indexer == holesArr.length - 1){
                    const index = holesArr.indexOf(hole);
                    console.log('collision with hole nr:', index);
                    const newArr = this.holesArray.filter(i => i !== hole);
                    this.holesArray = newArr;
                }
                else{
                    if(Math.abs(this.ball.x - hole.x) <= hole.r && Math.abs(this.ball.y - hole.y) <= hole.r){
                        // console.log(ball.x - hole.x);
                        this.gameEnd(false);
                    }
                }
            }
            indexer++;
        }
    }
    gameEnd(matchWon){
        clearInterval(this.interval);
        window.removeEventListener('deviceorientation',this.getPhonePosition);
        if(matchWon){
            const gameStopTime = Date.now();
            const gamePlayTime = (gameStopTime-this.gameStartTime)/1000;
            let output = `${Math.floor(gamePlayTime/60)}:${(gamePlayTime%60).toFixed(1)}`;
            if(gamePlayTime < this.bestTimeFromLs || this.bestTimeFromLs == '--:--'){
                localStorage.setItem('gameBestTime', gamePlayTime);
                output += '. You broke the record!';
            }
            alert('You won! Play time: ' + output);
        }
        else{
            alert('You fell in wrong hole! Game over.');
        }
    }

}