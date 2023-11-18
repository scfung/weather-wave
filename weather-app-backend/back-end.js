
const cors = require('cors');
const express = require('express');
const axios = require('axios');

const app = express();
const port = 4000;

const dotenv = require('dotenv');
dotenv.config();

app.use(cors());

app.get('/weather/current', async (req, res) => {
  try {
    // Replace 'YOUR_API_KEY' with your actual API key from WeatherAPI.com
    const apiKey = process.env.API_KEY;
    const city = req.query.city || 'New York'; // You can change the default city as needed

    // Make the API request
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${city}`);

    // Handle the response data as needed

    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/weather/forecast', async (req, res) => {
    try {
      const city = req.query.city || 'New York'; // You can change the default city as needed
      const apiKey = process.env.API_KEY;
      // Make the API request for the hourly forecast
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city}&days=4&aqi=no&alerts=no`);
  
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching forecast:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});