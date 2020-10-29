const lsNotesKey = 'notes';

// stroe and save notes in local storage
const notes = [];
//json structure
const note = {
    title: 'new note',
    content: 'simple note',
    colour: '#ff1455',
    pinned: false,
    createDate: new Date()
};
notes.push(note);
notes.push(note);
notes.push(note);

localStorage.setItem(lsNotesKey, JSON.stringify(notes));
// read from local storage
const notesFromLocalStorage = JSON.parse(localStorage.getItem(lsNotesKey));

const convertedNotes = notesFromLocalStorage.map( note => {
    note.createDate = new Date(note.createDate);
    return note;
});
//html structure modify
const notesContainer = document.querySelector('main');
// for(const note of convertedNotes){
//     notesContainer.innerHTML += `
//         <section class="note">
//             <h1>${note.title}</h1>
//             <p>${note.content}</p>
//             <time>${note.createDate.toLocaleString()}</time>
//             <button>remove</button>
//         </section>`;
// }
function getNotesFromLocalSTorage(){}
function setNotesFromLocalSTorage(){}

function renderNotes(){
    for(const note in convertedNotes){
        const singleHtmlNote = createHtmlNote(note);
        // potem appendchild
    }   
}
function createHtmlNote(note){
    // VV
}
for(const note of convertedNotes){
    const htmlNote = document.createElement('section');
    const htmltitle = document.createElement('h1');
    const htmlContent = document.createElement('p');
    const htmlTime = document.createElement('time');
    const htmlButton = document.createElement('button');
    htmlNote.classList.add('note');
    htmltitle.innerHTML = note.title;
    htmlContent.innerHTML = note.content;
    htmlTime.innerHTML = note.createDate.toLocaleString();
    htmlButton.innerHTML = 'remove';

    htmlButton.addEventListener('click',removeNote);
    htmlNote.appendChild(htmltitle);
    htmlNote.appendChild(htmlContent);
    htmlNote.appendChild(htmlTime);
    htmlNote.appendChild(htmlButton);
    notesContainer.appendChild(htmlNote);

   
}
//usuwanie
// const noteToRemove = document.querySelector('')
// notesContainer.removeChild(noteToRemove)

function removeNote(){}
//get value from html fomr
document.querySelector('#newNoteBtn').addEventListener('click',onNewNote);
function onNewNote(){
    const title = document.querySelector('#noteTitle').value;
    const content = document.querySelector('#noteContent').value;
    console.log(title,content);
}