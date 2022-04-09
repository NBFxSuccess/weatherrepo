let searcharea = document.getElementById("textarea");
let cityname = document.getElementById("cityname");
let historyHook = document.getElementById("historyul")
let searchBtn = document.getElementById("search")
let temperature = document.getElementById("temperature")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")

searchBtn.addEventListener("click",searchbtn)
function searchbtn() {

    var apikey = "235541ce3c85d08ad72e7b38fb766a37"
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searcharea.value}&appid=${apikey}`)
    .then(geoResponse => geoResponse.json())
    .then(geoData =>{
        console.log(geoData)
        cityname.innerHTML = geoData[0].name;
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${apikey}`);

    
    })
   
.then(response => response.json())
.then(cityData =>{
    console.log(cityData)
return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityData.city.coord.lat}&lon=${cityData.city.coord.lon}&appid=${apikey}`);

})
.then(response => response.json())
.then(forecastData =>{
    console.log(forecastData)

})
}

