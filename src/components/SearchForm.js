import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { fetchCities } from "../api/OpenWeatherMap";

const SearchForm = ({ onSearchChange }) => {
  // State to manage the search value
  const [searchValue, setSearchValue] = useState(null);

  // Function to load options for AsyncPaginate
  const loadOptions = async (inputValue) => {
    // Fetch cities based on the input value
    const citiesList = await fetchCities(inputValue);

    // Return options for AsyncPaginate
    return {
      options: citiesList.data.map((city) => {
        return {
          value: `${city.latitude} ${city.longitude}`, // Value for the option
          label: `${city.name}, ${city.countryCode}`, // Label for the option
          style: { color: "black" }, // Custom style for the option
        };
      }),
    };
  };

  // Function to handle change in input value
  const onChangeHandler = (enteredData) => {
    // Set the search value state
    setSearchValue(enteredData);
    // Call the search change handler passed as props
    onSearchChange(enteredData);
  };

  // Custom styles for AsyncPaginate options
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: "black" // Override color for options
    }),
  };

  // Render the component
  return (
    <AsyncPaginate
      placeholder="Search for cities" // Placeholder text for the input
      debounceTimeout={600} // Debounce timeout for input
      value={searchValue} // Current value of the input
      onChange={onChangeHandler} // Change handler for the input
      loadOptions={loadOptions} // Function to load options asynchronously
      styles={customStyles} // Custom styles for AsyncPaginate options
    />
  );
};

export default SearchForm;
