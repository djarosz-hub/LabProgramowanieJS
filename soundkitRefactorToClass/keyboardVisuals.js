export default class KeyboardVisuals{
    constructor(){
    }
    static keyHighlight(keyCode){
        const keyPressed = document.getElementById(keyCode);
        keyPressed.classList.add('keyDown');
        setTimeout(() => {
            keyPressed.classList.remove('keyDown');
        }, 200);
    }
}