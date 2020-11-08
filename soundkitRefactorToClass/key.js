export default class Key{
    constructor(keyPressed,soundId,recordStartTime){
        this.keyPressed = keyPressed;
        this.soundId = soundId;
        this.time = Date.now() - recordStartTime;
    }
    playSound(){
        const sound = document.querySelector('#'+this.soundId);
        sound.play();
    }

}
