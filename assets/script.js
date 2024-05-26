// const openWeatherUrl = 'https://api.openweathermap.org';
// const weatherAPI = 'f04be44694b5a8d0bf6454eaa0e1646b';

// const input = document.getElementById('input');
// const cityNameInput = document.getElementById('cityNameInput');
// const SubmitBtn = document.getElementById('submitBtn');

// const searchHistory = document.getElementById('searchHistory');

// const cityName = document.getElementById('cityName');
// const dayTime = document.getElementById('dayTime');
// const dayWind = document.getElementById('dayWind');
// const dayHumidity = document.getElementById('dayHumidity');

// const forecast = document.getElementById('forecast');

// dayjs.extend(window.dayjs_plugin_utc);
// dayjs.extend(window.dayjs_plugin_timezone);


// function saveInput () {
//     const cityList = JSON.parse(localStorage.getItem("cityList"));
     
//      const post = {
//         inputValue: inputValue.value.trim(),
//      };
   
//      if(cityList === null){
//          localStorage.setItem("cityList", JSON.stringify([post])); 
//      } else { 
//          cityList.push(post);
       
//          localStorage.setItem("List", JSON.stringify(blogList));
//      }; 
//  };

//   document.addEventListener('DOMContentLoaded', function() {
//     document.querySelector('button').addEventListener('#submitBtn', function(event) {
//         event.preventDefault();
//     })
//   });

  // function cityName() {
  //   const city = document.querySelector('input').value.trim();

  //   if (city === "") {
  //       alert("Please Enter a City!");
  //       return false;
  //   };
  //   return true;
  // };

// document.getElementById('submitBtn').addEventListener('click', function(event) {
//     event.preventDefault();
//     const forecast = getForecastByCity(cityNameInput.value.trim())
//     const coords = getLocationByCity(cityNameInput.value.trim());

// })

// async function getLocationByCity(cityNameInput) {
//     const cityApi = `http://api.openweathermap.org/geo/1.0/direct?q=${cityNameInput}&appid=${weatherAPI}`;
//     const response = await fetch(cityApi);
    

//     const data = response.json();
//     // console.log(data);
//     const coords = {
//         latitude: [0].lat,
//         longitude: [0].lon,
//     };

// }

// async function getForecastByCity(cityName) {
//     const forecastAPI = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${weatherAPI}`;
//     const fResponse = await fetch(forecastAPI);

//     const fData = fResponse.json();
//     console.log(fData);

//     const forecast = {
//         temp: fData.list[0].main.temp,
//         humidity: fData.list[0].main.humidity,
//     }

// }

const weatherApi = 'f04be44694b5a8d0bf6454eaa0e1646b' //this is my API key

document.getElementById('submitBtn').addEventListener('click', function(event) {
    event.preventDefault();

    const city = document.getElementById('cityNameInput').value;
    if (city) {
        current(city);
        forecast(city);
    } else {
      (cityNameInput === "") 
        alert("Please search for a city!");  
    }
})
//Calls api information for the current weather
function current(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}`, {
}) 
  .then(function (response) {
      return response.json();
  })
  .then(function (data) {

    currentData = {
        name: data.name,
        icon: data.weather[0].icon,
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed
    }
    console.log(currentData);
  }) 
}
// calls api information for the forecast
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
            // console.log(data);
            console.log(forecastData);
        }
    })
}

function showHistory() {
  let retrivedHistory = localStorage.getItem("searchHistory")
  ? JSON.parse(localStorage.getItem("searchHistory"))
  : [];
  for (let i = 0; i < 5; i++) {
    if (retrivedHistory[i != null]) {
      previousSearch = $("<button>")
      .val(retrivedHistory[i])
      .text(retrivedHistory[i])
      .attr({
        class: "submitBtn previous-search",
        type: "submit",
      });
      $(".list-group").append(previousSearch);
    }
  }
}

showHistory();

previousSearchButtons = (".previous-search");
previousSearchButtons.on("click", function (event) {
  event.preventDefault();
  today.empty();
  today.attr("class", "");
  forecast.empty();
  let previousCity = $(this).val();
  let 
})


