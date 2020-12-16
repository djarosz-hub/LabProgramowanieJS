const apiKey = '8a3fb2f55376982bb91a3fd07414d0e7';
const city = 'Kraków';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pl&units=metric`;
const apiRequest = fetch(apiUrl);

apiRequest
    .then(respObj => respObj.json())
    .then(weather => getWeather(weather))
    .catch(e => console.log(e));
function getWeather(weather){
    console.log(weather);
    console.log(weather.name);
    console.log(weather.main.temp);
    console.log(weather.main.pressure);
}
