
// Create a "close" button and append it to each list item
let myNodelist = document.getElementsByTagName("LI");
for (let i = 0; i < myNodelist.length; i++) {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}
// Click on a close button to hide the current list item
// let close = document.getElementsByClassName("close");
// for (let i = 0; i < close.length; i++) {
//     close[i].onclick = function () {
//         let div = this.parentElement;
//         div.style.display = "none";
//     }
// }

let close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        let div = this.parentElement;
        remove(div)
    }
}

function remove(el) {
    let element = el;
    element.remove()
}

// // Add a "checked" symbol when clicking on a list item
// let list = document.querySelector('ul');
// list.addEventListener('click', function (ev) {
//     if (ev.target.tagName === 'LI') {
//         ev.target.classList.toggle('checked');
//     }
// }, false);


function newElement() {
    let input = document.createElement("input");
    input.setAttribute("type", "text")
    input.setAttribute("name", "task")
    input.setAttribute("class", "form-control")
    document.getElementById("myUL").appendChild(input);

}



// Dark Sky Forecaster Integration
// Basic API Call URL:
// https://api.darksky.net/forecast/c091c8ff8c07a5b4ffebf5621ce1310d/latitude,longitude

const fetch = require('node-fetch')

let latitude = 0;
let longitude = 0;


// getLocation is used in conjunction with getCoordinates to acquire and set the longitude and latitude of the client.
async function getLocation() {
    // geolocation requires a function call separate from itself to find/set the coordinates.  This function is getCoordinates.
    if (navigator.geolocation) {
        let coordinates = navigator.geolocation.getCurrentPosition(getCoordinates);
      }
    else {
        alert("Geolocation is not supported by this browser.");
      }
}


// getCoordinates finds and sets the longitude and latitude variables accodring the geolocation data of the current client.
function getCoordinates(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    //alert('Latitude: ' + latitude + ', Longitude: ' + longitude)
}


// displayDailyForecast fetches weather data from DarkSky for the current day and displays it as text at the element with input ID.
async function displayDailyForecast(displayID) {
  getForecast();
  let currentDate = new Date();
  let currentTime = currentDate.getTime();
  apiURL = "https://api.darksky.net/forecast/c091c8ff8c07a5b4ffebf5621ce1310d/" + String(latitude) + ',' + String(longitude) + ',' + String(currentTime);
  
  const darkskyResponse = await fetch(apiURL);
  const forecast = await darkskyResponse.json();
  let weather = forecast['daily']['data'][0]['icon'];

  displayElement = document.getElementById(displayID);
  displayElement.innerText = weather;
}


// createWeeklyForecast iterates from the current day through the week and constructs an array resprenting the weather forcast.
async function createWeeklyForecast() {
  getForecast();
  let weeklyForecast = []
  
  for (let day = 0; day < 7; day++) {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + day);
    let currentTime = currentDate.getTime();

    apiURL = "https://api.darksky.net/forecast/c091c8ff8c07a5b4ffebf5621ce1310d/" + String(latitude) + ',' + String(longitude) + ',' + String(currentTime); 
    const darkskyResponse = await fetch(apiURL);
    const forecast = await darkskyResponse.json();
    let weather = forecast['daily']['data'][0]['icon'];

    //let formattedCurrentDate = String(currentDate.getFullYear()) + String(currentDate.getMonth()) + String(currentDate.getDate());

    weeklyForecast.append(weather);
  }
  return weeklyForecast
}


// displayWeeklyForecast creates and appends images representing the coming week's weather at the input ID.
function displayWeeklyForecast(displayID) {
  let forecast = createWeeklyForecast();
  let baseID = 'weatherIMG';
  
  for (let day = 0; day < 7; day++) {
    let currentElement = document.createElement('img');
    currentElement.id = baseID + String(day);
    currentElement.src = 'images/' + forecast[day] + '.png';
    currentElement.alt = forecast[day];
    document.getElementById(displayID).appendChild(currentElement);
  }
  
  // The DarkSky API contains a key: 'icon' which is a quick reference for weather.
  // The available weather conditions are:
  // 
  // clear-day
  // clear-night
  // rain
  // snow
  // sleet
  // wind
  // fog
  // cloudy
  // partly-cloudy-day
  // partly-cloudy-night

}
