// import Note from './note.js';
// import Db from './db.js';
// import Ui from './ui.js';
import Notes from './notes.js';
const notki = new Notes();
document.addEventListener('DOMContentLoaded', () => {    
    notki.renderNotes();
}
);
document.getElementById('newNoteBtn').addEventListener('click', ()=>notki.addNewNote());
