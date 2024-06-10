import axios from "axios";

// Define URLs and sensitive API keys
const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const RAPIDAPI_KEY = "f22cc1006dmsh05b01dbaf201e05p175aa1jsnbd7693ce2f87"; 
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // Retrieve weather API key from environment variables

// Define options for API requests
const OPTIONS = {
  method: "GET",
  headers: {
    "x-rapidapi-key": RAPIDAPI_KEY, // Use RapidAPI key for headers
    "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
  },
};

// Function to fetch weather data using OpenWeatherMap API
export async function fetchWeatherData(lat, lon) {
  try {
    // Make concurrent requests to fetch current weather and forecast
    let [weatherResponse, forecastResponse] = await Promise.all([
      axios.get(`${WEATHER_API_URL}/weather`, {
        params: {
          lat: lat,
          lon: lon,
          appid: WEATHER_API_KEY,
          units: "metric",
        },
      }),
      axios.get(`${WEATHER_API_URL}/forecast`, {
        params: {
          lat: lat,
          lon: lon,
          appid: WEATHER_API_KEY,
          units: "metric",
        },
      }),
    ]);

    // Return weather data and forecast data
    return [weatherResponse.data, forecastResponse.data];
  } catch (error) {
    console.log(error);
  }
}

// Function to fetch cities data using RapidAPI GeoDB
export async function fetchCities(input) {
  try {
    // Make request to fetch cities based on input
    const response = await axios.get(`${GEO_API_URL}/cities`, {
      params: {
        minPopulation: 10000,
        namePrefix: input,
      },
      headers: OPTIONS.headers, // Use options for headers
    });

    // Return cities data
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
