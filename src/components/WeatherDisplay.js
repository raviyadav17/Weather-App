import React from "react";

const WeatherDisplay = ({ weatherData }) => {
  // Check if weatherData exists
  if (!weatherData) {
    // If weatherData does not exist, render a message indicating no weather data available
    return <h2>No weather data available</h2>;
  }

  // Define an array of days to get the day of the week
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Destructure the properties from the weatherData object
  const { clouds, main, weather, wind, dt } = weatherData;

  // Extract relevant data from the weatherData object
  const temperature = main.temp;
  const weatherTitle = weather[0].main;
  const description = weather[0].description.toUpperCase();
  const icon = weather[0].icon;
  const feelslike = main.feels_like;
  const cloud = clouds.all;
  const humidity = main.humidity;
  const pressure = main.pressure;
  const windSpeed = wind.speed;

  // Create a date object from the timestamp provided
  const dateObj = new Date(dt * 1000);

  // Extract day of the week, date, month, and year from the date object
  const dayOfWeek = dateObj.getDay();
  const date = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "long" });
  const year = dateObj.getFullYear();
  const day = days[dayOfWeek];

  // Render the weather display
  return (
    <div className="weather-display">
      {/* Left section to display basic weather information */}
      <div className="left-display">
        <h2>{temperature} °C</h2>
        {/* Display weather title and icon */}
        <div className="icon-display">
          <p>{weatherTitle}</p>
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="icon"
            style={{ width: "3rem", height: "3rem" }}
          />
        </div>
        {/* Display weather description */}
        <p>{description}</p>
        {/* Display day, date, month, and year */}
        <p>
          {day}, {date} {month} {year}
        </p>
      </div>
      {/* Right section to display additional weather information */}
      <div className="right-display">
        <p>Feels Like: {feelslike}°C</p>
        <p>Cloud Cover: {cloud}%</p>
        <p>Humidity: {humidity}%</p>
        <p>Pressure: {pressure} hPa</p>
        <p>Wind Speed: {windSpeed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherDisplay;
