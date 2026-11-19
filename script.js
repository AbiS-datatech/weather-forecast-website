
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const message = document.getElementById("message");
const cityName = document.getElementById("cityName");
const dateElement = document.getElementById("date");
const temperature = document.getElementById("temperature");
const weatherCondition = document.getElementById("weatherCondition");
const weatherIcon = document.getElementById("weatherIcon");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");

const weatherCard = document.getElementById("weatherCard");

const weatherCodes = {
    0: { description: "Clear Sky", icon: "☀️" },
    1: { description: "Mainly Clear", icon: "🌤️" },
    2: { description: "Partly Cloudy", icon: "⛅" },
    3: { description: "Overcast", icon: "☁️" },
    45: { description: "Foggy", icon: "🌫️" },
    48: { description: "Depositing Rime Fog", icon: "🌫️" },
    51: { description: "Light Drizzle", icon: "🌦️" },
    53: { description: "Moderate Drizzle", icon: "🌦️" },
    55: { description: "Dense Drizzle", icon: "🌧️" },
    61: { description: "Slight Rain", icon: "🌧️" },
    63: { description: "Moderate Rain", icon: "🌧️" },
    65: { description: "Heavy Rain", icon: "🌧️" },
    71: { description: "Slight Snow", icon: "🌨️" },
    73: { description: "Moderate Snow", icon: "🌨️" },
    75: { description: "Heavy Snow", icon: "❄️" },
    80: { description: "Rain Showers", icon: "🌦️" },
    81: { description: "Moderate Showers", icon: "🌧️" },
    82: { description: "Violent Rain Showers", icon: "⛈️" },
    95: { description: "Thunderstorm", icon: "⛈️" },
    96: { description: "Thunderstorm with Hail", icon: "⛈️" },
    99: { description: "Heavy Thunderstorm with Hail", icon: "⛈️" }
};

async function getWeather() {
    const city = cityInput.value.trim();

    if (!city) {
        message.textContent = "Please enter a city name.";
        return;
    }

    try {
        searchBtn.disabled = true;
        searchBtn.textContent = "Loading...";
        message.textContent = "Fetching weather information...";

        // Step 1: Get city coordinates
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        if (!geoResponse.ok) {
            throw new Error("Unable to connect to the location service.");
        }

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found. Please check the city name.");
        }

        const location = geoData.results[0];
        const latitude = location.latitude;
        const longitude = location.longitude;

        // Step 2: Fetch weather information
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`
        );

        if (!weatherResponse.ok) {
            throw new Error("Unable to fetch weather data. Try again.");
        }

        const weatherData = await weatherResponse.json();

        // Step 3: Display weather information
        displayWeather(location, weatherData);

        message.textContent = "";

    } catch (error) {
        message.textContent = error.message;
    } finally {
        searchBtn.disabled = false;
        searchBtn.textContent = "Search";
    }
}

function displayWeather(location, data) {
    const current = data.current;

    const weather = weatherCodes[current.weather_code] || {
        description: "Unknown Condition",
        icon: "🌡️"
    };

    cityName.textContent = `${location.name}, ${location.country}`;
    temperature.textContent = `${Math.round(current.temperature_2m)}°C`;
    weatherCondition.textContent = weather.description;
    weatherIcon.textContent = weather.icon;

    feelsLike.textContent = `${Math.round(current.apparent_temperature)}°C`;
    humidity.textContent = `${current.relative_humidity_2m}%`;
    windSpeed.textContent = `${current.wind_speed_10m} km/h`;

    const weatherDate = new Date(current.time);

    dateElement.textContent = weatherDate.toLocaleString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit"
    });

    weatherCard.style.display = "block";
}

// Search button
searchBtn.addEventListener("click", getWeather);

// Search using Enter key
cityInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

// Initial weather
cityInput.value = "Coimbatore";
getWeather();
