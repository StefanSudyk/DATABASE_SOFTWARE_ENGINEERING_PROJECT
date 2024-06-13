import React, { useState } from 'react';
import '../Strona_glowna/SearchBar.css';

const SearchBar = () => {
  const [selectedOption, setSelectedOption] = useState('Wszystkie');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="wyszukaj">
      <form className="search-form">
        <div className="radio-buttons">
          <label className={selectedOption === 'Wszystkie' ? 'active' : ''}>
            <input
              type="radio"
              value="Wszystkie"
              checked={selectedOption === 'Wszystkie'}
              onChange={handleOptionChange}
            />
            Wszystkie
          </label>
          <label className={selectedOption === 'Mieszkanie' ? 'active' : ''}>
            <input
              type="radio"
              value="Mieszkanie"
              checked={selectedOption === 'Mieszkanie'}
              onChange={handleOptionChange}
            />
            Mieszkanie
          </label>
          <label className={selectedOption === 'Dom' ? 'active' : ''}>
            <input
              type="radio"
              value="Dom"
              checked={selectedOption === 'Dom'}
              onChange={handleOptionChange}
            />
            Dom
          </label>
          <label className={selectedOption === 'Szeregówka' ? 'active' : ''}>
            <input
              type="radio"
              value="Szeregówka"
              checked={selectedOption === 'Szeregówka'}
              onChange={handleOptionChange}
            />
            Szeregówka
          </label>
          <label className={selectedOption === 'Zaawansowane' ? 'active' : ''}>
            <input
              type="radio"
              value="Zaawansowane"
              checked={selectedOption === 'Zaawanosowane'}
              onChange={handleOptionChange}
            />
            Zaawanoswane
          </label>
        </div>
        <div className="search-bar-container">
          <input
            type="text"
            /*className="search-input"*/
            className="search-input-with-icon"
            placeholder=" Wprowadź nazwę miasta"
          />
          <button type="submit" className="search-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-search"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
