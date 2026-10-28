
const APIKEY="3f37b86cd96044e3b77233303262710";
const URL="https://api.weatherapi.com/v1/forecast.json";

const cityInput = document.querySelector('.city_input');
const searchBtn = document.querySelector('.btn');  
const forecastCard = document.querySelectorAll('.forecast');
let weatherData;
//searchBtn
searchBtn.addEventListener ('click', () =>{
    searchCity();
});

cityInput.addEventListener('keyup', (e)=>{

    if (e.key == "Enter") {
        searchCity();}
    });
function searchCity(){
    const city = cityInput.value.trim();
        if(cityInput.value.trim() != ''){
            checkWeather(city);
            cityInput.value = '';
            cityInput.blur();
        }
    }

async function checkWeather(city = "calgary"){

    const res = await fetch(`${URL}?key=${APIKEY}&q=${city}&days=3`);

    let data = await res.json();

    weatherData = data;
   



//current weather
     document.querySelector('.city').textContent = data.location.name;

    document.querySelector('.temp').textContent  = Math.floor(data.current.temp_c) + '°C';

    document.querySelector('.humidity').textContent = (data.current.humidity) + '+';

    document.querySelector('.wind').textContent  = (data.current.wind_kph) + 'Km/ph'; 

    document.querySelector('.weather-icon').src = 'https:' + data.current.condition.icon;  

//forecast

const forecastCards = document.querySelectorAll(".forecast");

data.forecast.forecastday.forEach((day, index) => {

    const card = forecastCards[index];

    card.querySelector(".forecast-date").textContent = new Date(day.date).toLocaleDateString("en-US", {weekday: "long", timeZone: "UTC"});

    card.querySelector(".forecast-temp").textContent =
        Math.floor(day.day.avgtemp_c) + "°C";

    card.querySelector(".forecast-icon").src =
        "https:" + day.day.condition.icon;

});

//toggle 
document.querySelector(".celsius").addEventListener("click", () => {
    if(weatherData) {
        document.querySelector(".temp").textContent =
         Math.floor(weatherData.current.temp_c) + "°C";
    }
});

document.querySelector(".fahrenheit").addEventListener("click", () => {
    if(weatherData){
        document.querySelector(".temp").textContent =
            Math.floor(weatherData.current.temp_f) + "°F";
    }
})};
checkWeather();