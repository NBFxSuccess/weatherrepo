let searcharea = document.getElementById("textarea");
let currentIcon = document.getElementById("currenticon");
let cityname = document.getElementById("cityname");
let historyHook = document.getElementById("historyul")
let searchBtn = document.getElementById("search")
let temperature = document.getElementById("temperature")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let uvIndex = document.getElementById("uvindex")
let currentDate = moment().format('l')
searchBtn.addEventListener("click",searchbtn)
currentIcon.hidden = true;
function searchbtn() {
    var apikey = "235541ce3c85d08ad72e7b38fb766a37"
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searcharea.value}&appid=${apikey}`)
    .then(geoResponse => geoResponse.json())
    .then(geoData =>{
        console.log(geoData)
        cityname.innerHTML = geoData[0].name + " (" + currentDate + ")";
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${apikey}`);
    })
.then(response => response.json())
.then(cityData =>{
    console.log(cityData)
return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityData.city.coord.lat}&lon=${cityData.city.coord.lon}&appid=${apikey}`);
})
.then(response => response.json())
.then(forecastData =>{
    let currentIconCode = `${forecastData.current.weather[0].icon}`;
    let currentIconUrl = `http://openweathermap.org/img/wn/${currentIconCode}@2x.png`;
    currentIcon.setAttribute("src",currentIconUrl)
    currentIcon.hidden = false;
    console.log(forecastData)
    let tempConverted = 1.8*(forecastData.current.temp - 273) + 32
    temperature.innerHTML = "Temperature: " + Math.round(tempConverted * 100)/100 + "°F";
    humidity.innerHTML = "Humidity: " + forecastData.current.humidity + "%";
    uvIndex.innerHTML = "UV Index: " + forecastData.current.uvi;
    wind.innerHTML = "Wind: " + forecastData.current.wind_speed + "MPH";
})

}
// Depreciated code
searcharea.addEventListener("keyup", function(event) {
if (event.keyCode === 13) {
    event.preventDefault();
    searchBtn.click();
}
});