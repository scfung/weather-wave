//Required modules for filing requests
const cors = require('cors');
const express = require('express');
const axios = require('axios');

const app = express();
const port = 4000;

const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
//Used to obtain information about the current weather conditions.
app.get('/weather/current', async (req, res) => {
  try {
    
    const apiKey = process.env.API_KEY;
    const city = req.query.city || 'New York';

    // Make the API request
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${city}`);

    // Handle the response data 

    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//Used to obtain information about the forecast weather conditions.
app.get('/weather/forecast', async (req, res) => {
    try {
      const city = req.query.city || 'New York';
      const apiKey = process.env.API_KEY;
      // Make the API request for the hourly forecast
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city}&days=4&aqi=no&alerts=no`);
      //Handles the response data
      res.json(response.data);
    } catch (error) {
      //Handle errors
      console.error('Error fetching forecast:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//Opens the port for frontend to access information.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
