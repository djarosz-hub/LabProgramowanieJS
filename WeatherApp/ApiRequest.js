export default class ApiRequest{
    constructor(){
        this.apiKey = '8a3fb2f55376982bb91a3fd07414d0e7';
    }
    RequestForCity(cityName){
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}&lang=pl&units=metric`;
        const apiRequest = fetch(apiUrl);
        apiRequest
            .then(resp => this.ParseResponse(resp))
            .then(weather => this.CreateWeatherObj(weather))
            .then(weatherObj => this.SetCityObj(weatherObj))
            .catch(e => console.log(e));
    }
    ParseResponse(resp){
        if(resp.ok)
            return resp.json();
        else
            return Promise.reject('failed to parse response');
    }
    CreateWeatherObj(weather){
        const {name, main:{temp : temp, feels_like : feels_like, pressure : pressure, humidity : humidity}} = weather;
        const description = weather.weather[0].description;
        const icon = weather.weather[0].icon;
        const weatherObj = {name : name, temp : temp, feelsLiketemp : feels_like, pressure : pressure, humidity : humidity, description : description, icon : icon};
        return weatherObj; 
    }
    SetCityObj(city){
        this.city = city;
    }
    GetCityObj(){
        return this.city;
    }

}