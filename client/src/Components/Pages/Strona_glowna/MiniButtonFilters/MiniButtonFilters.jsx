import React, { useState } from 'react';
import './MiniButtonFilters.css';
import SearchButton from '../SearchBar/SearchBar.jsx';

const MiniButtonFilters = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleButtonClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <div className="mini-button-filters-container">
      <button className="mini-button-filters" onClick={handleButtonClick}>
        <span className="mini-button-icon">&#9881;</span> Filtry
      </button>
      {showSearchBar && <SearchButton className="mini-button-filters-container wyszukaj" />}
    </div>
  );
};

export default MiniButtonFilters;
