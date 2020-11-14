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
    speed:1
};
function moveBall(horizontalMove, verticalMove){
    // ball.speed += 0.1;
    ball.x +=horizontalMove*ball.speed;
    ball.y +=verticalMove*ball.speed;
    ctx.clearRect(0,0,windowWidth,windowHeight);
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,15,0,Math.PI*2);
    ctx.fillStyle = '#6DCF00';
    ctx.fill();
}
moveBall(0,0);
document.onkeydown = checkKey;

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
// setInterval(() => {
//     moveBall();
// }, 1000/60);

// ctx.beginPath();
// ctx.arc(windowWidth/2,windowHeight/2,15,0,Math.PI*2);
// ctx.fillStyle = '#6DCF00';
// ctx.fill();
