export default class Key{
    constructor(keyPressed,soundId, soundGroup, recordStartTime){
        this.keyPressed = keyPressed;
        this.soundId = soundId;
        this.group = soundGroup;
        this.time = Date.now() - recordStartTime;
    }
    playSound(){
        const sound = document.querySelector('#'+this.soundId);
        sound.play();
    }

}
