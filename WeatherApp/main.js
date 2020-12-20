// import ApiRequest from './ApiRequest.js';
// const apiRequester = new ApiRequest();
const LSKey = 'cities';
const apiKey = '8a3fb2f55376982bb91a3fd07414d0e7';
const mainCitiesSection = document.getElementById('citiesInfoContainer');
const cityAddBtn = document.getElementById('cityAddBtn');
const citiesInLocalStorage = [];
//on rerender change info inside instead of redownloading
document.addEventListener('DOMContentLoaded', () => {    
    RenderCitiesFromLS();}
);
cityAddBtn.addEventListener('click', GetCityInfo);
function GetCityInfo(){
    const inputCityName = document.getElementById('cityNameInput');
    const nameValue = inputCityName.value;
    if(nameValue !== '')
        GenerateCityWeatherInfo(nameValue);
    inputCityName.value = '';
}
function GenerateCityWeatherInfo(cityName){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    const apiRequest = fetch(apiUrl);
    apiRequest
        .then(resp => ParseResponse(resp))
        .then(weather => CreateWeatherObj(weather))
        .then(weatherObj => CreateHTMLObj(weatherObj))
        .catch(e => console.log(e));
}

function ParseResponse(resp){
    if(resp.ok)
        return resp.json();
    else
        return Promise.reject('failed to parse response');
}
function RenderCitiesFromLS(){
    if(localStorage.getItem(LSKey) !== null){
        RenderTimeStamp();
        const citiesFromLS = JSON.parse(localStorage.getItem(LSKey));
        for(const city of citiesFromLS)
            GenerateCityWeatherInfo(city);
    }
}
function CreateWeatherObj(weather){
    const {name, main:{temp : temp, feels_like : feels_like, pressure : pressure, humidity : humidity}} = weather;
    const description = weather.weather[0].description;
    const icon = weather.weather[0].icon;
    const weatherObj = {name : name, temp : temp, feelsLiketemp : feels_like, pressure : pressure, humidity : humidity, description : description, icon : icon};
    AddNewCityToLocalStorage(name);
    return weatherObj;
}
function RenderTimeStamp(){
    const timeStamp = document.getElementById('timeStamp');
    const time = new Date().toLocaleTimeString();
    timeStamp.innerHTML = `Data last refreshed ${time}`;
}
function RefreshData(){
    mainCitiesSection.innerHTML = '';
    RenderCitiesFromLS();
}
function AddNewCityToLocalStorage(name){
    if(!citiesInLocalStorage.includes(name)){
        citiesInLocalStorage.push(name);
        SynchronizeLS();
    }
}
function SynchronizeLS(){
    localStorage.setItem(LSKey, JSON.stringify(citiesInLocalStorage));
}
function CreateHTMLObj(weatherObj){
    const citySection = document.createElement('section');
    const cityName = document.createElement('h2');
    cityName.innerHTML = weatherObj.name;

    const cityInfos = document.createElement('ul');

    const description = document.createElement('li');
    description.innerHTML = weatherObj.description.charAt(0).toUpperCase() + weatherObj.description.slice(1);

    const temperature = document.createElement('li');
    temperature.innerHTML = `Temperature: ${weatherObj.temp}`;

    const feelsLiketemp = document.createElement('li');
    feelsLiketemp.innerHTML = `Feels like temperature: ${weatherObj.feelsLiketemp}`;

    const pressure = document.createElement('li');
    pressure.innerHTML = `Pressure: ${weatherObj.pressure}`;

    const humidity = document.createElement('li');
    humidity.innerHTML = `Humidity: ${weatherObj.humidity}`;

    const iconUrl = `http://openweathermap.org/img/wn/${weatherObj.icon}@2x.png`;
    const icon = new Image();
    icon.src = iconUrl;

    cityInfos.appendChild(description);
    cityInfos.appendChild(temperature);
    cityInfos.appendChild(feelsLiketemp);
    cityInfos.appendChild(pressure);
    cityInfos.appendChild(humidity);

    citySection.appendChild(cityName);
    citySection.appendChild(icon);
    citySection.appendChild(cityInfos);

    mainCitiesSection.appendChild(citySection);
}
setInterval(RefreshData,5000);
