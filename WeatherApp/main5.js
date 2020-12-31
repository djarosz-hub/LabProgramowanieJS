const LSKey = 'cities';
const apiKey = '8a3fb2f55376982bb91a3fd07414d0e7';
const mainCitiesSection = document.getElementById('citiesInfoContainer');
const cityAddBtn = document.getElementById('cityAddBtn');
cityAddBtn.addEventListener('click', GetCityInfo);
function GetCityInfo(){
    const inputCityName = document.getElementById('cityNameInput');
    const nameValue = inputCityName.value;
    GenerateCityWeatherInfo(nameValue);
}
function GenerateCityWeatherInfo(name){
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${apiKey}&units=metric`;
    const apiRequest = fetch(apiUrl);
    apiRequest
        .then(resp=>ParseResponse(resp))
        .then(w => console.log(w));

}
function ParseResponse(resp){
    if(resp.ok)
        return resp.json();
    else
        return Promise.reject('failed to parse response');
}