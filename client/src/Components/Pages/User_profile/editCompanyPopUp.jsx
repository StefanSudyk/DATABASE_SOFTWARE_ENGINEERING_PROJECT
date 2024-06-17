import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './editCompanyPopUp.css'

const EditCompanyPopup = ({ showPopupCompany, setShowPopupCompany, companyId, dataUpdated }) => {
  const [companyName, setCompanyName] = useState('');
  const [regonNumber, setRegonNumber] = useState('');
  const [nipNumber, setNipNumber] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [companyType, setCompanyType] = useState('');

  const [userId, setUserId] = useState('');

  // Fetch data from your API when the popup opens
  useEffect(() => {
    const fetchUserData = async () => {
    
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/get/${userId}`);
        const userData = response.data;

        // Update state variables with the fetched user data
        setFirstName(userData.name || '');
        setLastName(userData.surname || '');
        setEmail(userData.email || '');
        setPhoneNumber(userData.phone_number || '');
        // Assuming the user data includes a userId field
        setUserId(userData.id_user);
        setCompanyId(userData.id_company);
      } catch (error) {
        console.error(`Error fetching user data: ${error}`);
      }
      
    };

    if (userId || dataUpdated) {
      fetchUserData();
      dataUpdated(false);
    }
  }, [userId, dataUpdated]); 

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!companyId) {
        return;
      }
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/getcompany/${companyId}`);
        const companyData = response.data;

        // Update state variables with the fetched company data
        setCompanyName(companyData.cp_name || '');
        setRegonNumber(companyData.REGON || '');
        setNipNumber(companyData.NIP || '');
        setPostalCode(companyData.postal_code || '');
        setCity(companyData.city || '');
        setStreet(companyData.street || '');
        setBuildingNumber(companyData.house_number || '');
        setCompanyType(companyData.cp_type || '');
      } catch (error) {
        console.error(`Error fetching company data: ${error}`);
      }
    };

    if (showPopupCompany) {
      fetchCompanyData();
    }
  }, [showPopupCompany, companyId, dataUpdated]); // Run this effect when showPopupCompany or companyId changes

  const handleSave = async () => {
    console.log('Zapisz button clicked'); // Debug message
    const formData = {
      cp_name: companyName,
      REGON: regonNumber,
      NIP: nipNumber,
      postal_code: postalCode,
      city: city,
      street: street,
      house_number: buildingNumber,
      cp_type: companyType
    };
    console.log('Form data:', formData); // Debug message
  
    try {
      console.log(`Sending PUT request to ${apiUrl}/updatecompany/${companyId}`); // Debug message
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.put(`${apiUrl}/updatecompany/${companyId}`, formData);
    
      console.log('Response:', response); // Debug message
    
      if (response.status === 200) { // Usually, a successful PATCH request returns a 200 status code
        console.log('Company updated successfully');
        setShowPopupCompany(false); // Close the window
      } else {
        console.log('Unexpected status code:', response.status); // Debug message
      }
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  if (!showPopupCompany) return null;

  return (
    <div className='popup'>
      <div className='popup_inner'>
        Dane firmy
        <form className='popup-window-company-data' onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
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
          <label className='popup-window-company-add' htmlFor="city">Miasto:</label>
          <input className='popup-window--company-add-input'
            type="text"
            id="city"
            value={city}
            onChange={e => setCity(e.target.value)}
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
          <select className='popup-window--company-data-input'
            id="companyType"
            value={companyType}
            onChange={e => setCompanyType(e.target.value)}
          >
            <option value="Developer">Developer</option>
            <option value="Estate agency">Estate Agency</option>
          </select>
          <div className="popup-company-button-container">
          <button className='button-popupWindow-Company' type='submit' >Zapisz</button>
          <button className='button-popupWindow-Company' onClick={() => setShowPopupCompany(false)}>Close</button>
          </div>
        </form>
    </div>
  </div>
);
}

export default EditCompanyPopup;