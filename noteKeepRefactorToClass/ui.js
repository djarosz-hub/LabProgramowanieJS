import Note from './note.js';
//import Notes from './notes.js';
// import Notes from './notes.js';
export default class Ui{
    constructor(newNoteContainer = 'noteCreate', notesContainer = 'notesContainer'){
        this.mainContainer = document.getElementById(notesContainer);
        this.newNoteContainer = document.getElementById(newNoteContainer);
    }
    createNewNote(){
        const title = document.getElementById('noteTitle');
        const content = document.getElementById('noteContent');
        const note = new Note(title.value,content.value);
        title.value = '';
        content.value= '';
        return note;
    }
    removeNoteBtnClick(eventNoteId,notes){
        console.log('remove works');
        console.log(eventNoteId);
        console.log(notes);
        const noteIndex = this.getNoteIndex(eventNoteId,notes);
        notes.splice(noteIndex,1);
        //super
    }
    onPinnedClick(isPinned,noteId,notes){
        console.log('pinnedclick');
        // const noteIndex = this.getNoteIndex(noteId,notes);
        // const note = notes[noteIndex];
        // note.pinned = !isPinned;
        notes[this.getNoteIndex(noteId,notes)].pinned = !isPinned;
    }
    changeColor(noteColor,noteId,notes){
        console.log('colorChangefunc');
        notes[this.getNoteIndex(noteId,notes)].color = noteColor;
        console.log('color changed to:', noteColor);
    }
    getNoteIndex(noteId,notes){
        return notes.findIndex(note=>note.id==noteId);
    }
    
}