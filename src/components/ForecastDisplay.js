import React from "react";
import ForecastCard from "./ForecastCard";

const ForecastDisplay = ({ forecastData }) => {
  // Check if forecastData exists
  if (!forecastData) {
    // If forecastData does not exist, render a message indicating no forecast data available
    return <h2>No forecast data available</h2>;
  }

  // Render the forecast display if forecastData exists
  return (
    <div className="forecast-display">
      {/* Map through the list of forecast data and render ForecastCard component for each data */}
      {forecastData.list.map((data, index) => (
        // Render ForecastCard component for each data with a unique key
        <ForecastCard key={data.dt} index={index} forecastDataObj={data} />
      ))}
    </div>
  );
};

export default ForecastDisplay;
