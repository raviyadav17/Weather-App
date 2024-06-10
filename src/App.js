import Switch from "react-switch";
import React, { useState } from "react";
import Search from "./assets/images/search.svg";
import SearchForm from "./components/SearchForm";
import { fetchWeatherData } from "./api/OpenWeatherMap";
import WeatherDisplay from "./components/WeatherDisplay";
import ForecastDisplay from "./components/ForecastDisplay";
import "./App.css";
import Loading from "./components/Loading";

const App = () => {
  // Define state variables using useState hook
  const [weatherData, setWeatherData] = useState(null); // State for current weather data
  const [forecastData, setForecastData] = useState(null); // State for forecast data
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [darkMode, setDarkMode] = useState(false); // State for dark mode toggle
  const [city, setCity] = useState(""); // State for the city name

  // Function to handle search input change
  const searchChangeHandler = async (enteredData) => {
    // Extract latitude and longitude from entered data
    const [latitude, longitude] = enteredData.value.split(" ");
    // Set the city name
    setCity(enteredData.label);
    // Set loading state to true
    setIsLoading(true);

    try {
      // Fetch current weather data and forecast data based on latitude and longitude
      const [todayWeatherResponse, weekForecastResponse] =
        await fetchWeatherData(latitude, longitude);

      // Set weather data and forecast data
      setWeatherData(todayWeatherResponse);
      setForecastData(weekForecastResponse);
      // Set loading state to false
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      // Reset loading state in case of error
      setIsLoading(false);
    }
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Render the component
  return (
    <div className={`wrapper ${darkMode ? "dark-mode" : ""}`}>
      {/* Apply dark mode class if darkMode is true */}
      <div className="card">
        <div className="left-card">
          <div className="left-card-header">
            <h1>Weather App</h1>
            <div className="toggle-switch">
              {/* Switch component for toggling dark mode */}
              <Switch
                onChange={toggleDarkMode}
                checked={darkMode}
                onColor="#85868A"
                offColor="#85868A"
                checkedIcon={
                  <span style={{ color: "#fff", padding: "2px" }}>🌙</span>
                }
                uncheckedIcon={
                  <span style={{ color: "#000", padding: "2px" }}>☀️</span>
                }
                handleDiameter={22}
              />
            </div>
          </div>
          <div className="left-card-body">
            <h2>What's the weather? Lets Find Out.</h2>
            {/* SearchForm component for inputting location */}
            <SearchForm onSearchChange={searchChangeHandler} />
          </div>
        </div>
        <div className="right-card">
          {/* Conditional rendering based on loading state and data availability */}
          {isLoading ? (
            <div className="loading">
              <Loading />
            </div> // Show loading icon
          ) : weatherData && forecastData ? ( // If weather data and forecast data are available
            <>
              <h1>{city}</h1> {/* Display city name */}
              {/* WeatherDisplay component to display current weather */}
              <WeatherDisplay weatherData={weatherData} />
              {/* ForecastDisplay component to display forecast */}
              <ForecastDisplay forecastData={forecastData} />
            </>
          ) : (
            <>
              <h2>No Data Yet</h2> {/* Display if no data available */}
              <img src={Search} alt="Search-img" /> {/* Display search img icon */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
