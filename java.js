let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thur",
  "Fri",
  "Sat"
];

let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();

let dateElement = document.querySelector(".day");
dateElement.innerHTML = `${day}, ${month} ${date}, ${year}; ${hours}:${minutes}`;

function formatDay(timestamp) {

  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}


function displayForecast(response) {
  let forecast = response.data.daily;

let forecastElement = document.querySelector("#forecast");


let forecastHTML = `<div class="row">`;
forecast.forEach(function(forecastDay, index) {
  if (index < 6) {
  forecastHTML = forecastHTML + 
  `
  <div class="col-2">
  <div class="card border-info mb-3" style="max-width: 18rem;">
     <div class="card-header">${formatDay(forecastDay.dt)}</div>
        <div class="card-body">
        <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
        alt=""
        width="48"
        />
        <div class="card-text">
          <span class="temp-min">${Math.round(forecastDay.temp.max)}°</span>
          <span class="temp-max">${Math.round(forecastDay.temp.min)}°</span>
        </div>
      </div>
    </div>
  </div>
  `;
  }
})
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
console.log(coordinates);
let apiKey = "baad171896e0c3b36f831a6990f30812";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?
lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
console.log(apiUrl);

axios.get(apiUrl).then(displayForecast);
}


function displayWeather(response) {
  console.log(response.data);

  celsiusTemperature = response.data.main.temp;

  let temperature = `${Math.round(response.data.main.temp)}`;
  let temperatureElement = document.querySelector(".temp");
  temperatureElement.innerHTML = `${temperature}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = response.data.weather[0].main;

  let cityElement = document.querySelector(".city");
  cityElement.innerHTML = response.data.name;


  let wind = `${Math.round(response.data.wind.speed)}`;
  let showWind = document.querySelector(".wind");
  showWind.innerHTML = `${wind} km/h`;

  let humidity = `${Math.round(response.data.main.humidity)}`;
  let showHumidity = document.querySelector(".humidity");
  showHumidity.innerHTML = `${humidity}%`;

  let maxTemp = `${Math.round(response.data.main.temp_max)}`;
  let showMax = document.querySelector(".feels-like");
  showMax.innerHTML = `${maxTemp}°`;
  
getForecast(response.data.coord);
}

function displayCity(city) {
  if (city) {
    let units = "metric";
    let key = "baad171896e0c3b36f831a6990f30812";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;
    axios.get(url).then(displayWeather);
  } else {
    let searchInput = document.querySelector("#search-text-input");
    searchInput.innerHTML = "";
    alert("Enter a city");
  }
}
function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  displayCity(searchInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


function currentLocation(position) {
  let latitude = position.coords.latitude;
  console.log(latitude);
  let longitude = position.coords.longitude;
  let key = "baad171896e0c3b36f831a6990f30812";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?
  lat=${latitude}&lon=${longitude}&appid=${key}&units=${metric}`;
  axios.get(url).then(displayWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let button = document.querySelector(".btn-light");
button.addEventListener("click", getCurrentPosition);