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
   } else {
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
        forecastData = {
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













// function showHistory() {
//   let retrivedHistory = localStorage.getItem("searchHistory")
//   ? JSON.parse(localStorage.getItem("searchHistory"))
//   : [];
//   for (let i = 0; i < 5; i++) {
//     if (retrivedHistory[i != null]) {
//       previousSearch = $("<button>")
//       .val(retrivedHistory[i])
//       .text(retrivedHistory[i])
//       .attr({
//         class: "submitBtn previous-search",
//         type: "submit",
//       });
//       $(".list-group").append(previousSearch);
//     }
//   }
// }

// showHistory();

// previousSearchButtons = (".previous-search");
// previousSearchButtons.on("click", function (event) {
//   event.preventDefault();
//   today.empty();
//   today.attr("class", "");
//   forecast.empty();
//   let previousCity = $(this).val();
//   let 
// })


