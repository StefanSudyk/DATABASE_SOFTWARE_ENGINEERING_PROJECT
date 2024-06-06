import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to install axios
import './editCompanyPopUp.css'

const EditCompanyPopup = ({ showPopupCompany, setShowPopupCompany }) => {
  const [companyName, setCompanyName] = useState('');
  const [regonNumber, setRegonNumber] = useState('');
  const [nipNumber, setNipNumber] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [street, setStreet] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [companyType, setCompanyType] = useState('');

  // Fetch data from your API when the popup opens
  useEffect(() => {
    if (showPopupCompany) {
      axios.get('/your-api-endpoint') // Replace with your API endpoint
        .then(response => {
          setCompanyName(response.data.companyName);
          setRegonNumber(response.data.regonNumber);
          setNipNumber(response.data.nipNumber);
          setPostalCode(response.data.postalCode);
          setStreet(response.data.street);
          setBuildingNumber(response.data.buildingNumber);
          setCompanyType(response.data.companyType);
        })
        .catch(error => {
          console.error('Error fetching data', error);
        });
    }
  }, [showPopupCompany]);

  const handleSave = () => {

    axios.post('/your-api-endpoint', { companyName, regonNumber, nipNumber, postalCode, street, buildingNumber, companyType }) // Replace with your API endpoint
      .then(response => {
        console.log('Data saved successfully');
      })
      .catch(error => {
        console.error('Error saving data', error);
      });

  
    setshowPopupCompany(false);
  };

  if (!showPopupCompany) return null;

  return (
    <div className='popup'>
      <div className='popup_inner'>
        Dane firmy
        <form className='popup-window-company-data'>
          <label className='popup-window-company-data' htmlFor="companyName">Nazwa Firmy: </label>
          <input className='popup-window--company-data-input'
            type="text"
            id="companyName"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
          />
          <label className='popup-window-company-data' htmlFor="regonNumber">Numer REGON:</label>
          <input className='popup-window--company-data-input'
            type="text"
            id="regonNumber"
            value={regonNumber}
            onChange={e => setRegonNumber(e.target.value)}
          />
          <label className='popup-window-company-data' htmlFor="nipNumber">NIP:</label>
          <input className='popup-window--company-data-input'
            type="text"
            id="nipNumber"
            value={nipNumber}
            onChange={e => setNipNumber(e.target.value)}
          />
          <label className='popup-window-company-data' htmlFor="postalCode">Kod pocztowy:</label>
          <input className='popup-window--company-data-input'
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
          />
          <label className='popup-window-company-data' htmlFor="street">Ulica:</label>
          <input className='popup-window--company-data-input'
            type="text"
            id="street"
            value={street}
            onChange={e => setStreet(e.target.value)}
          />
          <label className='popup-window-company-data' htmlFor="buildingNumber">Numer Budynku:</label>
          <input className='popup-window--company-data-input'
            type="text"
            id="buildingNumber"
            value={buildingNumber}
            onChange={e => setBuildingNumber(e.target.value)}
          />
          <label className='popup-window-company-data' htmlFor="companyType">Typ firmy:</label>
          <input className='popup-window--company-data-input'
            type="text"
            id="companyType"
            value={companyType}
            onChange={e => setCompanyType(e.target.value)}
          />
          <button className='button-popupWindow-Company' onClick={handleSave}>Zapisz</button>
          <button className='button-popupWindow-Company' onClick={() => setShowPopupCompany(false)}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default EditCompanyPopup;