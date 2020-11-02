document.addEventListener('readystatechange', () => {    
    if (document.readyState == 'complete') {
        getNotesFromLocalStorage();
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
    generateNote(noteTitle,noteContent,'unpinned',noteDate,'default', true);
}

function pushNotesToLocalStorage(){
    localStorage.setItem(lsNotesKey,JSON.stringify(notes));
}

function getNotesFromLocalStorage(){
    const notesFromLocalStorage = JSON.parse(localStorage.getItem(lsNotesKey));
    // for(const note of notesFromLocalStorage){
    //     console.log(note.date, 'data pobrana');
    // }
    const convertedNotes = notesFromLocalStorage.map( note => {
        note.date = new Date(note.date.toLocaleString());
        return note;
    });
    // for(const note of convertedNotes){
    //     console.log(note.date, 'data pobrana z converted');
    // }
    for(const note of convertedNotes){
        renderNote(note);
    }
}

function getAllNotesFromHtml(){
    const inBodyNotes = document.body.querySelectorAll('.note');
    console.log(inBodyNotes);
    for(const note of inBodyNotes){
        const noteClass = note.classList.toString().split(' ');
        //1 = kolor, 2 = pinned
        const temp = note.children;
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
        //alert(date);
        generateNote(title, content, noteClass[2], date, noteClass[1]);
    }
    //return notes.length > 0 ? true : false; 
}
function generateNote(title,content,pin,date,color ='default',toRender = false){
    const isPinned = pin==='pinned'? true : false;
    //const validatedDateFormat = dateCheck(date);
    //console.log(date,'tutaj poprawiamy');
    const note = {
        title: title,
        content: content,
        pinned: isPinned,
        date: new Date(date),
        color: color,
    };
    //console.log(note.date,'data w generate note bez locale');
    //console.log(note.date.toLocaleString(),'data w generate note z locale');
    console.log(note);
    console.log('to render: ', toRender);
    if(toRender){
        renderNote(note);
    }
    else
        notes.push(note);
}
// function dateCheck(date){
//     //const pattern = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
//     const check = date.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/);
//     if(check)
//         return date;
//     else{
//         return date.split('/').reverse().join('-');
//     }

// }

function renderNote(note){
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
    htmlNote.classList.add('note', noteColor, isPinned);
    htmltitle.innerHTML = note.title;
    htmlContent.innerHTML = note.content;
    htmlTime.innerHTML = note.date.toLocaleString();
    //console.log(htmlTime.innerHTML,'data w rendernote');
    htmlButton.innerHTML = 'remove';
    htmlButton.addEventListener('click', removeNote);
    htmlNote.appendChild(htmltitle);
    htmlNote.appendChild(htmlContent);
    htmlNote.appendChild(htmlTime);
    htmlNote.appendChild(htmlButton);
    notesContainer.appendChild(htmlNote);
}
function removeNote(ev){
    const tag = ev.target.parentNode;
    tag.parentNode.removeChild(tag);
}