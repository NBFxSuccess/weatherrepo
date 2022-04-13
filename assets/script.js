// Delcaring too many variables... Will possibly refactor if I can figure out how 🤷‍♂️
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
let searchHistoryButtons = document.getElementsByClassName("muchwow");
const now = moment();
const icons = ["",firstIcon,secondIcon,thirdIcon,fourthIcon,fifthIcon];
searchBtn.addEventListener("click",searchbtn)
currentIcon.hidden = true;

const dates = ["",firstDayEl,secondDayEl,thirdDayEl,fourthDayEl,fifthDayEl];
for (let i = 1; i <= 5; i++) {
    icons[i].hidden = true;
    dates[i].innerText = now.add(1, 'days').format('l');
    

}

for (let i = 0; i < searchHistoryButtons.length; i++) {
    searchHistoryButtons[i].addEventListener('click', function() {
        console.log("added");
    }, false);
    }
    

function writeAndCallHistory() {
    let createHistory = document.createElement("button");
    createHistory.addEventListener("click",function() {
        searcharea.value = this.innerText;
        searchbtn();
    });
    let history = document.getElementById("searchhistory");
    createHistory.textContent = searcharea.value;
    if (searcharea.value == "") {
        createHistory.textContent = "Invalid";
    }
    createHistory.classList.add("btn");
    createHistory.classList.add("btn-success");
    createHistory.classList.add("m-1");
    createHistory.classList.add("muchwow");

    history.prepend(createHistory)

}
function searchbtn(event) {
    writeAndCallHistory();
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
.then(forecastData =>
{
    let currentIconCode = `${forecastData.current.weather[0].icon}`;
    let currentIconUrl = `http://openweathermap.org/img/wn/${currentIconCode}@2x.png`;
    currentIcon.setAttribute("src",currentIconUrl)
    currentIcon.hidden = false;
    console.log(forecastData)
    

    const humudities = ["",firstHumidityEl,secondHumidityEl,thirdHumidityEl,fourthHumidityEl,fifthHumidityEl];
    const winds = ["",firstWindEl,secondWindEl,thirdWindEl,fourthWindEl,fifthWindEl]
    const temps = ["",firstDayTempEl,secondDayTempEl,thirdDayTempEl,fourthDayTempEl,fifthDayTempEl]

    for (let i = 1; i <= 5; i++)
    {
        icons[i].setAttribute("src", `http://openweathermap.org/img/wn/${forecastData.daily[i].weather[0].icon}@2x.png`)
        winds[i].innerHTML = "Wind:" + forecastData.daily[i].wind_speed + "MPH"
        humudities[i].innerHTML = "Humidity:" + forecastData.daily[i].humidity + "%";
        temps[i].innerHTML = "Temp:" + Math.round((1.8*(forecastData.daily[i].temp.day - 273) + 32) * 100)/100 + "°F";
        icons[i].hidden = false;
    }

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