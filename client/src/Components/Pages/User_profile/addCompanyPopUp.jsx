import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './addCompanyPopUp.css'

const AddCompanyPopUp = ({ showAddPopupCompany, setShowAddPopupCompany, setDataUpdated}) => {
  // Add state variables for each field in the form
  const [companyName, setCompanyName] = useState('');
  const [regonNumber, setRegonNumber] = useState('');
  const [nipNumber, setNipNumber] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/currentuser`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const userData = response.data;

        setUserId(userData.id_user);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

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
      cp_type: companyType,
      id_user: userId
    };
    console.log('Form data:', formData); // Debug message
  
    try {
      console.log('Sending POST request to http://127.0.0.1:5000/postcompany'); // Debug message
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/postcompany`, formData);
  
      console.log('Response:', response); // Debug message
  
      if (response.status === 201) {
        console.log('Company added successfully');
        setDataUpdated(true);  // If you want to trigger a re-render or fetch in parent component
        setShowAddPopupCompany(false); // Close the window

      }
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  if (!showAddPopupCompany) return null; // Add this line

  return (
    <div className='popup'>
      <div className='popup_inner'>
        Dane firmy
        <form className='popup-window-company-add' onSubmit={(e) => { e.preventDefault(); handleSave(); }} >
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
          <div className='company-popupWindow-container'>
          <button className='button-popupWindow-Company' type="submit" >Zapisz</button>
          <button className='button-popupWindow-Company' onClick={() => 
            {
              setShowAddPopupCompany(false);
            }}
            
            >Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompanyPopUp;
