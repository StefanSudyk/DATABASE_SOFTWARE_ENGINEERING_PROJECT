// components/SearchResults.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import '../SearchRes/SearchResults.css'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery().get('query');

  // Tutaj dodaj logikę wyszukiwania i wyświetlania wyników na podstawie query

  return (
    <div className="results-container">
      <div className="left-side">
        <h1>Results for: {query}</h1>
        {/* Tutaj dodaj logikę wyszukiwania i wyświetlania wyników na podstawie query */}
      </div>
      <div className="right-side">
        <h1>Additional Information</h1>
        {/* Tutaj możesz dodać dodatkowe informacje lub komponenty */}
      </div>
    </div>
  );
};

export default SearchResults;