const htmlCanvas = document.getElementById('canvas');
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
function resizeCanvas(){
    htmlCanvas.width = windowWidth;
    htmlCanvas.height = windowHeight;
}
resizeCanvas();
const ctx = htmlCanvas.getContext('2d');

const ball = {
    x:windowWidth/2,
    y:windowHeight/2,
    speedX:1,
    speedY:1,
};
const phonePosition = {
    alpha: 0,
    beta: 90,
};
function moveBall(){
    // ball.speed += 0.1;
    const verticalMove = calculateVerticalMove();
    const horizontalMove = calculateHorizontalMove();
    ball.x +=horizontalMove*ball.speedX;
    ball.y +=verticalMove*ball.speedY;
    console.log('x',ball.x,'y', ball.y,'speedx',ball.speedX,'speedY',ball.speedY);
    ctx.clearRect(0,0,windowWidth,windowHeight);
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,2,0,Math.PI*2);
    ctx.fillStyle = '#6DCF00';
    ctx.fill();
}
function calculateHorizontalMove(){
    const ballXMove = phonePosition.alpha/60;
    console.log('horizontal move', ballXMove);
    return ballXMove;
}
function calculateVerticalMove(){
    const ballYMove = (phonePosition.beta-90)/60;
    console.log('vertical move', ballYMove);
    return ballYMove;
}

moveBall(0,0);
document.onkeydown = checkKey;
window.addEventListener('deviceorientation', getPhonePosition);
function getPhonePosition(ev){
    console.log(ev.alpha);
    console.log(ev.beta);
    phonePosition.alpha = ev.alpha;
    phonePosition.beta = ev.beta;
    calculateBallSpeed();
    moveBall();
}
function calculateBallSpeed(){
    const beta = phonePosition.beta;
    const alpha = phonePosition.alpha;
    ball.speedY = 1 + Math.abs((beta-90)/60);
    ball.speedX = 1 + Math.abs(alpha/60);
}
function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        console.log('arrow up');
        moveBall(0,-2);
    }
    else if (e.keyCode == '40') {
        console.log('arrow down');
        moveBall(0,2);
    }
    else if (e.keyCode == '37') {
        console.log('arrow left');
        moveBall(-2,0);
    }
    else if (e.keyCode == '39') {
        console.log('arrow right');
        moveBall(2,0);
    }

}
// moveBall();

setInterval(() => {
    moveBall();
}, 1000/60);

// ctx.beginPath();
// ctx.arc(windowWidth/2,windowHeight/2,15,0,Math.PI*2);
// ctx.fillStyle = '#6DCF00';
// ctx.fill();