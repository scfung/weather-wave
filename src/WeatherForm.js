import React, { useState } from 'react';

//Used to handle the input for the weather location from the user.
const WeatherForm = ({ onFormSubmit }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(city);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter location:
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      </label>
      <button type="submit">Get Weather</button>
    </form>
  );
};

export default WeatherForm;
