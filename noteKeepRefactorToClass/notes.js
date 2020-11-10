import Db from './db.js';
import Ui from './ui.js';

export default class Notes{
    constructor(){
        this.notes = [];
        this.db = new Db();
        this.ui = new Ui();
    }
    addNewNote(){
        const note = this.ui.createNewNote();
        this.notes.push(note);
        this.synchronizeLs();
    }
    synchronizeLs(){
        this.db.saveNotes(this.notes);
        this.renderNotes();
    }
    removeCurrentNotesFromHtml(){
        const notesContainer = document.getElementById('notesContainer');
        const childs = Array.from(notesContainer.childNodes);
        for(const child of childs){
            notesContainer.removeChild(child);
        }
    }
    renderNotes(){
        this.notes = [];
        if(this.db.checkForNullResponse()){
            this.notes = this.db.getNotes();
            this.removeCurrentNotesFromHtml();
            this.sortNotes();
            this.addNotesToHtml();
        }
    }
    sortNotes(){
        const earlierDate = (a,b) =>{
            if(a.date === b.date)
                return 0;
            else if(a.date < b.date)
                return 1;
            else 
                return -1;
        };
        const pinnedFirst = (a,b) => {
            if(a.pinned === b.pinned)
                return 0;
            else if(a.pinned === true && b.pinned === false)
                return -1;
            else   
                return 1;
        };
        this.notes.sort(earlierDate);
        this.notes.sort(pinnedFirst);
    }
    addNotesToHtml(){
        for(const note of this.notes){
            this.createHtmlNote(note);
        }
    }
    createHtmlNote(note){
        const notesContainer = document.getElementById('notesContainer');
        const isPinned = note.pinned?'pinned':'unpinned';

        const htmlNote = document.createElement('section');
        htmlNote.id= note.id;
        htmlNote.classList.add('note', note.color, isPinned);

        const htmltitle = document.createElement('h1');
        htmltitle.innerHTML = note.title;

        const htmlContent = document.createElement('p');
        htmlContent.innerHTML = note.content;

        const htmlTime = document.createElement('time');
        console.log(note.date);
        console.log(note.date.toString());
        console.log(note.date.toLocaleString());
        console.log(note.date.toLocaleString("en-US"));

        htmlTime.innerHTML = 'Created '+ note.date.toLocaleString();
        
        const htmlColorChange = this.createPalette(note.color,note.id);
        htmlColorChange.classList.add('paletteHolder');
        
        const pinnedArea = this.createPinnedCheck(note.pinned,note.id);

        const htmlButton = document.createElement('button');
        htmlButton.innerHTML = 'Remove';
        htmlButton.addEventListener('click',()=> {
            this.ui.removeNoteBtnClick(note.id, this.notes);
            setTimeout(() => {
                this.synchronizeLs();
            }, (10));
        });

        htmlNote.appendChild(htmltitle);
        htmlNote.appendChild(htmlContent);
        htmlNote.appendChild(htmlTime);
        htmlNote.appendChild(htmlColorChange);
        htmlNote.appendChild(pinnedArea);
        htmlNote.appendChild(htmlButton);
        console.log('adding to html:',htmlNote);

        notesContainer.appendChild(htmlNote);
    }
    createPalette(noteColor,noteId){
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
        switch(noteColor){
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
            console.log(col.classList[0]);
            col.addEventListener('click',()=>{
                this.ui.changeColor(col.classList[0],noteId,this.notes);
                setTimeout(() => {
                    this.synchronizeLs();
                }, (10));
            });
        }
        return palette;
    }
    createPinnedCheck(isPinned,noteId){
        const pinnedAreaDiv = document.createElement('div');
        pinnedAreaDiv.classList.add('pinnedArea');

        const pinnedInput = document.createElement('input');
        pinnedInput.setAttribute('type','checkbox');

        pinnedAreaDiv.appendChild(pinnedInput);
        console.log(pinnedInput);
        console.log(isPinned);
        if(isPinned)
            pinnedInput.checked = true;
        pinnedInput.addEventListener('change',()=>{
            console.log('klikniety check');
            this.ui.onPinnedClick(isPinned,noteId,this.notes);
            setTimeout(() => {
                this.synchronizeLs();
            }, (10));
        });
        return pinnedAreaDiv;
    }
    
    
}