import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../SearchRes/SearchResults.css';
import DanePoFiltracji from '../../../Card_apartment/DanePoFiltracji.jsx';
import ButtonBack from '../ButtonBack/ButtonBack.jsx';
import MiniButtonFilters from '../MiniButtonFilters/MiniButtonFilters.jsx';

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
    const apiUrl = process.env.REACT_APP_API_URL;
    const url = `${apiUrl}/getallproperty?${params.toString()}`;

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
    <>
    <div className='gorny_tekst'> 
      Oferty dobrane według filtrowania
      <span className='przycisk_filtry'>
      <MiniButtonFilters/>
      </span>
       <div className='Nawigacja'><ButtonBack/></div></div>
    <div className="results-container">
        <DanePoFiltracji propertiesData={propertiesData} className="kafelek" />

    </div>
    </>
  );
};

export default SearchResults;