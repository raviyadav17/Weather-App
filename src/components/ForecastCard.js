import React from "react";

function ForecastCard({ index, forecastDataObj }) {
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

  // Destructure the properties from the forecastDataObj
  const { main, weather, dt } = forecastDataObj;
  
  // Extract relevant data from the forecastDataObj
  const temperature = main.temp;
  const weatherTitle = weather[0].main;
  const icon = weather[0].icon;
  const humidity = main.humidity;

  // Create a date object from the timestamp provided
  const dateObj = new Date(dt * 1000);

  // Extract time, day of the week, date, month, and year from the date object
  const time = dateObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dayOfWeek = dateObj.getDay();
  const date = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "long" });
  const year = dateObj.getFullYear();
  const day = days[dayOfWeek];

  // Render the forecast card
  return (
    <>
      <div className="card-display">
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
        <p>Humidity: {humidity}%</p>
        {/* Display day, date, month, year */}
        <p>
          {day}, {date} {month} {year}
        </p>
        <p>{time}</p>
      </div>
      {/* Horizontal line as separator */}
      <hr />
    </>
  );
}

export default ForecastCard;
