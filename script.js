let appid = '157ffc0bc9b08400d2de8a8849b97fab';
let units = 'metric';
let searchmethod;//it is the letter 'q' when searching by city name

function getSearchMethod(searchTerm){
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
       searchmethod='zip';
    else
       searchmethod='q'; 
}
function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchmethod}=${searchTerm}&appid=${appid}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        check(result);
    })//takes the url of where to get api from
      
}

function check(resultFromServer){
    if(resultFromServer.cod === '404'){
        checkValidityOfCity(resultFromServer);
    }else{
        init(resultFromServer);
    }
}

function init(resultFromServer){
   //console.log(resultFromServer);
   let locationName = document.getElementById('location-name');
   let description = document.getElementById('description');
   let windSpeed = document.getElementById('wind-speed');
   let temperature = document.getElementById('temperature');
   let humidity = document.getElementById('humidity'); 
   let icon = document.getElementById('icon');

   //checkValidityOfCity(resultFromServer);

   icon.src = 'https://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png';
   //console.log(icon.src);
   

   let resultDescription = resultFromServer.weather[0].description;
   description.innerText = resultDescription//.CaretPosition(0).toUpperCase() + resultDescription.slice(1)

   

   let nameOfLocation = resultFromServer.name;
   locationName.innerText = nameOfLocation;

   let speedOfWind = resultFromServer.wind.speed;
   windSpeed.innerText = speedOfWind;

   let temperatureOfWeather = resultFromServer.main.temp;
   temperature.innerText = temperatureOfWeather;
   
   let humidityOfWeather = resultFromServer.main.humidity;
   humidity.innerText = humidityOfWeather;
}

function checkValidityOfCity(resultFromServer){
    let locationName = document.getElementById('location-name');
    let errorMessage = 'Please enter a valid city e.g Lagos or zip code';
    locationName.innerText = errorMessage; 

    let edescription = document.getElementById('description');
    let ewindSpeed = document.getElementById('wind-speed');
    let etemperature = document.getElementById('temperature');
    let ehumidity = document.getElementById('humidity');

    let errorDescription = '';
    edescription.innerText = errorDescription;

    let errorWindSpeed = '';
    ewindSpeed.innerText = errorWindSpeed;
    
    let errorTemperature = '';
    etemperature.innerText = errorTemperature;

    let errorHumidity = '';
    ehumidity.innerText = errorHumidity;

      //console.log('invalid city');
}

document.getElementById('search-btn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchinput').value;
    if(searchTerm)
    searchWeather(searchTerm);
})

