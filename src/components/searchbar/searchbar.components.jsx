import React, { useState } from 'react';
import "./searchbar.styles.css";

const SearchBar = ({ onSearchSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearchSubmit(inputValue);
    }
  };

  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Search by subject..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyPress={handleKeyPress}
    />
  );
};

export default SearchBar;
