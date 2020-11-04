const lsNotesKey = 'notes';
document.addEventListener('DOMContentLoaded', () => {    
    getNotesFromLocalStorage();
    for(const note of notes){
        renderNote(note, note.noteId, false);
    }
}
);
window.onbeforeunload = synchronize;
//NEED TO CREATE TWO SEPARATE CONTAINERS FOR PINNED AND UNPINNED NOTES
function synchronize(){
    pushNotesToLocalStorage();
}
const newNoteBtn = document.getElementById('newNoteBtn');
let notes = [];
const notesContainer = document.querySelector('main');
newNoteBtn.addEventListener('click',newNoteCreateFunction);
function newNoteCreateFunction(){
    const noteTitle = document.getElementById('noteTitle');
    const noteContent = document.getElementById('noteContent');
    const noteDate = new Date();
    const noteId = new Date().getTime().toString();
    generateNote(noteTitle.value,noteContent.value,'unpinned',noteDate,'default',noteId, true);
    noteTitle.value = '';
    noteContent.value = '';
    
}

function pushNotesToLocalStorage(){
    localStorage.setItem(lsNotesKey,JSON.stringify(notes));
}

function getNotesFromLocalStorage(){
    const notesFromLocalStorage = JSON.parse(localStorage.getItem(lsNotesKey));
    const convertedNotes = notesFromLocalStorage.map( note => {
        note.date = new Date(note.date);
        return note;
    });
    console.log(convertedNotes);

    for(const note of convertedNotes){
        notes.push(note);
    }
}
function generateNote(title,content,pin,date,color ='default',noteId, toPrepend = false){
    const isPinned = pin==='pinned'? true : false;
    const note = {
        title: title,
        content: content,
        pinned: isPinned,
        date: date,
        color: color,
        noteId: noteId,
    };
    console.log(note);
    if(isPinned==true)
        toPrepend = true;
    renderNote(note,noteId,toPrepend);
    if(toPrepend)
        notes.unshift(note);
    else
        notes.push(note);
}

function renderNote(note,noteId,toPrepend){
    const isPinned = note.pinned?'pinned':'unpinned';
    let noteColor = '';
    switch(note.color){
    case 'olive':
        // #336600
        noteColor = 'olive';
        break;
    case 'lavend':
        noteColor = 'lavend';
        //#666699
        break;
    case 'blue':
        noteColor = 'blue';
        //#336699
        break;
    case 'lightblue':
        noteColor = 'lightblue';
        //#99ccff
        break;
    case 'sand':
        noteColor = 'sand';
        //#999966
        break;
    case 'red':
        noteColor = 'red';
        //#cc0000
        break;
    case 'violet':
        noteColor = 'violet';
        //#993366
        break;
    default:
        //#808080
        noteColor = 'default';
        break;
    }
    const htmlNote = document.createElement('section');
    const htmltitle = document.createElement('h1');
    const htmlContent = document.createElement('p');
    const htmlTime = document.createElement('time');
    const htmlButton = document.createElement('button');
    const htmlColorChange = createPalette(noteColor);
    const pinnedArea = createPinnedCheck(isPinned);
    htmlNote.id = noteId;
    htmlNote.classList.add('note', noteColor, isPinned);
    htmltitle.innerHTML = note.title;
    htmlContent.innerHTML = note.content;
    htmlTime.innerHTML = 'Created '+note.date.toLocaleString();
    htmlColorChange.classList.add('paletteHolder');
    htmlButton.innerHTML = 'Remove';
    htmlButton.addEventListener('click', removeNote);
    htmlNote.appendChild(htmltitle);
    htmlNote.appendChild(htmlContent);
    htmlNote.appendChild(htmlTime);
    htmlNote.appendChild(htmlColorChange);
    htmlNote.appendChild(pinnedArea);
    htmlNote.appendChild(htmlButton);
    if(toPrepend || isPinned=='pinned')
        notesContainer.prepend(htmlNote);
    else
        notesContainer.appendChild(htmlNote);
}
function createPinnedCheck(isPinned){
    const pinnedAreaDiv = document.createElement('div');
    pinnedAreaDiv.classList.add('pinnedArea');
    const pinnedInput = document.createElement('input');
    pinnedInput.setAttribute('type','checkbox');
    pinnedAreaDiv.appendChild(pinnedInput);

    console.log(isPinned);
    if((isPinned=='pinned'))
        pinnedInput.checked = true;
    pinnedInput.addEventListener('click',onPinnedClick);
    return pinnedAreaDiv;
}
function onPinnedClick(ev){
    if(ev.target.checked==true){
        const pinnedNote = ev.target.parentNode.parentNode;
        console.log(pinnedNote,'notka tu');
        const pinnedNoteId = pinnedNote.id;
        console.log(pinnedNoteId,'id here');
        const noteIndex = notes.findIndex(note => note.noteId==pinnedNoteId);
        console.log(noteIndex,'note index new');
        const newNoteTitle = notes[noteIndex].title;
        const newNoteContent = notes[noteIndex].content;
        const isNotePinned = 'pinned';
        const newNoteDate = notes[noteIndex].date;
        const newNoteColor = notes[noteIndex].color;
        const newNoteId = new Date().getTime().toString();
        const toPrependNewNote = true;
        console.log(newNoteTitle,newNoteContent,isNotePinned,newNoteDate,newNoteColor,newNoteId,toPrependNewNote);
        notes.splice(noteIndex,1);
        console.log(pinnedNote);
        pinnedNote.parentNode.removeChild(pinnedNote);
        console.log(isNotePinned,'checkuje tu');
        generateNote(newNoteTitle,newNoteContent,isNotePinned,newNoteDate,newNoteColor,newNoteId,toPrependNewNote);
    }

}
function createPalette(chosenColor){
    console.log(chosenColor);
    const olive = document.createElement('div');
    const lavend = document.createElement('div');
    const blue = document.createElement('div');
    const lightblue = document.createElement('div');
    const sand = document.createElement('div');
    const red = document.createElement('div');
    const violet = document.createElement('div');
    const def = document.createElement('div');
    olive.classList.add('olive','palette');
    lavend.classList.add('lavend', 'palette');
    blue.classList.add('blue', 'palette');
    lightblue.classList.add('lightblue', 'palette');
    sand.classList.add('sand', 'palette');
    red.classList.add('red', 'palette');
    violet.classList.add('violet', 'palette');
    def.classList.add('default', 'palette');
    switch(chosenColor){
    case 'olive':
        olive.classList.add('chosenColor');
        break;
    case 'lavend':
        lavend.classList.add('chosenColor');
        break;
    case 'blue':
        blue.classList.add('chosenColor');
        break;
    case 'lightblue':
        lightblue.classList.add('chosenColor');
        break;
    case 'sand':
        sand.classList.add('chosenColor');
        break;
    case 'red':
        red.classList.add('chosenColor');
        break;
    case 'violet':
        violet.classList.add('chosenColor');
        break;
    case 'default':
        def.classList.add('chosenColor');
        break;
    }
    const colors = [];
    const palette = document.createElement('div');
    colors.push(olive,lavend,blue,lightblue,sand,red,violet,def);
    for(const col of colors){
        palette.appendChild(col);
        col.addEventListener('click',changeColor);
    }
    return palette;
}
function changeColor(ev){
    const allDivsInPalette = ev.target.parentNode.children;
    const colorKey = 'chosenColor';
    for(const col of allDivsInPalette){
        if(col.classList.value.includes(colorKey))
            col.classList.remove(colorKey);
    }
    ev.target.classList.add(colorKey);
    const pickedColor = ev.target.classList[0];
    const takenNote = ev.target.parentNode.parentNode;
    const takenNoteId = takenNote.id;
    const noteIndex = notes.findIndex(note => note.noteId==takenNoteId);
    notes[noteIndex].color = pickedColor;
    const noteClasses = takenNote.classList.value.split(' ');
    const newClass = `${noteClasses[0]} ${pickedColor} ${noteClasses[2]}`;
    takenNote.classList.value = newClass;
}
function removeNote(ev){
    const tag = ev.target.parentNode;
    const noteIndex = notes.findIndex(note => note.noteId==tag.id);
    console.log(noteIndex);
    notes.splice(noteIndex,1);
    tag.parentNode.removeChild(tag);
}