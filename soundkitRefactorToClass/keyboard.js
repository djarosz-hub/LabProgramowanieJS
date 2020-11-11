import Key from './key.js';
import KeyboardVisuals from './keyboardVisuals.js';
import RecordAndPlay from './record.js';

export default class Keyboard {
    constructor(){
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
        const soundGroup = this.getSoundGroup(soundId);
        //console.log(soundGroup);
        if(soundId){
            KeyboardVisuals.keyHighlight(keyPressed);
            let soundObj;
            if(this.record && this.record.recordingState){
                console.log('jest rekord');
                soundObj = new Key(keyPressed,soundId,soundGroup, this.record.recordStartTime);
                this.record.tryToSaveSound(soundObj);
                console.log(this.record.recordedSounds);
            }
            else{
                console.log('nie ma rekorda');
                soundObj = new Key(keyPressed,soundId, soundGroup, undefined);
            }    
            soundObj.playSound();
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

