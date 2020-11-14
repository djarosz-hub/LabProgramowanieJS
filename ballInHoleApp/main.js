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
let holesArray = createHolesCoords();
function moveBall(){
    const verticalMove = calculateVerticalMove();
    const horizontalMove = calculateHorizontalMove();
    ball.x +=horizontalMove*ball.speedX;
    ball.y +=verticalMove*ball.speedY;
    // console.log(holesArray);
    //console.log('x',ball.x,'y', ball.y,'speedx',ball.speedX,'speedY',ball.speedY);
    ctx.clearRect(0,0,windowWidth,windowHeight);
    checkColission(holesArray);
    drawHoles(ctx,holesArray);
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,10,0,Math.PI*2);
    ctx.fillStyle = '#6DCF00';
    ctx.fill();
}
function calculateHorizontalMove(){
    const ballXMove = phonePosition.alpha/60;
    //console.log('horizontal move', ballXMove);
    return ballXMove;
}
function calculateVerticalMove(){
    const ballYMove = (phonePosition.beta-90)/60;
    //console.log('vertical move', ballYMove);
    return ballYMove;
}
function calculateBallSpeed(){
    const beta = phonePosition.beta;
    const alpha = phonePosition.alpha;
    ball.speedY = 1 + Math.abs((beta-90)/60);
    ball.speedX = 1 + Math.abs(alpha/60);
}
function createHolesCoords(){
    const arr = [];
    for(let i = 0; i < 10; i++){
        let x = Math.random()*windowWidth;
        let y = Math.random()*windowHeight;
        //console.log('ball x:', ball.x, 'ball y:', ball.y);
        if((Math.abs(x - ball.x)) < 50){
            if((Math.abs(y - ball.y) < 50))
                y += 70;   
            else
                x += 70;
        }
        const holeObj = {
            x:x,
            y:y,
            r:15,
        };
        arr.push(holeObj);
    }
    return arr;
}
function drawHoles(ctx,holesArray){
    for(const hole of holesArray){
        ctx.beginPath();
        ctx.arc(hole.x,hole.y,hole.r,0,Math.PI*2);
        ctx.fillStyle = 'black';
        ctx.fill();
    }
}
function checkColission(arr){
    for(const hole of arr){
        if(Math.abs(ball.x - hole.x) <= 25 && Math.abs(ball.y - hole.y) <= 25){
            const index = arr.indexOf(hole);
            console.log('collision with hole nr:', index);
            const newArr = holesArray.filter(i => i !== hole);
            //console.log(newArr);
            holesArray = newArr;
            // arr.splice(arr.indexOf(index),1);
            // console.log(arr.length);
        }
    }
}

moveBall(0,0);
window.addEventListener('deviceorientation', getPhonePosition);
function getPhonePosition(ev){
    //console.log(ev.alpha);
    //console.log(ev.beta);
    phonePosition.alpha = ev.alpha;
    phonePosition.beta = ev.beta;
    calculateBallSpeed();
    moveBall();
}
setInterval(() => {
    moveBall();
}, 1000/60);
