import {WiHumidity, WiThermometer, WiStrongWind} from 'weather-icons-react';
//Weather icons from https://najens.github.io/weather-icons-react/
import './CurrentWeather.css'
import React from 'react';


function CurrentWeather({ currentData, forecastData }) {
    const { temp_f, condition, wind_mph, humidity, feelslike_f, wind_dir } = currentData.current;
    const { name } = currentData.location;
    const currentForecastDay = forecastData.forecast.forecastday[0];
    const ForecastDataHolder = forecastData;
  
    var real_feel = Math.round(feelslike_f);
    var wind_speed = Math.round(wind_mph);
    var current_temp = Math.round(temp_f);
    var min_temp = Math.round(currentForecastDay.day.mintemp_f);
    var max_temp = Math.round(currentForecastDay.day.maxtemp_f);
  
    function getHourlyForecast(forecastData) {
        // Extract relevant data
        const { forecastday } = forecastData.forecast;
      
        // Calculate the time for the next seven hours
        const currentLocalTime = new Date();
        const nextSevenHours = new Date(currentLocalTime);
        nextSevenHours.setHours(nextSevenHours.getHours() + 7);
      
        // Flatten and filter hourly forecast for the next seven hours
        const hourlyForecast = forecastday
          .flatMap((day) => day.hour)
          .filter((hour) => {
            const forecastHourTime = new Date(hour.time_epoch * 1000);
            return forecastHourTime > currentLocalTime && forecastHourTime <= nextSevenHours;
          })
          .slice(0, 7);
      
        // Format the hourly forecast data
        const formattedHourlyForecast = hourlyForecast.map((hour) => {
          return {
            time: hour.time,
            temperature: {
              celsius: hour.temp_c,
              fahrenheit: hour.temp_f,
            },
            condition: {
              text: hour.condition.text,
              icon: hour.condition.icon,
            },
            wind: {
              speed_mph: hour.wind_mph,
              speed_kph: hour.wind_kph,
              direction: hour.wind_dir,
            },
            humidity: hour.humidity,
            chance_of_rain: hour.chance_of_rain,
            chance_of_snow: hour.chance_of_snow,
          };
        });
      
        return formattedHourlyForecast;
      }
  
    const hourlyForecast = getHourlyForecast(ForecastDataHolder);
  
    const getWeatherIcon = (iconUrl) => {
        return <img src={iconUrl} alt="Weather Icon" />;
      };
  
    return (
      <div className="CurrentWeather">
        <h1 className="weather-location">{name}</h1>
        <div className="current_weather_conditions">
          <h1 className="weather-condition">
            {condition.text}
            {condition.icon && getWeatherIcon(condition.icon)}
          </h1>
          <h1 className="current-temp">Temperature: {current_temp}&deg;F</h1>
          <h1 className="high-temp">H: {max_temp} &deg;F</h1>
          <h1 className="low-temp">L: {min_temp} &deg;F</h1>
          <div className="humidity">
            <h2>
              <WiHumidity size={40}></WiHumidity>Humidity: {humidity}%
            </h2>
          </div>
          <div className="real-feel">
            <h2>
              <WiThermometer size={40}></WiThermometer>Real Feel Temp: {real_feel}&deg;F
            </h2>
          </div>
          <div className="wind-speed">
            <h2>
              <WiStrongWind size={40}></WiStrongWind>Wind Speed: {wind_speed} MPH {wind_dir}
            </h2>
          </div>
        </div>
  
        <div className="hourly-forecast-text">
          <h1>Hourly Forecast</h1>
        </div>
  
        <div className="hourly_forecast">
          {hourlyForecast.map((hour, index) => (
            <div key={index} className="hourly-forecast-item">
              <h2>{new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h2>
              <h2>{Math.round(hour.temperature.fahrenheit)}°F</h2>
              <h2>{hour.condition.text}</h2>
              {hour.condition.icon && getWeatherIcon(hour.condition.icon)}
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default CurrentWeather;

