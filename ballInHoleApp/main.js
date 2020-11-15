const htmlCanvas = document.getElementById('canvas');
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
function resizeCanvas(){
    htmlCanvas.width = windowWidth;
    htmlCanvas.height = windowHeight;
}
resizeCanvas();
const ctx = htmlCanvas.getContext('2d');
const gameStartTime = Date.now();
const ball = {
    x:windowWidth/2,
    y:windowHeight/2,
    r:10,
    speedX:1,
    speedY:1,
};
const phonePosition = {
    alpha: 0,
    beta: 90,
};
let bestTimeFromLs;
if(localStorage.getItem('gameBestTime'))
    bestTimeFromLs = localStorage.getItem('gameBestTime');

let holesArray = createHolesCoords();
function moveBall(){
    const verticalMove = calculateVerticalMove();
    const horizontalMove = calculateHorizontalMove();
    ball.x +=horizontalMove*ball.speedX;
    ball.y +=verticalMove*ball.speedY;
    // console.log(holesArray);
    //console.log('x',ball.x,'y', ball.y,'speedx',ball.speedX,'speedY',ball.speedY);
    if(holesArray.length == 0)
        gameEnd(true);
    ctx.clearRect(0,0,windowWidth,windowHeight);
    checkColission(holesArray);
    drawHoles(ctx,holesArray);
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2);
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
function checkColission(arr){
    let indexer = 0;
    for(const hole of arr){
        if(Math.abs(ball.x - hole.x) <= ball.r+hole.r && Math.abs(ball.y - hole.y) <= ball.r+hole.r){
            if(indexer == arr.length - 1){
                const index = arr.indexOf(hole);
                console.log('collision with hole nr:', index);
                const newArr = holesArray.filter(i => i !== hole);
                holesArray = newArr;
            }
            else{
                // console.log('colision with wrong hole');
                if(Math.abs(ball.x - hole.x) <= hole.r && Math.abs(ball.y - hole.y) <= hole.r){
                    console.log(ball.x - hole.x);
                    console.log('you felt in wrong hole');
                    clearInterval(interval);
                    gameEnd(false);
                }
            }
        }
        indexer++;
    }
}

moveBall(0,0);
window.addEventListener('deviceorientation', getPhonePosition);
function getPhonePosition(ev){
    // console.log(ev.alpha);
    // console.log(ev.beta);
    phonePosition.alpha = ev.alpha;
    phonePosition.beta = ev.beta;
    calculateBallSpeed();
    moveBall();
}
//const are not hoisted
let interval = setInterval(() => {
    moveBall();
}, 1000/60);
function gameEnd(matchWon){
    window.removeEventListener('deviceorientation',getPhonePosition);
    const gameStopTime = Date.now();
    const gamePlayTime = (gameStopTime-gameStartTime)/1000;
    const output = `${Math.floor(gamePlayTime/60)}:${(gamePlayTime%60).toFixed(1)}`;
    if(matchWon){
        console.log('best time:', bestTimeFromLs);
        alert(output);
    }
    else{
        alert('You fell in wrong hole! Game over.');
    }
}