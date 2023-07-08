// Set HTML Time
let currentDate = new Date();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = weekDays[currentDate.getDay()];
let hour = currentDate.getHours();
let minute = currentDate.getMinutes();
let time = document.querySelector(".date");
time.innerHTML = `${day} ${hour}:${minute}`;

// Event Listeneres
document.querySelector("#form").addEventListener("submit", submit);
document.querySelector("#fahrent").addEventListener("click", fahrenheit);
document.querySelector("#celcius").addEventListener("click", toCelcius);

// Global Level
let apiResponse = null;
let isCelcius = true;
let isFahrenheit = true; 

async function submit(event) {

  event.preventDefault();

  let city = document.querySelector("#searchBox").value;
  let title = document.querySelector(".cityName");
  title.innerHTML = city;

  let apiQueryParameteres = `?q=${city}&appid=951e20550a3fc8795f3acb7023acf0b9&units=metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather${apiQueryParameteres}`;
  
  console.log(apiUrl)

   apiResponse = await axios.get(apiUrl).then(res => res.data);

  showTemp(apiResponse.main.temp);
  showWind(apiResponse.wind.speed);
  showFeelsLike(apiResponse.main.feels_like);
  showWeather(apiResponse.weather[0].description);
  showIcon(apiResponse.weather[0].icon);
}

function showTemp(temp) {
  
  let h2 = document.querySelector("#mainTemp");
  h2.innerHTML = Math.round(temp);
  
}

function showWind(windSpeed){

  let h3 = document.querySelector("#windSpeed");
  h3.innerHTML =  `wind: ${Math.round(windSpeed)} km/h`;
 
}

function showFeelsLike(feelsLike){

  let h3 = document.querySelector("#feelsLike");
  h3.innerHTML =   `feels like: ${Math.round(feelsLike)} °C`;
 
}
 
function fahrenheit(event){
  event.preventDefault();
  let fahrentElement = Math.round(( apiResponse.main.temp * 9/5) + 32 );
  
  let h3 = document.querySelector("#mainTemp");
  h3.innerHTML = fahrentElement;
}
// function convertTempUnit(event){
//   if(isCelcius){
//     document.querySelector("#mainTemp").innerHTML = Math.round(apiResponse.main.temp);
//     isCelcius = false;
//     return;
//   }

//   event.preventDefault();
//   let fahrent = Math.round(( apiResponse.main.temp * 9/5) + 32 );
//   document.querySelector("#mainTemp").innerHTML = fahrent;
//   isCelcius = true;
// }

function showWeather(weather){
  
  let weatherDescription = document.querySelector(".weatherDes");
  weatherDescription.innerHTML = weather;
}
function showIcon(icon){
let weatherIcon = document.querySelector("#icon");

weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);
}

function toCelcius(event){
  event.preventDefault();
  let h2 = document.querySelector("#mainTemp");
  h2.innerHTML = Math.round(apiResponse.main.temp);
}