import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './SearchBar.css';

const SearchBar = ({ className }) => {
  const [selectedOption, setSelectedOption] = useState('Wszystkie');
  const [expandBackground, setExpandBackground] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [advancedSearch, setAdvancedSearch] = useState({
    finishing_standard: '',
    price_from: '',
    price_to: '',
    metrage_from: '',
    metrage_to: '',
    nr_floors: '',
    car_parking_space: '',
    heating: '',
    finish: '',
    market: '',
    nr_rooms: '',
    bathrooms: '',
    nr_garages: '',
    nr_balconies: '',
    region: '',
    municipality: '',
    nr_bathrooms: '',
    district: '',
    condition: '',
    type_of_heating: '',
  });
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === 'Zaawansowane') {
      setExpandBackground(true);
      setTimeout(() => setShowContent(true), 150); // Add a 0.3s delay for content
    } else {
      setShowContent(false);
      setExpandBackground(false);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAdvancedSearchChange = (event) => {
    const { name, value } = event.target;
    setAdvancedSearch((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.append('locality', searchQuery);
    }
    if (advancedSearch.price_from || advancedSearch.price_to) {
      const priceRange = `${advancedSearch.price_from || ''}-${advancedSearch.price_to || ''}`;
      params.append('price_range', priceRange);
    }
    if (advancedSearch.metrage_from || advancedSearch.metrage_to) {
      const metrageRange = `${advancedSearch.metrage_from || ''}-${advancedSearch.metrage_to || ''}`;
      params.append('metrage_range', metrageRange);
    }
    Object.keys(advancedSearch).forEach((key) => {
      if (key !== 'price_from' && key !== 'price_to' && key !== 'metrages_from' && key !== 'metrages_to' && advancedSearch[key]) {
        params.append(key, advancedSearch[key]);
      }
    });
    navigate(`/results?${params.toString()}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch(event);
    }
  };

  return (
    <div className={`wyszukaj ${expandBackground ? 'expanded' : ''} ${className}`}>
      <form className="search-form" onSubmit={handleSearch}>
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
              checked={selectedOption === 'Zaawansowane'}
              onChange={handleOptionChange}
            /><img 
            src="https://img.icons8.com/ios/50/sorting-options--v1.png" 
            alt="sorting-options--v1" 
            style={{ width: '25px', height: '25px', marginRight: '10px'}} 
          />
            Zaawansowane
          </label>
        </div>
        <div className="search-bar-container">
          <input
            type="text"
            className="search-input-with-icon"
            placeholder=" Wprowadź nazwę miasta"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}

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
        {showContent && (
          <div className="advanced-form">
            <div className="form-row">
              <div className="form-group">
                <label>Typ</label>
                <select
                  name="finishing_standard"
                  value={advancedSearch.finishing_standard}
                  onChange={handleAdvancedSearchChange}
                >
                  <option value="">Dowolne</option>
                  <option value="Apartment">Mieszkanie</option>
                  <option value="House">Dom</option>
                  <option value="Terraced house">Szeregówka</option>
                  <option value="Other">Inne</option>
                </select>
              </div>
              <div className="form-group">
                <label>Cena</label>
                <input
                  type="number"
                  placeholder="Od"
                  min="0"
                  name="price_from" 
                  value={advancedSearch.price_from}
                  onChange={handleAdvancedSearchChange}
                />
                <input
                  type="number"
                  placeholder="Do"
                  min="0"
                  name="price_to" 
                  value={advancedSearch.price_to}
                  onChange={handleAdvancedSearchChange}
                />
              </div>
              <div className="form-group">
                <label>Metraż w m²</label>
                <input
                  type="number"
                  placeholder="Od"
                  min="0"
                  name="metrage_from" 
                  value={advancedSearch.metrage_from}
                  onChange={handleAdvancedSearchChange}
                />
                <input
                  type="number"
                  placeholder="Do"
                  min="0"
                  name="metrage_to" 
                  value={advancedSearch.metrage_to}
                  onChange={handleAdvancedSearchChange}
                />
              </div>
              
              <div className="form-group">
                <label>Ilość pięter</label>
                <input type="number" placeholder="Dowolne" min="0" 
                name="nr_floors" // Dodaj nazwę pola, musi odpowiadać kluczowi w stanie advancedSearch
                value={advancedSearch.nr_floors}
                onChange={handleAdvancedSearchChange} // Obsługa zmiany
                />
                
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="mniejszyText">Miejsce parkingowe</label>
                <select
                name="car_parking_space"
                value={advancedSearch.car_parking_space}
                onChange={handleAdvancedSearchChange}
                >
                  <option value="">Dowolne</option>
                  <option value="1">Tak</option>
                  <option value="0">Nie</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="mniejszyText">Rodzaj ogrzewania</label>
                <select
                name="type_of_heating"
                value={advancedSearch.type_of_heating}
                onChange={handleAdvancedSearchChange}
                >
                  
                  <option value="">Dowolne</option>
                  <option value="Heat pump">Pompa ciepła</option>
                  <option value="Furnace">Piec</option>
                  <option value="Eco-pea stove">Piec na eko groszek</option>
                  <option value="Gas furnace">Piec gazowy</option>
                  <option value="Electric heating">Ogrzewanie elektryczne</option>
                  <option value="Solar panels">Kolektory słoneczne</option>
                  <option value="Lack">Brak</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="form-group">
                <label>Wykończenie</label>
                <select
                  name="condition"
                  value={advancedSearch.condition}
                  onChange={handleAdvancedSearchChange}
                  >
                  
                  <option value="">Dowolne</option>
                  <option value="Formalities">Fromalności przed</option>
                  <option value="Zero condition">Stan zerowy</option>
                  <option value="Open basic condition">Stan surowy otwarty</option>
                  <option value="Close basic condition">Stan surowy zamknięty</option>
                  <option value="Finishing works">Prace wykończeniowe</option>
                  <option value="Finished">Gotowy</option>
                </select>
              </div>
              <div className="form-group">
                <label>Rynek</label>
                <select
                name="market"
                value={advancedSearch.market}
                onChange={handleAdvancedSearchChange}>
                  <option value="">Dowolny</option>
                  <option value="Wtórny">Wtórny</option>
                  <option value="Pierwotny">Pierwotny</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Ilość pokoi</label>
                <input type="number" placeholder="Dowolne" min="0" 
                name="nr_rooms" // Dodaj nazwę pola, musi odpowiadać kluczowi w stanie advancedSearch
                value={advancedSearch.nr_rooms}
                onChange={handleAdvancedSearchChange} // Obsługa zmiany
                />
              </div>
              <div className="form-group">
                <label>Ilość łazienek</label>
                <input type="number" placeholder="Dowolne" min="0" 
                name="nr_bathrooms" // Dodaj nazwę pola, musi odpowiadać kluczowi w stanie advancedSearch
                value={advancedSearch.nr_bathrooms}
                onChange={handleAdvancedSearchChange} // Obsługa zmiany
                />
              </div>
              <div className="form-group">
                <label>Ilość garaży</label>
                <input type="number" placeholder="Dowolne" min="0" 
                name="nr_garages" // Dodaj nazwę pola, musi odpowiadać kluczowi w stanie advancedSearch
                value={advancedSearch.nr_garages}
                onChange={handleAdvancedSearchChange} // Obsługa zmiany
                />
              </div>
              <div className="form-group">
                <label>Ilość balkonów</label>
                
                <input type="number" placeholder="Dowolne" min="0" 
                name="nr_balconies" // Dodaj nazwę pola, musi odpowiadać kluczowi w stanie advancedSearch
                value={advancedSearch.nr_balconies}
                onChange={handleAdvancedSearchChange} // Obsługa zmiany
                />
                  
                
              </div>
            </div>
            <div className="form-row">
             
              <div className="form-group">
                <label>Województwo</label>
                <select
                name="region"
                value={advancedSearch.region}
                onChange={handleAdvancedSearchChange}
                
                >
                  <option value="">Dowolne</option>
                  <option value="Dolnośląskie">Dolnośląskie</option>
                  <option value="Kujawsko-Pomorskie">Kujawsko-Pomorskie</option>
                  <option value="Lubelskie">Lubelskie</option>
                  <option value="Lubuskie">Lubuskie</option>
                  <option value="Łódzkie">Łódzkie</option>
                  <option value="Małopolskie">Małopolskie</option>
                  <option value="Mazowieckie">Mazowieckie</option>
                  <option value="Opolskie">Opolskie</option>
                  <option value="Podkarpackie">Podkarpackie</option>
                  <option value="Podlaskie">Podlaskie</option>
                  <option value="Pomorskie">Pomorskie</option>
                  <option value="Śląskie">Śląskie</option>
                  <option value="Świętokrzyskie">Świętokrzyskie</option>
                  <option value="Warmińsko-Mazurskie">Warmińsko-Mazurskie</option>
                  <option value="Wielkopolskie">Wielkopolskie</option>
                  <option value="Zachodniopomorskie">Zachodniopomorskie</option>
                </select>
              </div>
              <div className="form-group">
                <label>Gmina</label>
                <input type="text" placeholder="Dowolne" 
                name="district" // Dodaj nazwę pola, musi odpowiadać kluczowi w stanie advancedSearch
                value={advancedSearch.district}
                onChange={handleAdvancedSearchChange} // Obsługa zmiany
                />
              </div>
            </div>
            <div className="form-row">
              <button type="button" className="reset-button">Wyczyść</button>
              <button type="submit" className="submit-button">Wyszukaj</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
