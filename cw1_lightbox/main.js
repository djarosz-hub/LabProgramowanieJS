//pobranie referencji
const gallery = document.querySelectorAll('.gallery img');

for(let i = 0; i < gallery.length ;i++){
    const img = gallery[i];
    img.addEventListener('click',showLightbox);
}

// gallery.addEventListener('click', showLightbox);
function showLightbox(ev){
    console.log(ev.target);
    const lightbox = document.querySelector('.lightbox');
    const img = document.querySelector('.lightbox img');
    const imgUrl = ev.target.src;
    img.src = imgUrl;
    lightbox.classList.add('visible');

}
const mainLightbox = document.querySelector('.lightbox');
mainLightbox.addEventListener('click', hideLightbox);
function hideLightbox(){
    mainLightbox.classList.toggle('visible');
}