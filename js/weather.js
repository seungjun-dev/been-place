const API_KEY="#";
const COORDS="coords";

function getWeather(lat, lng) {

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`
    )
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        let tempK = json.main.temp;
        const tempC = (tempK-273.15).toFixed(1);
        console.log(json);
        console.log(tempC+"°C");
        let cityName = (json.name).replace("-si","");
        cityName = cityName.replace(/^./, cityName[0].toUpperCase());
        let weatherDesc = json.weather[0].description;
        weatherDesc = weatherDesc.replace(/^./, weatherDesc[0].toUpperCase());
        document.getElementById("name").innerText = cityName;
        document.getElementById("temp").innerText = tempC+"°C";
        document.getElementById("desc").innerHTML = weatherDesc;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    alert("Sorry, cannot load weather information!");
}

function askLocation() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function checkLocation() {
    navigator.geolocation.getCurrentPosition();
}

function loadCoords() {
    const geolocation = localStorage.getItem(COORDS);
    if(geolocation === null) {
        askLocation();
    } else {
        const parseCoords = JSON.parse(geolocation);
        getWeather(parseCoords.latitude, parseCoords.longitude);
        console.log(parseCoords);
    }
}

function init() {
    loadCoords();
}

init();