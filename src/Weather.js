import { useState } from "react";
import axios from "axios";
import "./Weather.css";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    const query = city.trim();
    if (!query) {
      setWeather(null);
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        query
      )}&units=metric&appid=${API_KEY}`;
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (err) {
      setWeather(null);
      if (err.response && err.response.status === 404) {
        setError("City not found. Please check the spelling and try again.");
      } else if (err.response && err.response.status === 401) {
        setError("Invalid API key. Please check your .env file.");
      } else {
        setError("Something went wrong. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="weather">
      <form className="weather-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="City name"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="weather-error">{error}</p>}

      {weather && (
        <article className="weather-card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p className="weather-temp">{Math.round(weather.main.temp)}°C</p>
          <p className="weather-desc">{weather.weather[0].description}</p>

          <div className="weather-details">
            <div>
              <span>Feels like</span>
              <strong>{Math.round(weather.main.feels_like)}°C</strong>
            </div>
            <div>
              <span>Humidity</span>
              <strong>{weather.main.humidity}%</strong>
            </div>
            <div>
              <span>Wind</span>
              <strong>{weather.wind.speed} m/s</strong>
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

export default Weather;