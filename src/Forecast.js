
import './Forecast.css'
import { DateTime } from 'luxon';


//Displays the three day forecast
function Forecast({forecastData}) {

  // Extract the next three days from the forecast data
  const currentDate = DateTime.local();
  const localTimeZone = forecastData.location.tz_id;

  // Get current date in the local timezone using luxon
  const currentLocalDate = currentDate.setZone(localTimeZone).toISODate();

  const nextThreeDays =
    forecastData?.forecast?.forecastday
      ?.filter((day) => day.date !== currentLocalDate)
      .slice(0, 3) || [];
  console.log('nextThreeDays:', nextThreeDays);

    return(
    <>
        <div className="three-day">
            <h1>3-Day Forecast</h1>
        </div>  

        <div className="Forecast">
            <div>
      {/*Maps out the next three days in forecast*/}
            {nextThreeDays.map((day) => (

                <div className="forecast-card" key={day.date}>
                  <h1>{day.date}</h1>
                  <h1>H: {Math.round(day.day.maxtemp_f)}°F</h1>
                  <h1>L: {Math.round(day.day.mintemp_f)}°F</h1>
                  <h2>{day.day.condition.text}</h2>
                  <img
                    className="forecast-icon"
                    src={`https:${day.day.condition.icon}`}
                    alt={day.day.condition.text}
                  />
                  <h2>Rain Chance: {day.day.daily_chance_of_rain}%</h2>
                  <h2>Avg Humidity: {day.day.avghumidity}%</h2>
                </div>
            ))}

            </div>
        </div>
    </>
    );
}

export default Forecast;
