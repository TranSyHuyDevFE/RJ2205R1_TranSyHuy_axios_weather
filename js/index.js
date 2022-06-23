const Key_Api = "558db73e706248a926248f6e135d7472";
const Default_values = "--";
const searchInput = document.querySelector("#search-input");

const cityName = document.querySelector(".city-name");
const weatherState = document.querySelector(".weather-state");
const weatherIcon = document.querySelector(".weather-icon");
const temperaTure = document.querySelector(".temperature");

const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind-speed");
searchInput.addEventListener("change", (e) => {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${Key_Api}&units=metric&lang=vi`
    )
    .then(async (res) => {
      const data = await res.data;
      console.log(`[Search Input]`, data);
      cityName.innerHTML = data.name || Default_values;
      if (data.weather.length) {
        weatherState.innerHTML = data.weather[0].description || Default_values;
        weatherIcon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
      }
      
      temperaTure.innerHTML = Math.round(data.main.temp) || Default_values;

      sunrise.innerHTML =
        moment.unix(data.sys.sunrise).format("H:mm") || Default_values;
      sunset.innerHTML =
        moment.unix(data.sys.sunset).format("HH:mm") || Default_values;
      humidity.innerHTML = data.main.humidity || Default_values;
      windSpeed.innerHTML =
        (data.wind.speed * 3.6).toFixed(2) || Default_values;
    });
});
