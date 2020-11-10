import Notes from './notes.js';
const notki = new Notes();
document.addEventListener('DOMContentLoaded', () => {    
    notki.renderNotes();}
);
document.getElementById('newNoteBtn').addEventListener('click', ()=>notki.addNewNote());
