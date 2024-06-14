import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../SearchRes/SearchResults.css';
import DanePoFiltracji from '../../../Card_apartment/DanePoFiltracji.jsx';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery();
  const [propertiesData, setPropertiesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties(query);
  }, [query]);

  const fetchProperties = (queryParams) => {
    const params = new URLSearchParams(queryParams);

    // Dodaj dodatkowe parametry jeśli są potrzebne
    // params.append('additional_param', 'value');

    const url = `http://127.0.0.1:5000/getallproperty?${params.toString()}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setPropertiesData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="results-container">
      <div className="left-side">
        <h1>Results for: {query.toString()}</h1>
        <DanePoFiltracji propertiesData={propertiesData} />
      </div>
      <div className="right-side">
        <h1>Additional Information</h1>
        {/* Tutaj możesz dodać dodatkowe informacje lub komponenty */}
      </div>
    </div>
  );
};

export default SearchResults;
