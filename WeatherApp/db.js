export default class Db{
    constructor(){
        this.LSKey = 'cities';
    }
    GetCitiesFromLS(cityObjsInLocalStorageArr, ui){
        if(localStorage.getItem(this.LSKey) !== null){
            ui.RenderTimeStamp();
            const citiesFromLS = JSON.parse(localStorage.getItem(this.LSKey));
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
    SynchronizeLS(cityObjsInLocalStorageArr){
        localStorage.setItem(this.LSKey, JSON.stringify(cityObjsInLocalStorageArr));
    }

}