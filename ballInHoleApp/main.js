const htmlCanvas = document.getElementById('canvas');
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
function resizeCanvas(){
    htmlCanvas.width = windowWidth;
    htmlCanvas.height = windowHeight;
}
resizeCanvas();
let bestTimeFromLs;
if(localStorage.getItem('gameBestTime')){
    bestTimeFromLs = localStorage.getItem('gameBestTime');
}
else
    bestTimeFromLs = ' --:--';
alert('Rotate Your device to collect red circles as fast as possible, falling into black hole ends game. Hold Your device in vertical portrait mode.\n'+ 'Best time: '+bestTimeFromLs + ' seconds.');
console.log(bestTimeFromLs);
let promptAmount = window.prompt('Type amount of holes in game', '10');
const howManyHolesInGame = !isNaN(promptAmount) ? ++promptAmount : 11;
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
    initialAlpha: 0,
    initialBeta: 0,
    alpha: 0,
    beta: 0,
};

let holesArray = createHolesCoords();
function moveBall(){
    if(holesArray.length == 0)
        gameEnd(true);
    const verticalMove = calculateVerticalMove();
    const horizontalMove = calculateHorizontalMove();
    ball.x +=horizontalMove*ball.speedX;
    ball.y +=verticalMove*ball.speedY;
    ctx.clearRect(0,0,windowWidth,windowHeight);
    checkColission(holesArray);
    drawHoles(ctx,holesArray);
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2);
    ctx.fillStyle = '#6DCF00';
    ctx.fill();
}
function calculateHorizontalMove(){
    const ballXMove = (phonePosition.alpha - phonePosition.initialAlpha)/60;
    return ballXMove;
}
function calculateVerticalMove(){
    if(phonePosition.beta < -90)
        return 0;
    const ballYMove = (phonePosition.beta-phonePosition.initialBeta)/60;
    return ballYMove;
}
function calculateBallSpeed(){
    ball.speedY = 1 + Math.abs((phonePosition.beta - phonePosition.initialBeta)/60);
    ball.speedX = 1 + Math.abs((phonePosition.alpha - phonePosition.initialAlpha)/60);
}
function createHolesCoords(){
    const arr = [];
    for(let i = 0; i < howManyHolesInGame; i++){
        let x = Math.random()*windowWidth;
        let y = Math.random()*windowHeight;
        if((Math.abs(x - ball.x)) < 30){
            if((Math.abs(y - ball.y) < 30))
                y += 70;   
            else
                x += 70;
        }
        if ( x <= 16 )
            x+=15;
        if( windowWidth - 16 < x)
            x-=15;
        if ( y <= 16 )
            y+= 15;
        if ( windowHeight - 16 < y)
            y-=15;
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
                if(Math.abs(ball.x - hole.x) <= hole.r && Math.abs(ball.y - hole.y) <= hole.r){
                    console.log(ball.x - hole.x);
                    gameEnd(false);
                }
            }
        }
        indexer++;
    }
}

moveBall(0,0);
let firstPhonePosition = 1;
window.addEventListener('deviceorientation', getPhonePosition);
function getPhonePosition(ev){
    if(firstPhonePosition === 1){
        phonePosition.initialAlpha = ev.alpha;
        phonePosition.initialBeta = ev.beta;
        firstPhonePosition = 0;
    }
    else{
        phonePosition.alpha = ev.alpha;
        phonePosition.beta = ev.beta;
        calculateBallSpeed();
        moveBall();
    }
}
let interval = setInterval(() => {
    moveBall();
}, 1000/60);

function gameEnd(matchWon){
    clearInterval(interval);
    window.removeEventListener('deviceorientation',getPhonePosition);
    if(matchWon){
        const gameStopTime = Date.now();
        const gamePlayTime = (gameStopTime-gameStartTime)/1000;
        let output = `${Math.floor(gamePlayTime/60)}:${(gamePlayTime%60).toFixed(1)}`;
        if(gamePlayTime < bestTimeFromLs || bestTimeFromLs == ' --:--'){
            localStorage.setItem('gameBestTime', gamePlayTime);
            output += '. You broke the record!';
        }
        alert('You won! Play time: ' + output);
    }
    else{
        alert('You fell in wrong hole! Game over.');
    }
}