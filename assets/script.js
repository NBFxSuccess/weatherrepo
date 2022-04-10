// Delcaring too many variables.
let searcharea = document.getElementById("textarea");
let firstDayTempEl = document.getElementById("firstdaytemp");
let secondDayTempEl = document.getElementById("seconddaytemp");
let thirdDayTempEl = document.getElementById("thirddaytemp");
let fourthDayTempEl = document.getElementById("fourthdaytemp");
let fifthDayTempEl = document.getElementById("fifthdaytemp");
let firstHumidityEl = document.getElementById("firstdayhumidity")
let secondHumidityEl = document.getElementById("seconddayhumidity")
let thirdHumidityEl = document.getElementById("thirddayhumidity")
let fourthHumidityEl = document.getElementById("fourthdayhumidity")
let fifthHumidityEl = document.getElementById("fifthdayhumidity")
let firstWindEl = document.getElementById("firstdaywind");
let secondWindEl = document.getElementById("seconddaywind");
let thirdWindEl = document.getElementById("thirddaywind");
let fourthWindEl = document.getElementById("fourthdaywind");
let fifthWindEl = document.getElementById("fifthdaywind");
let firstDayEl = document.getElementById("firstday");
let secondDayEl = document.getElementById("secondday");
let thirdDayEl = document.getElementById("thirdday");
let fourthDayEl = document.getElementById("fourthday");
let fifthDayEl = document.getElementById("fifthday");
let currentIcon = document.getElementById("currenticon");
let firstIcon = document.getElementById("firsticon");
let secondIcon = document.getElementById("secondicon");
let thirdIcon = document.getElementById("thirdicon");
let fourthIcon = document.getElementById("fourthicon");
let fifthIcon = document.getElementById("fifthicon");
let cityname = document.getElementById("cityname");

let searchBtn = document.getElementById("search")
let temperature = document.getElementById("temperature")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let uvIndex = document.getElementById("uvindex")
let currentDate = moment().format('l')
const now = moment();
firstDayEl.innerText = now.add(1, 'days').format('L');
secondDayEl.innerText = now.add(1, 'days').format('L');
thirdDayEl.innerText = now.add(1, 'days').format('L');
fourthDayEl.innerText = now.add(1, 'days').format('L');
fifthDayEl.innerText = now.add(1, 'days').format('L');
searchBtn.addEventListener("click",searchbtn)
currentIcon.hidden = true;
firstIcon.hidden = true;
secondIcon.hidden = true;
thirdIcon.hidden = true;
fourthIcon.hidden = true;
fifthIcon.hidden = true;
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

    let firstDayCode = `${cityData.list[1].weather[0].icon}`;
    let firstDayUrl = `http://openweathermap.org/img/wn/${firstDayCode}@2x.png`;
    let secondDayCode = `${cityData.list[2].weather[0].icon}`;
    let secondDayUrl = `http://openweathermap.org/img/wn/${secondDayCode}@2x.png`;
    let thirdDayCode = `${cityData.list[3].weather[0].icon}`;
    let thirdDayUrl = `http://openweathermap.org/img/wn/${thirdDayCode}@2x.png`;
    let fourthDayCode = `${cityData.list[4].weather[0].icon}`;
    let fourthDayUrl = `http://openweathermap.org/img/wn/${fourthDayCode}@2x.png`;
    let fifthDayCode = `${cityData.list[5].weather[0].icon}`;
    let fifthDayUrl = `http://openweathermap.org/img/wn/${fifthDayCode}@2x.png`;
    firstIcon.setAttribute("src",firstDayUrl)
    secondIcon.setAttribute("src",secondDayUrl)
    thirdIcon.setAttribute("src",thirdDayUrl)
    fourthIcon.setAttribute("src",fourthDayUrl)
    fifthIcon.setAttribute("src",fifthDayUrl)


return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityData.city.coord.lat}&lon=${cityData.city.coord.lon}&appid=${apikey}`);
})
.then(response => response.json())
.then(forecastData =>{
    let currentIconCode = `${forecastData.current.weather[0].icon}`;
    let currentIconUrl = `http://openweathermap.org/img/wn/${currentIconCode}@2x.png`;
    let firstIconCode = `${forecastData.current.weather[0].icon}`;
    let firstIconCodeUrl = `http://openweathermap.org/img/wn/${currentIconCode}@2x.png`;
    currentIcon.setAttribute("src",currentIconUrl)
    currentIcon.hidden = false;
    firstIcon.hidden = false;
    secondIcon.hidden = false;
    thirdIcon.hidden = false;
    fourthIcon.hidden = false;
    fifthIcon.hidden = false;
    console.log(forecastData)
    firstHumidityEl.innerHTML = "Humidity:" + forecastData.daily[1].humidity + "%";
    secondHumidityEl.innerHTML = "Humidity:" + forecastData.daily[2].humidity + "%";
    thirdHumidityEl.innerHTML = "Humidity:" + forecastData.daily[3].humidity + "%";
    fourthHumidityEl.innerHTML = "Humidity:" + forecastData.daily[4].humidity + "%";
    fifthHumidityEl.innerHTML = "Humidity:" + forecastData.daily[5].humidity + "%";
    firstWindEl.innerHTML = "Wind:" + forecastData.daily[1].wind_speed + "MPH"
    secondWindEl.innerHTML = "Wind:" + forecastData.daily[2].wind_speed + "MPH"
    thirdWindEl.innerHTML = "Wind:" + forecastData.daily[3].wind_speed + "MPH"
    fourthWindEl.innerHTML = "Wind:" + forecastData.daily[4].wind_speed + "MPH"
    fifthWindEl.innerHTML = "Wind:" + forecastData.daily[5].wind_speed + "MPH"
    firstDayTempEl.innerHTML = "Temp:" + Math.round((1.8*(forecastData.daily[1].temp.day - 273) + 32) * 100)/100 + "°F";
    secondDayTempEl.innerHTML = "Temp:" + Math.round((1.8*(forecastData.daily[2].temp.day - 273) + 32) * 100)/100 + "°F";
    thirdDayTempEl.innerHTML = "Temp:" + Math.round((1.8*(forecastData.daily[3].temp.day - 273) + 32) * 100)/100 + "°F";
    fourthDayTempEl.innerHTML = "Temp:" + Math.round((1.8*(forecastData.daily[4].temp.day - 273) + 32) * 100)/100 + "°F";
    fifthDayTempEl.innerHTML = "Temp:" + Math.round((1.8*(forecastData.daily[3].temp.day - 273) + 32) * 100)/100 + "°F";
    temperature.innerHTML = "Temp: " + Math.round((1.8*(forecastData.current.temp - 273) + 32) * 100)/100 + "°F";
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