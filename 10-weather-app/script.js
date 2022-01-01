const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
    try {
        const resp = await fetch(url(city), { origin: "cors" });
        const respData = await resp.json();
        // console.log(respData);
        addWeatherToPage(respData);
    }
    catch {
        const weather = document.createElement("div");
        weather.classList.add("weather");

        weather.innerHTML = `Couldn't find it`

        main.innerHTML = "";
        main.appendChild(weather);
    }
}

function addWeatherToPage(data) {
    const weather = document.createElement("div");
    weather.classList.add("weather");

    const temp = KtoC(data.main.temp);

    weather.innerHTML = `
        <h3>${data.sys.country + ' - ' + data.name}</h3>
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> 
            <h5>Temperature : ${temp}°C </h5>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
        </div>
        <small>Clouds : ${data.weather[0].main}</small>
        <h6>Humidity : ${data.main.humidity}%</h6>
        <h6>Pressure : ${data.main.pressure} mb</h6>
    `;

    // cleanup
    main.innerHTML = "";

    main.appendChild(weather);
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }
});
