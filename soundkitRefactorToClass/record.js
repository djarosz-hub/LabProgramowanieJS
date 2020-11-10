import KeyboardVisuals from './keyboardVisuals.js';

export default class RecordAndPlay{
    constructor(){
        this.recordedSounds = [];
        this.recordStartTime = Date.now().toString();
        this.recordingState = true;
    }
    tryToSaveSound(soundObj){
        if(this.appropriateGroupChecked(soundObj.group))
            this.recordedSounds.push(soundObj);
    }
    playRecordedSounds(){
        for(const s of this.recordedSounds){
            if(this.appropriateGroupChecked(s.group))
                setTimeout(() => {
                    s.playSound();
                    KeyboardVisuals.keyHighlight(s.keyPressed);
                }, s.time);
        }
    }

    appropriateGroupChecked(soundGroup){
        let flag = false;
        switch(soundGroup){
        case 'claps':
            if(document.getElementById('clapCheck').checked)
                flag = true;
            break;
        case 'hihats':
            if(document.getElementById('hihatCheck').checked)
                flag = true;
            break;
        case 'kicks':
            if(document.getElementById('kickCheck').checked)
                flag = true;
            break;
        case 'percs':
            if(document.getElementById('percCheck').checked)
                flag = true;
            break;
        }
        return flag;
    }
}