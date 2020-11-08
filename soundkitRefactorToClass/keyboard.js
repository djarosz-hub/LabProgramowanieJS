import Key from './key.js';
import KeyboardVisuals from './keyboardVisuals.js';
export default class Keyboard {
    constructor(){
        this.recordedSounds = [];
        this.recordStartTime = 0;
        this.recordingState = false;
    }
    tryToSaveSound(soundObj){
        console.log('test');
    }
    onKeyPress(ev){
        const keyPressed = ev.code;
        let soundId;
        switch(keyPressed){
        case 'Digit1':
            soundId = 'clap1';
            break;
        case 'Digit2':
            soundId = 'clap2';
            break;
        case 'Digit3':
            soundId = 'clap3';
            break;
        case 'Digit4':
            soundId = 'clap4';
            break;
        case 'Digit5':
            soundId = 'clap5';
            break;
        case 'KeyQ':
            soundId = 'hihat1';
            break;
        case 'KeyW':
            soundId = 'hihat2';
            break;
        case 'KeyE':
            soundId = 'hihat3';
            break;
        case 'KeyR':
            soundId = 'hihat4';
            break;
        case 'KeyT':
            soundId = 'hihat5';
            break;
        case 'KeyA':
            soundId = 'kick1';
            break;
        case 'KeyS':
            soundId = 'kick2';
            break;
        case 'KeyD':
            soundId = 'kick3';
            break;
        case 'KeyF':
            soundId = 'kick4';
            break;
        case 'KeyG':
            soundId = 'kick5';
            break;
        case 'KeyZ':
            soundId = 'perc1';
            break;
        case 'KeyX':
            soundId = 'perc2';
            break;
        case 'KeyC':
            soundId = 'perc3';
            break;
        case 'KeyV':
            soundId = 'perc4';
            break;
        case 'KeyB':
            soundId = 'perc5';
            break;
        }
        console.log(keyPressed);
        console.log(soundId);
        if(soundId){
            KeyboardVisuals.keyHighlight(keyPressed);
            const soundObj = new Key(keyPressed,soundId,this.recordStartTime);
            console.log(soundObj.time);
            soundObj.playSound();
            this.tryToSaveSound(soundObj);
            //this.onRecordPress();
            // if(this.recordingState === true)
            //     this.recordedSounds.push(soundObj);
        }
    }
    
    onRecordPress(){
    }
    onPlayPress(){ 
    }
}

