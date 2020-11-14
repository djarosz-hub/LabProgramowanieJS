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
    x:0,
    y:0,
    speed:1
};
function moveBall(){
    ball.speed += 0.1;
    ball.x +=1*ball.speed;
    ball.y +=1*ball.speed;
    ctx.clearRect(0,0,windowWidth,windowHeight);
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,15,0,Math.PI*2);
    ctx.fillStyle = '#6DCF00';
    ctx.fill();
}
// moveBall();
setInterval(() => {
    moveBall();
}, 1000/60);
// ctx.beginPath();
// ctx.arc(windowWidth/2,windowHeight/2,15,0,Math.PI*2);
// ctx.fillStyle = '#6DCF00';
// ctx.fill();
