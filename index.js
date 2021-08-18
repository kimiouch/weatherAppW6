let apiKey = "c403a9e2a5c07086f36f15c109e2369a";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
function today() {
    let weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thurseday",
        "Friday",
        "Saturday"
    ];

    let now = new Date();

    let hour = now.getHours();
    let minute = now.getMinutes();

    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }

    let day = `${weekdays[now.getDay()]}, ${hour}:${minute}`;

    return day;
}

let currrentTime = document.querySelector("#time");

currrentTime.innerHTML = today();

function searchForCity(event) {
    event.preventDefault();

    let searchbox = document.querySelector(".type");

    axios
        .get(`${apiUrl}units=metric&q=${searchbox.value}&appid=${apiKey}`)
        .then(setCelsius);

    searchbox.value = "";
}
function setCelsius(response) {
    let cityheader = document.querySelector("#city");
    cityheader.innerHTML = response.data.name;

    let temprature = document.querySelector("#temp");

    //let Precipitation = document.querySelector("#prec");
    //Precipitation.innerHTML = response.data.clouds.all;

    let Humidity = document.querySelector("#humid");
    Humidity.innerHTML = response.data.main.humidity;

    let Wind = document.querySelector("#wind");
    Wind.innerHTML = response.data.wind.speed;

    temprature.innerHTML = response.data.main.temp;
}

let searchButton = document.querySelector("button");
searchButton.addEventListener("click", searchForCity);

function searchLoation(event) {
    event.preventDefault();

    navigator.geolocation.getCurrentPosition(
        currentPosition,
        currentPositionError
    );
}

function currentPositionError() {
    let position = {
        coords: {
            latitude: 51.5074,
            longitude: 0.1278
        }
    };
    currentPosition(position);
}

function currentPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    axios
        .get(`${apiUrl}units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(setCelsius);
}
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", searchLoation);
