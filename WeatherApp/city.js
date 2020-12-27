export default class City{
    constructor(){

    }
    CreateWeatherObj(weather){
        const {name, main:{temp : temp, feels_like : feels_like, pressure : pressure, humidity : humidity}} = weather;
        const description = weather.weather[0].description;
        const icon = weather.weather[0].icon;
        const weatherObj = {name : name, temp : temp, feelsLiketemp : feels_like, pressure : pressure, humidity : humidity, description : description, icon : icon};
        return weatherObj;
    }
}