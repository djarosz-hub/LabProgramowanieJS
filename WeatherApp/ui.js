export default class Ui{
    constructor(apiCall,actualCitiesDataFromApiArr){
        this.actualCitiesDataFromApiArr = actualCitiesDataFromApiArr;
        this.apiCall = apiCall;
    }
    GetCityInfoFromInput(){
        const inputCityName = document.getElementById('cityNameInput');
        const nameValue = inputCityName.value;
        if(nameValue !== '' && this.CheckIfCityAlreadyExist(nameValue)){
            console.log(`city ${nameValue} not found in actual data`);
            console.log('cities in actual when checking:');
            console.log(this.actualCitiesDataFromApiArr);
            this.apiCall.CheckIfCityIsSupportedByApi(nameValue);
        }
        inputCityName.value = '';
    }
    CheckIfCityAlreadyExist(cityName){
        const inputNameTrimmed = cityName.trim();
        const inputNameFormatted = inputNameTrimmed.charAt(0).toUpperCase() + inputNameTrimmed.slice(1).toLowerCase();
        console.log(inputNameFormatted);
        console.log(this.actualCitiesDataFromApiArr);
        if(this.actualCitiesDataFromApiArr.some(city => city.name === inputNameFormatted))
            return false;
        return true;
    }
    RenderTimeStamp(){
        const timeStamp = document.getElementById('timeStamp');
        const time = new Date().toLocaleTimeString();
        timeStamp.innerHTML = `Data last refreshed ${time}`;
    }
    RemoveCityBtn(event,citiesOrganizer){
        const icon = event.target;
        const mainCitySection = icon.parentNode.parentNode;
        const cityName = this.FindCityNameToRemoveByBtnClick(mainCitySection);
        citiesOrganizer.RemoveCityFromCityObjectsList(cityName);
        const parent = mainCitySection.parentNode;
        parent.removeChild(mainCitySection);
        citiesOrganizer.ReloadInfo();
    }
    FindCityNameToRemoveByBtnClick(citySection){
        return citySection.childNodes[0].childNodes[0].childNodes[0].innerHTML;
    }


}