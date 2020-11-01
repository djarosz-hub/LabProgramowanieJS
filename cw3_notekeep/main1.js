const lsNotesKey = 'notes';
const newNoteBtn = document.getElementById('newNoteBtn');
let notes = [];
const notesContainer = document.querySelector('main');
newNoteBtn.addEventListener('click',newNoteFunction);
function newNoteFunction(){
    const noteTitle = document.getElementById('noteTitle').value;
    const noteContent = document.getElementById('noteContent').value;
    const noteDate = new Date;
    // console.log(noteTitle);
    // console.log(noteContent);
    // console.log(noteDate);

    const note = {
        title: noteTitle,
        content: noteContent,
        pinned: false,
        date: noteDate,
        color: 'default',
    };
    notes.push(note);
}
function pushNotesToLocalStorage(){
    localStorage.setItem(lsNotesKey,JSON.stringify(notes));
    notes = [];
}
function getNotesFromLocalStorage(){
    const notesFromLocalStorage = JSON.parse(localStorage.getItem(lsNotesKey));
    const convertedNotes = notesFromLocalStorage.map( note => {
        note.date = new Date(note.date);
        return note;
    });
    for(const note of convertedNotes){
        renderNotes(note);
    }
}

function renderNotes(note){
    const noteColor;
    //TODO
    switch(note.color){
    case 'default':
        //#808080
        break;
    case 'olive':
        // #336600
        break;
    case 'lavend':
        //#666699
        break;
    case 'blue':
        //#336699
        break;
    case 'lightblue':
        //#99ccff
        break;
    case 'sand':
        //#999966
        break;
    case 'red':
        //#cc0000
        break;
    case 'violet':
        //#993366
        break;
    }
    const htmlNote = document.createElement('section');
    const htmltitle = document.createElement('h1');
    const htmlContent = document.createElement('p');
    const htmlTime = document.createElement('time');
    const htmlButton = document.createElement('button');
    htmlNote.classList.add('note');
    htmltitle.innerHTML = note.title;
    htmlContent.innerHTML = note.content;
    htmlTime.innerHTML = note.date.toLocaleString();
    htmlButton.innerHTML = 'remove';
    htmlButton.addEventListener('click', removeNote);
    htmlNote.appendChild(htmltitle);
    htmlNote.appendChild(htmlContent);
    htmlNote.appendChild(htmlTime);
    htmlNote.appendChild(htmlButton);
    notesContainer.appendChild(htmlNote);
}
//TODO
function removeNote(ev){
    ev.target;
}