import Ui from './ui.js';
import WeatherApiRequester from './weatherApiRequester.js';
import Db from './db.js';
export default class CitiesOrganizer{
    constructor(){
        this.mainCitiesSection = document.getElementById('citiesInfoContainer');
        this.cityObjsInLocalStorageArr = [];
        this.actualCitiesDataFromApiArr = [];
        this.db = new Db();
        this.apiCall = new WeatherApiRequester(this.actualCitiesDataFromApiArr, this);
        this.ui = new Ui(this.apiCall,this.actualCitiesDataFromApiArr);
    }
    RenderWeatherInfoFromLS(){
        if(this.db.GetCitiesFromLS(this.cityObjsInLocalStorageArr,this.ui)){
            const cityNamesFromLocalStorageArr = this.cityObjsInLocalStorageArr.map(c=>c.name);
            console.log('city names from ls arr:');
            console.log(cityNamesFromLocalStorageArr);
            Promise.allSettled(cityNamesFromLocalStorageArr.map(c => this.apiCall.GetCityWeatherDataFromApi(c)))
                .then(()=>this.actualCitiesDataFromApiArr.sort(this.CitiesSort))
                .then(()=>this.AddWeatherInfoToHtml())
                .then(()=> this.CheckIfDataReloadWasComplete())
                .catch(e=>console.log(e));
        }
    }
    CheckIfDataReloadWasComplete(){
        for(const city of this.cityObjsInLocalStorageArr){
            const archivedCityName = city.name;
            if(!this.actualCitiesDataFromApiArr.some(cityActualData => cityActualData.name === archivedCityName)){
                console.log(`checked : ${city.name}`);
                const cityTakenFromArchive = true;
                this.CreateHTMLObj(city,cityTakenFromArchive);
            }
        }
    }
    CitiesSort(a, b){
        if(a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
    }
    AddWeatherInfoToHtml(){
        const cityTakenFromArchive = false;
        for(const city of this.actualCitiesDataFromApiArr)
            this.CreateHTMLObj(city, cityTakenFromArchive);
    }
    CreateHTMLObj(weatherObj, cityTakenFromArchive){
        const citySection = document.createElement('section');
        const cityHeader = document.createElement('div');
        const cityDesc = document.createElement('div');
    
        const cityName = document.createElement('h2');
        cityName.innerHTML = weatherObj.name;
    
        const cityInfos = document.createElement('ul');
    
        const description = document.createElement('text');
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
    
        const removeBtn = document.createElement('div');
        removeBtn.classList.add('removeBtn');
        const trashIcon = document.createElement('i');
        trashIcon.classList.add('demo-icon','icon-trash');
        removeBtn.appendChild(trashIcon);
        removeBtn.addEventListener('click', (e)=>this.ui.RemoveCityBtn(e,this));
        
        cityInfos.appendChild(temperature);
        cityInfos.appendChild(feelsLiketemp);
        cityInfos.appendChild(pressure);
        cityInfos.appendChild(humidity);
    
        cityDesc.appendChild(cityName);
        cityDesc.appendChild(description);
    
        cityHeader.appendChild(cityDesc);
        cityHeader.appendChild(icon);
        
        citySection.appendChild(cityHeader);
        citySection.appendChild(cityInfos);
        citySection.appendChild(removeBtn);
        
        citySection.classList.add('citySection');
        cityHeader.classList.add('cityHeader');
        
        if(cityTakenFromArchive){
            citySection.classList.add('outdatedInfo');
            const warning = document.createElement('div');
            warning.innerHTML = 'Outdated';
            warning.classList.add('warningInfo');
            citySection.appendChild(warning);
        }
        this.mainCitiesSection.appendChild(citySection);
    }
    RemoveCityFromCityObjectsList(cityName){
        const index = this.cityObjsInLocalStorageArr.findIndex(c => c.name === cityName);
        console.log('loggin in removecity in cities organizer');
        console.log(this.cityObjsInLocalStorageArr[index]);
        this.cityObjsInLocalStorageArr.splice(index,1);
    }
    ReloadInfo(){
        this.db.SynchronizeLS(this.cityObjsInLocalStorageArr);
        this.cityObjsInLocalStorageArr.length = 0;
        this.actualCitiesDataFromApiArr.length = 0;
        this.mainCitiesSection.innerHTML = '';
        this.RenderWeatherInfoFromLS();
    }
    SynchronizeCitiesInfo(){
        this.cityObjsInLocalStorageArr.length = 0;
        this.actualCitiesDataFromApiArr.map(city => this.cityObjsInLocalStorageArr.push(city));
    }



}