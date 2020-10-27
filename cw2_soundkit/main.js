document.body.addEventListener('keypress', onKeyPress);
document.querySelector('#recordBtn').addEventListener('click',onRecordBtn);
document.querySelector('#playBtn').addEventListener('click',onPlayBtn);
let recordedSounds = [];
let recordStartTime;
let isAbleToPlay = true;
let claps;
let hihats;
let kicks;
let percs;

function onKeyPress(ev){
    let soundId;
    switch(ev.code){
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
    if(soundId){
        let keyHighlight = ev.code;
        let keyPressed = document.getElementById(keyHighlight);
        keyPressed.classList.add('keyDown');
        console.log(keyHighlight);
        let soundClass = soundId.substr(0,soundId.length-1);  
        console.log(soundClass);
        const soundTime = Date.now() - recordStartTime;
        const soundObj = {soundId: soundId,
            time: soundTime,
            soundClass: soundClass,
            soundCode: ev.code};
        playSound(soundId);
        if(soundTime === soundTime) {
        //checking if value is NaN (NaN is never equal to NaN)
            let flag = checkingForClass(soundObj);
            console.log(flag, 'checking for class');
            if(flag)
                recordedSounds.push(soundObj);
            console.log(recordedSounds);
        }
        highlightDuration(keyPressed);
    }
}
function highlightDuration(el){
    setTimeout(()=>{
        el.classList.remove('keyDown');
    },
    200);
}
function checkingForClass(obj){
    let classCheck = false;
    switch(obj.soundClass){
    case 'clap':
        if(claps){
            classCheck = true;
            console.log('class clap checked');
        }
        break;
    case 'hihat':
        if(hihats){
            classCheck = true;
            console.log('class hihat checked');
        }
        break;
    case 'kick':
        if(kicks){
            classCheck = true;
            console.log('class kick checked');
        }
        break;
    case 'perc':
        if(percs){
            classCheck = true;
            console.log('class perc checked');
        }
        break;    
    }
    return classCheck;
}
function checkedChannels(){
    claps = document.getElementById('clapCheck').checked;
    hihats = document.getElementById('hihatCheck').checked;
    kicks = document.getElementById('kickCheck').checked;
    percs = document.getElementById('percCheck').checked;
    console.log(claps);
    console.log(hihats);
    console.log(kicks);
    console.log(percs);
}
function onRecordBtn(){
    let condition = document.getElementById('recordBtn').innerHTML; 
    if(condition === 'Record'){
        recordedSounds = [];
        document.getElementById('recordBtn').innerHTML = 'Recording';
        recording(1);
        recordStartTime = Date.now();
        checkedChannels();
    }
    else{
        document.getElementById('recordBtn').innerHTML = 'Record';
        recording();
    }
}
function onPlayBtn(){
    document.getElementById('recordBtn').innerHTML = 'Record';
    recording();
    if(isAbleToPlay){
        isAbleToPlay = false;
        let timeToUnlockFunction = 300;
        for ( let index = 0; index < recordedSounds.length; index++){
            const soundObj = recordedSounds[index];
            let keyPressed = document.getElementById(soundObj.soundCode);
            if(index === recordedSounds.length-1){
                timeToUnlockFunction += soundObj.time;
            }
            setTimeout(()=>{
                keyPressed.classList.add('keyDown');
                isClassPlayable(soundObj,keyPressed);
            },
            soundObj.time
            );  
        }
        setTimeout(()=>{
            isAbleToPlay = true;
            console.log('Play function is callable again');
        },timeToUnlockFunction);
        
    }
}
function isClassPlayable(soundObject, keyPressed){
    highlightDuration(keyPressed);
    let checkboxId = soundObject.soundClass + 'Check';
    console.log(checkboxId);
    let isChecked = document.getElementById(checkboxId).checked;
    console.log(isChecked);
    if(isChecked)
        playSound(soundObject.soundId);
}
function playSound(soundId){
    const sound = document.querySelector('#'+soundId);
    sound.play();
}
function recording(flag){
    const el = document.getElementById('recordBtn');
    if(flag === 1)
        el.classList.add('recording');
    else
        el.classList.remove('recording');
}