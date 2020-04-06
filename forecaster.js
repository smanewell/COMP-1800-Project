const fetch = require('node-fetch')

async function getForecast() {

    if (navigator.geolocation) {
        let coordinates = navigator.geolocation.getCurrentPosition(getCoordinates);
      }
    else {
        alert("Geolocation is not supported by this browser.");
      }
}


async function getCoordinates(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    //alert('Latitude: ' + latitude + ', Longitude: ' + longitude)
    apiURL = "https://api.darksky.net/forecast/c091c8ff8c07a5b4ffebf5621ce1310d/" + latitude + ',' + longitude;
    const darkskyResponse = await fetch(apiURL);
    const forecast = await darkskyResponse.json();
}

async function displayWeeklyForecast(divisionID) {
  await getForecast();
  displayElement = document.getElementById(divisionID);
  console.log(forecast);

}

// https://api.darksky.net/forecast/c091c8ff8c07a5b4ffebf5621ce1310d/latitude,longitude