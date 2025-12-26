const API_KEY = "3cd2d9575c4565bc315de64c7db01663";
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
});

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

function setTheme(theme) {
    const html = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    
    if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
    } else {
        html.removeAttribute('data-theme');
        themeIcon.textContent = '🌙';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        searchWeather();
    }
}

async function searchWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    if (API_KEY === 'YOUR_API_KEY_HERE') {
        showError('Please add your OpenWeatherMap API key in script.js');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        
        if (!response.ok) {
            if (response.status === 404) {
                showError('City not found. Please try again.');
            } else {
                showError('Error fetching weather data');
            }
            return;
        }
        
        const data = await response.json();
        displayWeather(data);
        fetchForecast(city);
        clearError();
    } catch (error) {
        showError('Failed to fetch weather data. Please try again.');
        console.error('Error:', error);
    }
}

async function fetchForecast(city) {
    try {
        const response = await fetch(`${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch forecast');
        }
        
        const data = await response.json();
 

function displayForecast(forecastList) {
    // Get one forecast per day (every 8th entry since API returns 3-hour intervals)
    const dailyForecasts = [];
    let lastDay = null;
    
    for (const forecast of forecastList) {
        const date = new Date(forecast.dt * 1000);
        const day = date.getDate();
        
        if (day !== lastDay && dailyForecasts.length < 5) {
            dailyForecasts.push(forecast);
            lastDay = day;
        }
    }
    
    const forecastGrid = document.getElementById('forecastGrid');
    forecastGrid.innerHTML = '';
    
    dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(forecast.main.temp);
        const description = forecast.weather[0].main;
        const icon = forecast.weather[0].icon;
        
        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" class="forecast-icon">
            <div class="forecast-temp">${temp}°C</div>
            <div class="forecast-desc">${description}</div>
        `;
        
        forecastGrid.appendChild(forecastCard);
    });
}       displayForecast(data.list);
    } catch (error) {
        console.error('Forecast Error:', error);
    }
}

function displayWeather(data) {
    document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    
    document.getElementById('weatherInfo').style.display = 'block';
}

function showError(message) {
    const errorElement = document.getElementById('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    document.getElementById('weatherInfo').style.display = 'none';
}

function clearError() {
    document.getElementById('error').style.display = 'none';
}