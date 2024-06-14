import React, { useState } from 'react';
import '../SearchBar/SearchBar.css';




const SearchBar = () => {
  const [selectedOption, setSelectedOption] = useState('Wszystkie');
  const [expandBackground, setExpandBackground] = useState(false);
  const [showContent, setShowContent] = useState(false);

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


  
  return (
    <div className={`wyszukaj ${expandBackground ? 'expanded' : ''}`}>
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
                <select>
                  <option>Dowolne</option>
                  <option value="Apartment"> Mieszkanie</option>
                  <option value="House">Dom</option>
                  <option value="Terraced house">Szeregówka</option>
                  <option value>Inne</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="form-group">
                <label>Cena</label>
                <input  type="number" placeholder="Od" min="0" />
                <input type="number" placeholder="Do" min="0" />
              </div>
              <div className="form-group">
                <label>Metraż w m²</label>
                <input type="number" placeholder="Dowolne w m²" min="0" />
              </div>
              <div className="form-group">
                <label>Ilość pięter</label>
                <input type="number" placeholder="Dowolne" min="0" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="mniejszyText">Miejsce parkingowe</label>
                <select>
                  <option>Dowolne</option>
                  <option>Tak</option>
                  <option>Nie</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="mniejszyText">Rodzaj ogrzewania</label>
                <select>
                  <option>Dowolne</option>
                  <option>Pompa ciepła</option>
                  <option>Piec</option>
                  <option>Piec na eko groszek</option>
                  <option>Piec gazowy</option>
                  <option>Ogrzewanie elektryczne</option>
                  <option>Kolektory słoneczne</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="form-group">
                <label>Wykończenie</label>
                <select>
                  <option>Dowolne</option>
                  <option>Fromalności przed</option>
                  <option>Stan zerowy</option>
                  <option>Stan surowy otwarty</option>
                  <option>Stan surowy otwarty</option>
                  <option>Stan surowy zamknięty</option>
                  <option>Prace wykończeniowe</option>
                  <option>Gotowy</option>
                </select>
              </div>
              <div className="form-group">
                <label>Rynek</label>
                <select>
                  <option>Dowolny</option>
                  <option>Wtórny</option>
                  <option>Pierwotny</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Ilość pokoi</label>
                <input type="number" placeholder="Dowolne" min="0" />
              </div>
              <div className="form-group">
                <label>Ilość łazienek</label>
                <input type="number" placeholder="Dowolne" min="0" />
              </div>
              <div className="form-group">
                <label>Ilość garaży</label>
                <input type="number" placeholder="Dowolne" min="0" />
              </div>
              <div className="form-group">
                <label>Ilość balkonów</label>
                
                <input type="number" placeholder="Dowolne" min="0" />
                  {/* Add more options as needed */}
                
              </div>
            </div>
            <div className="form-row">
             
              <div className="form-group">
                <label>Województwo</label>
                <select>
                  <option>Dowolne</option>
                  <option>Dolnośląskie</option>
                  <option>Kujawsko-Pomorskie</option>
                  <option>Lubelskie</option>
                  <option>Lubuskie</option>
                  <option>Łódzkie</option>
                  <option>Małopolskie</option>
                  <option>Mazowieckie</option>
                  <option>Opolskie</option>
                  <option>Podkarpackie</option>
                  <option>Podlaskie</option>
                  <option>Pomorskie</option>
                  <option>Śląskie</option>
                  <option>Świętokrzyskie</option>
                  <option>Warmińsko-Mazurskie</option>
                  <option>Wielkopolskie</option>
                  <option>Zachodniopomorskie</option>
                </select>
              </div>
              <div className="form-group">
                <label>Gmina</label>
                <input type="text" placeholder="Dowolne" />
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
