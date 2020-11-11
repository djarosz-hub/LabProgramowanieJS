import Key from './key.js';
import KeyboardVisuals from './keyboardVisuals.js';
import RecordAndPlay from './record.js';

export default class Keyboard {
    constructor(){
    }
    
    onKeyPress(ev){
        const keyPressed = ev.code;
        let soundId = this.getSoundId(keyPressed);
        console.log(keyPressed);
        console.log(soundId);
        //console.log(soundGroup);
        if(soundId){
            const soundGroup = this.getSoundGroup(soundId);
            KeyboardVisuals.keyHighlight(keyPressed);
            let soundObj;
            if(this.record && this.record.recordingState){
                console.log('recording sound');
                soundObj = new Key(keyPressed,soundId,soundGroup, this.record.recordStartTime);
                this.record.tryToSaveSound(soundObj);
                console.log(this.record.recordedSounds);
            }
            else{
                soundObj = new Key(keyPressed,soundId, soundGroup, undefined);
            }    
            soundObj.playSound();
        }
    }
    getSoundId(eventCode){
        switch(eventCode){
        case 'Digit1':
            return 'clap1';
        case 'Digit2':
            return 'clap2';
        case 'Digit3':
            return 'clap3';
        case 'Digit4':
            return 'clap4';
        case 'Digit5':
            return 'clap5';
        case 'KeyQ':
            return 'hihat1';
        case 'KeyW':
            return 'hihat2';
        case 'KeyE':
            return 'hihat3';
        case 'KeyR':
            return 'hihat4';
        case 'KeyT':
            return 'hihat5';
        case 'KeyA':
            return 'kick1';
        case 'KeyS':
            return 'kick2';
        case 'KeyD':
            return 'kick3';
        case 'KeyF':
            return 'kick4';
        case 'KeyG':
            return 'kick5';
        case 'KeyZ':
            return 'perc1';
        case 'KeyX':
            return 'perc2';
        case 'KeyC':
            return 'perc3';
        case 'KeyV':
            return 'perc4';
        case 'KeyB':
            return 'perc5';
        default:
            return undefined;
        }

    }
    getSoundGroup(sound){
        const group = sound.substring(0,sound.length-1) + 's';
        return group;        
    }
    onRecordPress(){
        let condition = document.getElementById('recordBtn').innerHTML;
        if(condition === 'Record'){
            this.record = new RecordAndPlay();
            console.log('new record obj');
            const btn = document.getElementById('recordBtn');
            btn.innerHTML = 'Recording';
            btn.classList.add('recording');
            console.log(this.record);
        }
        else{
            const btn = document.getElementById('recordBtn');
            btn.innerHTML = 'Record';
            btn.classList.remove('recording');
            this.record.recordingState = false;
        }
    }
    onPlayPress(){
        if(this.record){ 
            if(this.record.recordedSounds.length == 0){
                alert('No sounds recorded yet');
                this.onRecordPress();
            }
            else{
                const btn = document.getElementById('recordBtn');
                if(btn.innerHTML === 'Recording')
                    this.onRecordPress();
                this.record.playRecordedSounds();
            }
        }
        else
            alert('No sounds recorded yet');
    }
}

