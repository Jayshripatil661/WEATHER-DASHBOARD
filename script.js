const API_KEY = "7ac4f15b46154db7826162402261506";

const weatherForm = document.getElementById("weatherForm");
const locationInput = document.getElementById("location");
const resultDiv = document.getElementById("result");

weatherForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const city = locationInput.value.trim();

    if (!city) {
        return;
    }

    resultDiv.innerHTML =
        '<p class="loading">Loading weather data...</p>';

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=1`
        );

        const data = await response.json();

        if (!response.ok || data.error) {
            throw new Error(
                data.error?.message || "City not found"
            );
        }

        const today = data.forecast.forecastday[0].day;

        resultDiv.innerHTML = `
            <div class="weather-card">
                <h2>${data.location.name}, ${data.location.country}</h2>

                <p><strong>🌡 Temperature:</strong>
                ${data.current.temp_c} °C</p>

                <p><strong>🔥 Max Temperature:</strong>
                ${today.maxtemp_c} °C</p>

                <p><strong>❄ Min Temperature:</strong>
                ${today.mintemp_c} °C</p>

                <p><strong>💧 Humidity:</strong>
                ${data.current.humidity}%</p>

                <p><strong>🌬 Wind Speed:</strong>
                ${data.current.wind_kph} km/h</p>

                <p><strong>☁ Condition:</strong>
                ${data.current.condition.text}</p>
            </div>
        `;

    } catch (error) {
        resultDiv.innerHTML =
            `<p class="error">${error.message}</p>`;
    }
});