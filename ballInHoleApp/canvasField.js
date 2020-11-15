import Ball from './ball.js';
export default class CanvasField{
    constructor(canvasCtx, windowWidth, windowHeight){
        this.ball = new Ball(windowWidth,windowHeight);
        this.ctx = canvasCtx;
    }
    moveBall(horizontalMove,verticalMove){
        console.log('moveball response');
        this.ctx.clearRect(0,0,this.windowWidth,this.windowHeight);
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x+horizontalMove, this.ball.y+verticalMove, 15,0,Math.PI*2);
        this.ctx.fillStyle = '#6DCF00';
        this.ctx.fill();
    }
    checkKey(ev){
        console.log('checkkey');
        if (ev.keyCode == '38') {
            console.log('arrow up');
            this.moveBall(0,-2);
        }
        else if (ev.keyCode == '40') {
            console.log('arrow down');
            this.moveBall(0,2);
        }
        else if (ev.keyCode == '37') {
            console.log('arrow left');
            this.moveBall(-2,0);
        }
        else if (ev.keyCode == '39') {
            console.log('arrow right');
            this.moveBall(2,0);
        }
    }
}