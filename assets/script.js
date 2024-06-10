const weatherApi = '6133ca97111cde17d4a3ace8c5df4e43' //this is my API key
const cardsContainer = document.getElementById('card');
const todayContainer = document.getElementById('current');
const forcastContainer = document.getElementById('forecast');
const searchHistory = document.getElementById('historyList');



const date = dayjs().format('M/D/YYYY');


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
     (cityNameInput === "")
     alert('Please Enter City Name!');
   }
  })

  function addCityToHistory(city) {
    const historyList = document.getElementById('history-list');
    const cityItem = document.createElement('li');
    const cityLink = document.createElement('a');

    cityItem.classList.add('list-group-item');
    cityLink.href = '#'
    cityItem.textContent = city;
    cityLink.addEventListener('click', function (event) {
      event.preventDefault();
      current(city);
      forecast(city);
    });
      
      historyList.appendChild(cityItem);
      cityItem.appendChild(cityLink)
  }
    
//function to save to local 

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

document.addEventListener('DOMContentLoaded', loadCities);


//the current weather information 
function current(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}&units=imperial`, {
}) 
  .then(function(response) {
    return response.json();
})
  .then(function(data) {

    let currentData = {
        name: data.name,
        date: data.main.date,
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        icon: data.weather[0].icon
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

//cards for current forcast
function currentCard(currentData) {
  console.log("inside currentCard function", currentData);
  const currentArea = document.getElementById('currentArea')
  const nameEl = document.createElement('h3');
  const tempEl = document.createElement('ul');
  const windEl = document.createElement('ul');
  const humidityEl = document.createElement('ul');
  const iconEl = document.createElement('img');
  console.log('current data name', currentData.name);

  nameEl.innerText = currentData.name;
  tempEl.innerText = currentData.temp + '°F';
  windEl.textContent = currentData.wind + 'MPH';
  humidityEl.textContent = currentData.humidity + '%';
  iconEl.src = `http://openweathermap.org/img/w/${currentData.icon}.png`

  
  nameEl.append(tempEl);
  nameEl.append(windEl);
  nameEl.append(humidityEl);
  nameEl.append(iconEl);
  currentArea.append(nameEl);
}

//cards for 5 day forecast
function forecastCard(forecastData) {
  console.log("inside forecastCard function", forecastData);
  const forecastArea = document.getElementById('forecastArea')
  const dateEl = document.createElement('h3');
  const tempEl = document.createElement('ul');
  const windEl = document.createElement('ul');
  const humidityEl = document.createElement('ul');
  const iconEl = document.createElement('img');
 

  dateEl.innerText = forecastData.date;
  tempEl.innerText = forecastData.temp + '°F';
  windEl.textContent = forecastData.wind + 'MPH';
  humidityEl.textContent = forecastData.humidity + '%';
  iconEl.src = `http://openweathermap.org/img/w/${forecastData.icon}.png`

  dateEl.append(tempEl);
  dateEl.append(windEl);
  dateEl.append(humidityEl);
  dateEl.append(iconEl);
  forecastArea.append(dateEl);
}


// function showHistory(historyList) {
//   fetch(`http://api.openweathermap.org/data/2.5/forecast/?q=${city}&appid=${weatherApi}&units=imperial`, {

//   })
//     .then(function (response){
//       return response.json();
//     })
// }
// document.getElementById('submitBtn').addEventListener('click', function(event) {
//   event.preventDefault();

//   const city = document.getElementById('historyList').value;
//   if (city) {
//     addCityToHistory(city);
//     saveToLocal(city);
//     current(city);
//     forecast(city); 
//    } 