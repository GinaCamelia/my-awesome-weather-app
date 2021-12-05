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

let form = document.querySelector("#search-form");
form.addEventListener("submit", displayCity);


function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(48.2);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 10;
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);


function displayCity(event) {
  event.preventDefault();
  // console.log("cenas");  
  let searchInput = document.querySelector("#search-text-input");
  if (searchInput.value) {
    let units = "metric";
    let key = "baad171896e0c3b36f831a6990f30812";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${key}&units=metric`;
    axios.get(url).then(displayWeather);
    } else {
    searchInput.innerHTML = "";
    alert("Enter a city");
  }
}

function displayWeather(response) {
  console.log(response.data);

  let temperature = `${Math.round(response.data.main.temp)}`;
  let temperatureElement = document.querySelector(".temp");
  temperatureElement.innerHTML = `${temperature}`;

  let iconElement = document.querySelector(".icon");
  iconElement.innerHTML = `${response.data.weather[0].icon}`; 

  let descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = response.data.weather[0].main;

  let cityElement = document.querySelector(".city");
  cityElement.innerHTML = response.data.name;


  let wind = `${Math.round(response.data.wind.speed)}`;
  let showWind = document.querySelector(".wind");
  showWind.innerHTML = `${wind}km/h`;

  let humidity = `${Math.round(response.data.main.humidity)}`;
  let showHumidity = document.querySelector(".humidity");
  showHumidity.innerHTML = `${humidity}%`;

  let maxTemp = `${Math.round(response.data.main.temp_max)}`;
  let showMax = document.querySelector(".feels-like");
  showMax.innerHTML = `${maxTemp}℃`;

}

function currentLocation(position) {
  let latitude = position.coords.latitude;
  console.log(latitude);
  let longitude = position.coords.longitude;
  let key = "baad171896e0c3b36f831a6990f30812";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=${units}`;
  axios.get(url).then(displayWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  //console.log(navigator.geolocation.getCurrentPosition(currentLocation));
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let button = document.querySelector(".btn-success");
button.addEventListener("click", getCurrentPosition);

/*https://github.com/GinaCamelia/my-awesome-weather-app.git*/
