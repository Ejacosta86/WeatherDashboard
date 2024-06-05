const weatherApi = '6133ca97111cde17d4a3ace8c5df4e43' //this is my API key
const cardsContainer = document.getElementById('card');
const todayContainer = document.getElementById('current');
const forcastHeader = document.getElementById('forecast');



document.getElementById('submitBtn').addEventListener('click', function(event) {
  event.preventDefault();

  const city = document.getElementById('cityNameInput').value;
  if (city) {
    addCityToHistory(city);
    saveToLocal(city);
    current(city);
    forecast(city); 
   } 
   else {
     (cityNameInput === "");
     alert('Please Enter City Name!')
   }
  })

  function addCityToHistory(city) {
    const historyList = document.getElementById('history-list');
    const cityItem = document.createElement('li');
    const cityLink = document.createElement('a');

    cityItem.classList.add('list-group-item');
    cityLink.href = '#'
    cityItem.textContent = city;
    cityLink.addEventListener('click', function (event){
      event.preventDefault();
      current(city);
      forecast(city);
    });
      historyList.appendChild(cityItem);
      cityItem.appendChild(cityLink);
  }
    
//need function to save to local 

  function saveToLocal(city) {
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    if (!cities.includes(city)) {
      cities.push(city);
      localStorage.setItem('cities', JSON.stringify(cities));
    }
  }

  function loadCities() {
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    cities.forEach(function(city){
      addCityToHistory(city);
    })
  }

document.addEventListener ('DOMContentLoaded', loadCities);


//the current weather information 
function current(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}`, {
}) 
  .then(function (response) {
    return response.json();
})
  .then(function (data) {

    let currentData = {
        name: data.name,
        icon: data.weather[0].icon,
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed
    }
        currentCard(currentData);
}) 
}
// calls the forecast
function forecast(city) {
  fetch(`http://api.openweathermap.org/data/2.5/forecast/?q=${city}&appid=${weatherApi}`, {
        
})
  .then(function (response) {
      return response.json();
        
})
  .then(function (data) {
    for (let i = 0; i <= 32; i += 8) {
      let forecastData = {
          date: data.list[i].dt_txt,
          temp: data.list[i].main.temp,
          humidity: data.list[i].main.humidity,
          wind: data.list[i].wind.speed,
          icon: data.list[i].weather[0].icon
      }
          
        forecastCard(forecastData);
      }
    })
}


//cards for forcast
function currentCard(currentData) {
  console.log("inside currentCard function", currentData);
  const currentArea = document.getElementById('currentArea')
  const nameEl = document.createElement('h3');
  const tempEl = document.createElement('li');
  const windEl = document.createElement('li');
  const humidityEl = document.createElement('li');
  const iconEl = document.createElement('img');
  console.log('current data name', currentData.name);

  nameEl.innerText = currentData.name;
  tempEl.innerText = currentData.temp + '°F';
  windEl.textContent = currentData.wind + 'MPH';
  iconEl.src = `http://openweathermap.org/img/w/${currentData.icon}.png`

  nameEl.append(tempEl);
  nameEl.append(windEl);
  nameEl.append(humidityEl);
  nameEl.append(iconEl);
  currentArea.append(nameEl);
}


function forecastCard(forecastData) {
  console.log("inside forecastCard function", forecastData);
  const forecastArea = document.getElementById('forecastArea')
  const dateEl = document.createElement('h3');
  const tempEl = document.createElement('li');
  const windEl = document.createElement('li');
  const humidityEl = document.createElement('li');
  const iconEl = document.createElement('img');
  console.log('current data name', forecastData.name);

  dateEl.innerText = forecastData.name;
  tempEl.innerText = forecastData.temp + '°F';
  windEl.textContent = forecastData.wind + 'MPH';
  iconEl.src = `http://openweathermap.org/img/w/${forecastData.icon}.png`

  dateEl.append(tempEl);
  dateEl.append(windEl);
  dateEl.append(humidityEl);
  dateEl.append(iconEl);
  forecastArea.append(dateEl);
}

