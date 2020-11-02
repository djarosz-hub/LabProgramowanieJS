document.addEventListener('readystatechange', () => {    
    if (document.readyState == 'complete') {
        getNotesFromLocalStorage();
        getAllNotesFromHtml();
    }
});
window.onbeforeunload = synchronize;
function synchronize(){
    notes = [];
    getAllNotesFromHtml();
    pushNotesToLocalStorage();
}
const lsNotesKey = 'notes';
const newNoteBtn = document.getElementById('newNoteBtn');
let notes = [];
const notesContainer = document.querySelector('main');
newNoteBtn.addEventListener('click',newNoteCreateFunction);
function newNoteCreateFunction(){
    const noteTitle = document.getElementById('noteTitle').value;
    const noteContent = document.getElementById('noteContent').value;
    const noteDate = new Date;
    // console.log(noteTitle);
    // console.log(noteContent);
    // console.log(noteDate);
    generateNote(noteTitle,noteContent,'unpinned',noteDate,'default', true);
    // const note = {
    //     title: noteTitle,
    //     content: noteContent,
    //     pinned: false,
    //     date: noteDate,
    //     color: 'default',
    // };
    // notes.push(note);
}
function pushNotesToLocalStorage(){
    localStorage.setItem(lsNotesKey,JSON.stringify(notes));
    //notes = [];
}
function getNotesFromLocalStorage(){
    const notesFromLocalStorage = JSON.parse(localStorage.getItem(lsNotesKey));
    const convertedNotes = notesFromLocalStorage.map( note => {
        note.date = new Date(note.date.toLocaleString());
        return note;
    });
    for(const note of convertedNotes){
        renderNotes(note);
    }
}
function getAllNotesFromHtml(){
    //QUERYSELECTORALL CLASS NOTE
    const inBodyNotes = document.body.querySelectorAll('.note');
    //const nodes = [].slice.call(inBodyNotes,1);
    console.log(inBodyNotes);
    for(const note of inBodyNotes){
        const noteClass = note.classList.toString().split(' ');
        //1 = kolor, 2 = pinned
        const temp = note.children;
        //console.log(temp);
        let title = '';
        let content = '';
        let date = '';
        for(let i = 0; i< temp.length;i++){
            console.log(temp[i].innerHTML);
            if(i===0){
                title = temp[i].innerHTML;
                continue;
            }
            if(i===1){
                content = temp[i].innerHTML;
                continue;
            }
            if(i===2){
                date = temp[i].innerHTML;
                break;  
            }
        }
        generateNote(title, content, noteClass[2], date, noteClass[1]);
    }
    // if(notes.length > 0)
    //     return true;
    // else
    //     return false;
    return notes.length > 0 ? true : false; 
}
function generateNote(title,content,pin,date,color ='default',toRender = false){
    const isPinned = pin==='pinned'? true : false;
    const note = {
        title: title,
        content: content,
        pinned: isPinned,
        date: new Date(date),
        color: color,
    };
    console.log(note);
    console.log('to render: ', toRender);
    if(toRender){
        renderNotes(note);
        //pushNotesToLocalStorage();
        // synchronizeNotes();
    }
    else
        notes.push(note);
}
function renderNotes(note){
    const isPinned = note.pinned?'pinned':'unpinned';
    let noteColor = '';
    //TODO
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
    notesContainer.appendChild(htmlNote);
}
//TODO
function synchronizeNotes(clean = false){
    if(clean){
        notes = [];
    }
    getAllNotesFromHtml();
    console.log('all notes taken');
    pushNotesToLocalStorage();
}
function removeNote(ev){
    const tag = ev.target.parentNode;
    console.log(tag);
    tag.parentNode.removeChild(tag);
    //synchronizeNotes(true);
    // getAllNotesFromHtml();
    // console.log('all notes taken');
    // pushNotesToLocalStorage();
    //getNotesFromLocalStorage();
    

}