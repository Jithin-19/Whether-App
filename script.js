const apiKey = "eea1a84a5d634535b1c115217250803"; // Replace with your WeatherAPI key

// Function to fetch weather data
async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        alert("Please enter a city name!");
        return;
    }
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;


    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }

        displayWeather(data);
        saveToFavorites(city);
    } catch (error) {
        alert("Error: " + error.message);
    }
}

// Function to display weather data
function displayWeather(data) {
    const weatherInfo = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <p>Humidity: ${data.current.humidity}%</p>
        <p>Wind Speed: ${data.current.wind_kph} km/h</p>
        <p>Condition: ${data.current.condition.text}</p>
        <img src="${data.current.condition.icon}" alt="Weather Icon">
    `;
    document.getElementById("weatherInfo").innerHTML = weatherInfo;
}

// Function to save favorite cities in Local Storage
function saveToFavorites(city) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(city)) {
        favorites.push(city);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    loadFavorites();
}

// Function to load favorite cities from Local Storage
function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let favoriteList = favorites.map(city => 
        `<button onclick="getWeatherFromFavorites('${city}')">${city}</button>`).join(" ");
    
    document.getElementById("favorites").innerHTML = favoriteList;
}

// Function to fetch weather for a favorite city
function getWeatherFromFavorites(city) {
    document.getElementById("cityInput").value = city;
    getWeather();
}

// Load favorite cities on page load
document.addEventListener("DOMContentLoaded", loadFavorites);
