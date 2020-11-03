const lsNotesKey = 'notes';
document.addEventListener('DOMContentLoaded', () => {    
    getNotesFromLocalStorage();
    for(const note of notes){
        renderNote(note, note.noteId,false);
    }
}
);
window.onbeforeunload = synchronize;

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
    htmlNote.id = noteId;
    htmlNote.classList.add('note', noteColor, isPinned);
    htmltitle.innerHTML = note.title;
    htmlContent.innerHTML = note.content;
    htmlTime.innerHTML = note.date.toLocaleString();
    htmlButton.innerHTML = 'remove';
    htmlButton.addEventListener('click', removeNote);
    htmlNote.appendChild(htmltitle);
    htmlNote.appendChild(htmlContent);
    htmlNote.appendChild(htmlTime);
    htmlNote.appendChild(htmlButton);
    if(toPrepend)
        notesContainer.prepend(htmlNote);
    else
        notesContainer.appendChild(htmlNote);
}
function removeNote(ev){
    const tag = ev.target.parentNode;
    const noteIndex = notes.findIndex(note => note.noteId==tag.id);
    console.log(noteIndex);
    notes.splice(noteIndex,1);
    tag.parentNode.removeChild(tag);
}