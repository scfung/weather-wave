import './Homepage.css';
import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import axios from 'axios';
import WeatherForm from './WeatherForm';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
function Homepage() {

  const [weatherData, setWeatherData] = useState({current: null, forecast: null});
  const [error, setError] = useState(null);

  const getWeatherData = async (city) => {
    try {
      setError(null);
      // Make a request for current weather
      const currentWeatherResponse = await axios.get(`http://localhost:4000/weather/current?city=${city}`);
      const currentWeatherData = currentWeatherResponse?.data || null;

      // Make a request for forecast weather
      const forecastWeatherResponse = await axios.get(`http://localhost:4000/weather/forecast?city=${city}`);
      const forecastWeatherData = forecastWeatherResponse?.data || null;

      const newData = { current: currentWeatherData, forecast: forecastWeatherData };
      setWeatherData(newData);

      // Store the data in localStorage
      localStorage.setItem('weatherData', JSON.stringify(newData));
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      setError('Error fetching weather data. Please enter valid location.');
    }
};

    const resetApplication = () => {
        setWeatherData(null);
        localStorage.removeItem('weatherData');
    };
  

    //function to retrieve stored weather data on refresh
  useEffect(() => {
    const storedWeatherData = localStorage.getItem('weatherData');
    if (storedWeatherData) {
      setWeatherData(JSON.parse(storedWeatherData));
    }
    else{
        resetApplication();
    }
  }, []);

  return (
    <div>
      <div className="Homepage">
        <h1 className="motto">Welcome to WeatherWave: Your Weather Companion. Stay ahead with real-time updates.</h1>
        <h2 className='info-text'>Our search allows zip codes, cities, and local neighborhoods.</h2>
        <WeatherForm onFormSubmit={getWeatherData} />
        {error && <h1 className="error-message">{error}</h1>}
        {!error && weatherData.current && weatherData.forecast &&(
          <div>
            <h2 className='current-text'>Current Weather Information</h2>
            <CurrentWeather currentData={weatherData.current} forecastData={weatherData.forecast} />
          </div>
        )}
        {!error && weatherData.forecast && (
          <div>
            <Forecast forecastData={weatherData.forecast} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;