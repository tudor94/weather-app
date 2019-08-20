const searchInput = document.querySelector("[data-search]");
const searchBox = new google.maps.places.SearchBox(searchInput);
searchBox.addListener("places_changed", () => {
  const place = searchBox.getPlaces()[0];
  if (place == null) return;

  const latitude = place.geometry.location.lat();
  const longitude = place.geometry.location.lng();
  fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude
    })
  })
    .then(res => res.json())
    .then(data => {
      setWeather(data, place.formatted_address);
    });
});

const icon = new Skycons({ color: "#222" })
const statusInput = document.querySelector("[data-status]");
const locationInput = document.querySelector("[data-location]");
const windInput = document.querySelector("[data-wind]");
const temperatureInput = document.querySelector("[data-temperature]");
const precipitationInput = document.querySelector("[data-precipitation]");

function setWeather(data, place) {
  statusInput.textContent = data.summary;
  locationInput.textContent = place;
  windInput.textContent = `${data.windSpeed} m/s`;
  temperatureInput.textContent = `${data.temperature}°C`;
  precipitationInput.textContent = `${data.precipProbability * 100}%`;
  icon.set("icon", data.icon)
  icon.play()
  changeBg(data)
  searchInput.value="";
}

function changeBg(data){
    switch (data.icon) {
        case "rain":
        document.body.style.backgroundImage = 'url("rainy.jpg")';
        break;

        case "clear-day":
        document.body.style.backgroundImage = 'url("sunny.jpg")';
        break;

        case "clear-night":
        document.body.style.backgroundImage = 'url("clearNight.jpg")';
        break;

        case "partly-cloudy-day":
        document.body.style.backgroundImage = 'url("partlyCloudy.jpg")';
        break;

        case "partly-cloudy-night":
        document.body.style.backgroundImage = 'url("cloudyNight.jpg")';
        break;

        case "cloudy":
        document.body.style.backgroundImage = 'url("cloudy.jpg")';
        break;

        case "sleet":
        document.body.style.backgroundImage = 'url("sleet.jpg")';
        break;

        case "snow":
        document.body.style.backgroundImage = 'url("snow.jpg")';
        break;

        case "wind":
        document.body.style.backgroundImage = 'url("wind.jpg")';
        break;

        case "fog":
        document.body.style.backgroundImage = 'url("fog.jpg")';
        break;

        default:
            break;
    }
}