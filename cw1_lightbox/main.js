//pobranie referencji
const gallery = document.querySelectorAll('.gallery img');

for(let i = 0; i < gallery.length ;i++){
    const img = gallery[i];
    img.addEventListener('click',showLightbox);
}
const arrowPrevDiv = document.querySelector('.arrowprev');
const arrowNextDiv = document.querySelector('.arrownext');
function showLightbox(ev){
    console.dir(ev.target);
    const lightbox = document.querySelector('.lightbox');
    const img = document.querySelector('.lightbox img');
    const imgUrl = ev.target.src;
    img.src = imgUrl;
    lightbox.classList.add('visible');
    // const nextElement = ev.target.nextElementSibling;
    // const previousElement = ev.target.previousElementSibling;
    // console.log(previousElement);
    // console.log(nextElement);
    imageChange(ev.target);
}
function imageChange(el){
    console.log('element odebrany w funkcji imagechange:');
    console.log(el);
    arrowCheck(el);
    arrowPrevDiv.addEventListener('click', function(){
        const img = document.querySelector('.lightbox img');
        img.src = el.previousElementSibling.src;
        imageChange(el.previousElementSibling);
    });
    arrowNextDiv.addEventListener('click', function(){
        const img = document.querySelector('.lightbox img');
        img.src = el.nextElementSibling.src;
        imageChange(el.nextElementSibling);
    });

}
function arrowCheck(el){
    if(el.previousElementSibling == null){
        arrowPrevDiv.classList.add('arrowHidden');
    }
    else{
        arrowPrevDiv.classList.remove('arrowHidden');
    }
    if(el.nextElementSibling == null){
        arrowNextDiv.classList.add('arrowHidden');
    }
    else{
        arrowNextDiv.classList.remove('arrowHidden');
    }
}

const mainLightbox = document.querySelector('.lightbox');
mainLightbox.addEventListener('click', hide);
function hide(event){
    //console.log(event.target);
    if(event.target.id != 'prev' && event.target.id != 'next')
        mainLightbox.classList.toggle('visible');
}


