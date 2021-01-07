import City from './city.js';
export default class weatherApiRequester{
    constructor(actualCitiesDataFromApiArr, citiesOrganizer){
        this.apiKey = '8a3fb2f55376982bb91a3fd07414d0e7';
        this.city = new City();
        this.actualCitiesDataFromApiArr = actualCitiesDataFromApiArr;
        this.citiesOrganizer = citiesOrganizer;
    }
    CheckIfCityIsSupportedByApi(cityName){
       return this.GetCityWeatherDataFromApi(cityName)
            // .then(()=>this.citiesOrganizer.SynchronizeCitiesInfo())
            // .then(()=>this.citiesOrganizer.ReloadInfo())
            .catch(e => console.log(e));
    }
    GetCityWeatherDataFromApi(cityName){
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}&units=metric`;
        return fetch(apiUrl)
            .then(resp => this.TryToParseResponse(resp))
            .then(weather => this.city.CreateWeatherObj(weather))
            .then(weatherObj => this.actualCitiesDataFromApiArr.push(weatherObj))
            .catch(e => console.log(e));
    }
    TryToParseResponse(resp){
        if(resp.ok)
            return resp.json();
        else
            return Promise.reject('failed to parse response');
            //tu wyjatek i tu sobie przejdzie po catchach blad
    }
}