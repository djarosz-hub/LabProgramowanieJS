const LSKey = 'cities';
const apiKey = '8a3fb2f55376982bb91a3fd07414d0e7';
const mainCitiesSection = document.getElementById('citiesInfoContainer');
const cityAddBtn = document.getElementById('cityAddBtn');
const cityObjsInLocalStorageArr = [];
const actualCitiesDataFromApiArr = [];
document.addEventListener('DOMContentLoaded', RenderWeatherInfoFromLS);
cityAddBtn.addEventListener('click', GetCityInfoFromInput);
function GetCityInfoFromInput(){
    const inputCityName = document.getElementById('cityNameInput');
    const nameValue = inputCityName.value;
    if(nameValue !== '' && CheckIfCityAlreadyExist(nameValue)){
        console.log(`city ${nameValue} not found in actual data`);
        console.log('cities in actual when checking:');
        console.log(actualCitiesDataFromApiArr);
        CheckIfCityIsSupportedByApi(nameValue);
    }
    inputCityName.value = '';
}
function CheckIfCityIsSupportedByApi(cityName){
    GetCityWeatherDataFromApi(cityName)
        .then(()=>SynchronizeCitiesInfo())
        .then(()=>ReloadInfo())
        .catch(e => console.log(e));
}

function SynchronizeCitiesInfo(){
    cityObjsInLocalStorageArr.length = 0;
    actualCitiesDataFromApiArr.map(city => cityObjsInLocalStorageArr.push(city));
}
function CheckIfCityAlreadyExist(cityName){
    const inputNameTrimmed = cityName.trim();
    const inputNameFormatted = inputNameTrimmed.charAt(0).toUpperCase() + inputNameTrimmed.slice(1);
    console.log(inputNameFormatted);
    if(actualCitiesDataFromApiArr.some(city => city.name === inputNameFormatted))
        return false;
    return true;
}
function ReloadInfo(){
    SynchronizeLS();
    cityObjsInLocalStorageArr.length = 0;
    actualCitiesDataFromApiArr.length = 0;
    mainCitiesSection.innerHTML = '';
    RenderWeatherInfoFromLS();
}
function SynchronizeLS(){
    localStorage.setItem(LSKey, JSON.stringify(cityObjsInLocalStorageArr));
}
function RenderWeatherInfoFromLS(){
    if(GetCitiesFromLS()){
        const cityNamesFromLocalStorageArr = cityObjsInLocalStorageArr.map(c=>c.name);
        console.log('city names from ls arr:');
        console.log(cityNamesFromLocalStorageArr);
        Promise.allSettled(cityNamesFromLocalStorageArr.map(GetCityWeatherDataFromApi))
            .then(()=>actualCitiesDataFromApiArr.sort(CitiesSort))
            .then(()=>AddWeatherInfoToHtml())
            .then(()=> CheckIfDataReloadWasComplete())
            .catch(e=>console.log(e));
    // .finally(()=>ChangeMainContainerDescription());
    }
}
function GetCityWeatherDataFromApi(cityName){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    return fetch(apiUrl)
        .then(resp => TryToParseResponse(resp))
        .then(weather => CreateWeatherObj(weather))
        .then(weatherObj => actualCitiesDataFromApiArr.push(weatherObj))
        .catch(e => console.log(e));
}
function CheckIfDataReloadWasComplete(){
    for(const city of cityObjsInLocalStorageArr){
        const archivedCityName = city.name;
        if(!actualCitiesDataFromApiArr.some(cityActualData => cityActualData.name === archivedCityName)){
            console.log(`checked : ${city.name}`);
            const cityTakenFromArchive = true;
            CreateHTMLObj(city,cityTakenFromArchive);
        }
    }
}
function AddWeatherInfoToHtml(){
    const cityTakenFromArchive = false;
    for(const city of actualCitiesDataFromApiArr)
        CreateHTMLObj(city, cityTakenFromArchive);
}
function CreateHTMLObj(weatherObj, cityTakenFromArchive){
    const citySection = document.createElement('section');
    const cityName = document.createElement('h2');
    cityName.innerHTML = weatherObj.name;

    const cityInfos = document.createElement('ul');

    const description = document.createElement('li');
    description.innerHTML = weatherObj.description.charAt(0).toUpperCase() + weatherObj.description.slice(1);

    const temperature = document.createElement('li');
    temperature.innerHTML = `Temperature: ${weatherObj.temp} &#8451;`;

    const feelsLiketemp = document.createElement('li');
    feelsLiketemp.innerHTML = `Feels like temperature: ${weatherObj.feelsLiketemp} &#8451;`;

    const pressure = document.createElement('li');
    pressure.innerHTML = `Pressure: ${weatherObj.pressure} hPa`;

    const humidity = document.createElement('li');
    humidity.innerHTML = `Humidity: ${weatherObj.humidity}%`;

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
    
    if(cityTakenFromArchive){
        const warning = document.createElement('div');
        warning.innerHTML = 'uwaga';
        citySection.appendChild(warning);
    }
    mainCitiesSection.appendChild(citySection);
}
function CreateWeatherObj(weather){
    const {name, main:{temp : temp, feels_like : feels_like, pressure : pressure, humidity : humidity}} = weather;
    const description = weather.weather[0].description;
    const icon = weather.weather[0].icon;
    const weatherObj = {name : name, temp : temp, feelsLiketemp : feels_like, pressure : pressure, humidity : humidity, description : description, icon : icon};
    return weatherObj;
}
function TryToParseResponse(resp){
    if(resp.ok)
        return resp.json();
    else
        return Promise.reject('failed to parse response');
}
function GetCitiesFromLS(){
    if(localStorage.getItem(LSKey) !== null){
        RenderTimeStamp();
        const citiesFromLS = JSON.parse(localStorage.getItem(LSKey));
        for(const city of citiesFromLS){
            console.log(city);
            cityObjsInLocalStorageArr.push(city);
        }
        console.log('Cities from local storage:');
        console.log(cityObjsInLocalStorageArr);
        return true;
    }
    console.log('Getting cities from LS failed');
    return false;
}
function RenderTimeStamp(){
    const timeStamp = document.getElementById('timeStamp');
    const time = new Date().toLocaleTimeString();
    timeStamp.innerHTML = `Data last refreshed ${time}`;
}
function CitiesSort(a, b){
    if(a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
}
setInterval(() => {
    ReloadInfo();
}, 1000*120);