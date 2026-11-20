// Weather Forecast Website — Open-Meteo Geocoding + Forecast APIs (no API key needed)
const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

const $ = (id) => document.getElementById(id);
const form = $("searchForm"), input = $("cityInput"), button = $("searchBtn");
const messageEl = $("message"), loaderEl = $("loader"), weatherEl = $("weather");

let clockTimer = null;

// WMO weather code -> label, emoji icon and background theme
const WEATHER_CODES = {
  0: ["Clear sky", "☀️", "🌙", "clear"],
  1: ["Mostly clear", "🌤️", "🌙", "clear"],
  2: ["Partly cloudy", "⛅", "☁️", "cloudy"],
  3: ["Overcast", "☁️", "☁️", "cloudy"],
  45: ["Fog", "🌫️", "🌫️", "cloudy"], 48: ["Rime fog", "🌫️", "🌫️", "cloudy"],
  51: ["Light drizzle", "🌦️", "🌧️", "rain"], 53: ["Drizzle", "🌦️", "🌧️", "rain"], 55: ["Heavy drizzle", "🌧️", "🌧️", "rain"],
  56: ["Freezing drizzle", "🌧️", "🌧️", "rain"], 57: ["Freezing drizzle", "🌧️", "🌧️", "rain"],
  61: ["Light rain", "🌦️", "🌧️", "rain"], 63: ["Rain", "🌧️", "🌧️", "rain"], 65: ["Heavy rain", "🌧️", "🌧️", "rain"],
  66: ["Freezing rain", "🌧️", "🌧️", "rain"], 67: ["Freezing rain", "🌧️", "🌧️", "rain"],
  71: ["Light snow", "🌨️", "🌨️", "snow"], 73: ["Snow", "❄️", "❄️", "snow"], 75: ["Heavy snow", "❄️", "❄️", "snow"], 77: ["Snow grains", "❄️", "❄️", "snow"],
  80: ["Rain showers", "🌦️", "🌧️", "rain"], 81: ["Rain showers", "🌧️", "🌧️", "rain"], 82: ["Violent showers", "🌧️", "🌧️", "rain"],
  85: ["Snow showers", "🌨️", "🌨️", "snow"], 86: ["Heavy snow showers", "❄️", "❄️", "snow"],
  95: ["Thunderstorm", "⛈️", "⛈️", "storm"], 96: ["Thunderstorm, hail", "⛈️", "⛈️", "storm"], 99: ["Severe thunderstorm", "⛈️", "⛈️", "storm"],
};

/** Look up weather details for a code; falls back safely for unknown codes. */
function describeWeather(code, isDay = true) {
  const [label, dayIcon, nightIcon, theme] = WEATHER_CODES[code] || ["Unknown", "🌡️", "🌡️", "cloudy"];
  return { label, icon: isDay ? dayIcon : nightIcon, theme };
}

/** Fetch JSON and throw a clear error for HTTP failures. */
async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json();
}

/** Step 1: convert a city name to coordinates. Returns null if nothing matches. */
async function findCity(name) {
  const data = await fetchJson(`${GEO_URL}?name=${encodeURIComponent(name)}&count=1&language=en&format=json`);
  return data.results && data.results.length ? data.results[0] : null;
}

/** Step 2: fetch current conditions and a 5-day forecast for coordinates. */
function fetchWeather(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat, longitude: lon, timezone: "auto", forecast_days: 5,
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,is_day",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
  });
  return fetchJson(`${WEATHER_URL}?${params}`);
}

/** Show or hide the loader and lock the search controls while loading. */
function setLoading(isLoading) {
  loaderEl.hidden = !isLoading;
  button.disabled = isLoading;
  input.disabled = isLoading;
  if (isLoading) { weatherEl.hidden = true; showMessage(""); }
}

function showMessage(text) {
  messageEl.textContent = text;
  messageEl.hidden = !text;
}

/** Keep the city's local clock ticking using the API's UTC offset. */
function startClock(utcOffsetSeconds) {
  clearInterval(clockTimer);
  const render = () => {
    const local = new Date(Date.now() + utcOffsetSeconds * 1000);
    $("localTime").textContent = local.toLocaleString("en-US", {
      timeZone: "UTC", weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit",
    });
  };
  render();
  clockTimer = setInterval(render, 30000);
}

/** Render the current conditions card, stats and page theme. */
function renderCurrent(city, data) {
  const c = data.current;
  const isDay = Number(c.is_day) === 1; 
  console.log("API is_day:", c.is_day, "| Weather code:", c.weather_code);
  const info = describeWeather(c.weather_code, isDay);
  $("cityName").textContent = [city.name, city.admin1, city.country].filter(Boolean).join(", ");
  $("temperature").textContent = Math.round(c.temperature_2m);
  $("condition").textContent = info.label;
  $("currentIcon").textContent = info.icon;
  $("feelsLike").textContent = `${Math.round(c.apparent_temperature)}°C`;
  $("humidity").textContent = `${c.relative_humidity_2m}%`;
  $("wind").textContent = `${c.wind_speed_10m} km/h`;
  $("precipitation").textContent = `${c.precipitation} mm`;
  document.body.dataset.theme = isDay
  ? (info.theme === "clear" ? "clear-day" : info.theme)
  : (info.theme === "clear" ? "clear-night" : info.theme);
  startClock(data.utc_offset_seconds);
}

/** Render the five forecast cards. Dates are parsed as UTC so they never shift a day. */
function renderForecast(daily) {
  $("forecast").innerHTML = "";
  daily.time.forEach((dateStr, i) => {
    const info = describeWeather(daily.weather_code[i]);
    const date = new Date(`${dateStr}T00:00:00Z`);
    const li = document.createElement("li");
    li.className = "card";
    li.innerHTML = `
      <div class="day">${i === 0 ? "Today" : date.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" })}</div>
      <div class="date">${date.toLocaleDateString("en-US", { day: "numeric", month: "short", timeZone: "UTC" })}</div>
      <div class="icon">${info.icon}</div>
      <div class="desc">${info.label}</div>
      <div class="range">${Math.round(daily.temperature_2m_max[i])}° <span>/ ${Math.round(daily.temperature_2m_min[i])}°</span></div>`;
    $("forecast").appendChild(li);
  });
}

/** Main flow: validate, geocode, fetch weather, render, handle every failure. */
async function searchCity(name) {
  const query = name.trim();
  if (!query) { showMessage("Enter a city name to search."); return; }

  setLoading(true);
  try {
    const city = await findCity(query);
    if (!city) { showMessage(`We couldn't find "${query}". Check the spelling or try a nearby city.`); return; }
    const data = await fetchWeather(city.latitude, city.longitude);
    if (!data.current || !data.daily) throw new Error("Incomplete weather data");
    renderCurrent(city, data);
    renderForecast(data.daily);
    weatherEl.hidden = false;
  } catch (error) {
    console.error(error);
    showMessage("Couldn't load weather data. Check your internet connection and try again.");
  } finally {
    setLoading(false);
    input.focus();
  }
}

// Submitting the form covers both the Search button and the Enter key.
form.addEventListener("submit", (event) => { event.preventDefault(); searchCity(input.value); });

// Show a default city on first load so the dashboard is never empty.
searchCity("Coimbatore");
