//pobranie referencji
const gallery = document.querySelectorAll('.gallery img');
let selectedImage;

for(let i = 0; i < gallery.length ;i++){
    const img = gallery[i];
    img.addEventListener('click',showLightbox);
}
const arrowPrevDiv = document.querySelector('.arrowprev');
const arrowNextDiv = document.querySelector('.arrownext');
arrowPrevDiv.addEventListener('click', function() {
    const img = document.querySelector('.lightbox img');
    img.src = selectedImage.previousElementSibling.src;
    imageChange(selectedImage.previousElementSibling);
});
arrowNextDiv.addEventListener('click', function() {
    const img = document.querySelector('.lightbox img');
    img.src = selectedImage.nextElementSibling.src;
    imageChange(selectedImage.nextElementSibling);
});
function showLightbox(ev){
    console.dir(ev.target);
    const lightbox = document.querySelector('.lightbox');
    const img = document.querySelector('.lightbox img');
    const imgUrl = ev.target.src;
    img.src = imgUrl;
    lightbox.classList.add('visible');

    imageChange(ev.target);
}

function imageChange(el){
    console.log('element odebrany w funkcji imagechange:');
    console.log(el);
    arrowCheck(el);
    selectedImage = el;

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
mainLightbox.addEventListener('click', hideLightbox);
function hideLightbox(event){
    //console.log(event.target);
    if(event.target.id != 'prev' && event.target.id != 'next')
        mainLightbox.classList.toggle('visible');
}


