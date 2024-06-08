import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './addCompanyPopUp.css'


const AddCompanyPopUp = ({ showAddPopupCompany, setShowAddPopupCompany, setDataUpdated }) => {
  // Add state variables for each field in the form
  const [companyName, setCompanyName] = useState('');
  const [regonNumber, setRegonNumber] = useState('');
  const [nipNumber, setNipNumber] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [companyType, setCompanyType] = useState('');

  const handleSave = async () => {
    console.log('Zapisz button clicked'); // Debug message
    const formData = {
      cp_name: companyName,
      REGON: regonNumber,
      NIP: nipNumber,
      postal_code: postalCode,
      street: street,
      city: city,
      house_number: buildingNumber,
      cp_type: companyType
    };
    console.log('Form data:', formData); // Debug message
  
    try {
      console.log('Sending POST request to http://127.0.0.1:5000/postcompany'); // Debug message
      const response = await axios.post('http://127.0.0.1:5000/postcompany', formData);
  
      console.log('Response:', response); // Debug message
  
      if (response.status === 201) {
        console.log('Company added successfully');
        setDataUpdated(true);  // If you want to trigger a re-render or fetch in parent component
      } else {
        console.log('Unexpected status code:', response.status); // Debug message
      }
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  return (
    <div className='popup'>
      <div className='popup_inner'>
        Dane firmy
        <form className='popup-window-company-add' onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <label className='popup-window-company-add' htmlFor="companyName">Nazwa Firmy: </label>
          <input className='popup-window--company-add-input'
            type="text"
            id="companyName"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
          />

          <label className='popup-window-company-add' htmlFor="regonNumber">Numer REGON:</label>
          <input className='popup-window--company-add-input'
            type="text"
            id="regonNumber"
            value={regonNumber}
            onChange={e => setRegonNumber(e.target.value)}
          />

          <label className='popup-window-company-add' htmlFor="nipNumber">NIP:</label>
          <input className='popup-window--company-add-input'
            type="text"
            id="nipNumber"
            value={nipNumber}
            onChange={e => setNipNumber(e.target.value)}
          />

          <label className='popup-window-company-add' htmlFor="postalCode">Kod pocztowy:</label>
          <input className='popup-window--company-add-input'
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
          />

          <label className='popup-window-company-add' htmlFor="street">Ulica:</label>
          <input className='popup-window--company-add-input'
            type="text"
            id="street"
            value={street}
            onChange={e => setStreet(e.target.value)}
          />
          <label className='popup-window-company-add' htmlFor="city">Miasto:</label>
          <input className='popup-window--company-add-input'
            type="text"
            id="city"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <label className='popup-window-company-add' htmlFor="buildingNumber">Numer Budynku:</label>
          <input className='popup-window--company-add-input'
            type="text"
            id="buildingNumber"
            value={buildingNumber}
            onChange={e => setBuildingNumber(e.target.value)}
          />
          <label className='popup-window-company-add' htmlFor='companyType'>Typ firmy: </label>
          <select className='popup-window--company-add-input' id="CompanyType"
          value={companyType} onChange={e => setCompanyType(e.target.value)}>
            <option value="Developer">Developer</option>
            <option value="Estate agency">Estate Agency</option>
          </select>

          <button className='button-popupWindow-Company' type="submit">Zapisz</button>
          <button className='button-popupWindow-Company' onClick={() => 
            {
              setShowAddPopupCompany(false);
            }}
            
            >Close</button>
        </form>
      </div>
    </div>
  );
};

export default AddCompanyPopUp;
