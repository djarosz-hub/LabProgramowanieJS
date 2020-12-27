import CitiesOrganizer from './citiesOrganizer.js';
const cities = new CitiesOrganizer();
document.addEventListener('DOMContentLoaded',cities.RenderWeatherInfoFromLS());
const cityAddBtn = document.getElementById('cityAddBtn');
cityAddBtn.addEventListener('click',()=>cities.ui.GetCityInfoFromInput());
setInterval(() => {
    cities.ReloadInfo();
}, 1000*120);