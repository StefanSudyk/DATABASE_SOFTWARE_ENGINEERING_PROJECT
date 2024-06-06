import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to install axios
import './editProfilePopUp.css'

const EditDataPopup = ({ showPopup, setShowPopup }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Fetch data from your API when the popup opens
  useEffect(() => {
    if (showPopup) {
      axios.get('/your-api-endpoint') // Replace with your API endpoint
        .then(response => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setPhoneNumber(response.data.phoneNumber);
          setPassword(response.data.password);
          setConfirmPassword(response.data.confirmPassword);
        })
        .catch(error => {
          console.error('Error fetching data', error);
        });
    }
  }, [showPopup]);

  const handleSave = () => {

    axios.post('/your-api-endpoint', { firstName, lastName, email, phoneNumber, password, confirmPassword }) // Replace with your API endpoint
      .then(response => {
        console.log('Data saved successfully');
      })
      .catch(error => {
        console.error('Error saving data', error);
      });

  
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className='popup'>
  <div className='popup_inner'>
    Edytuj dane
    <form className='popup-window-edit-data'>
      <label className='popup-window-edit-data' htmlFor="firstName">Imię: </label>
      <input className='popup-window--edit-data-input'
        type="text"
        id="firstName"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <label className='popup-window-edit-data' htmlFor="lastName">Nazwisko:</label>
      <input className='popup-window--edit-data-input'
        type="text"
        id="lastName"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
      <label className='popup-window-edit-data' htmlFor="email">E-mail:</label>
      <input className='popup-window--edit-data-input'
        type="email"
        id="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <label className='popup-window-edit-data' htmlFor="phoneNumber">Numer telefonu:</label>
      <input className='popup-window--edit-data-input'
        type="tel"
        id="phoneNumber"
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
      />
      <label className='popup-window-edit-data' htmlFor="password">Hasło:</label>
      <input className='popup-window--edit-data-input'
        type="password"
        id="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <label className='popup-window-edit-data' htmlFor="confirmPassword">Powtórz Hasło:</label>
      <input className='popup-window--edit-data-input'
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
      />
      <button className='button-popupWindow-Edit' onClick={handleSave}>Zapisz</button>
      <button className='button-popupWindow-Edit' onClick={() => setShowPopup(false)}>Close</button>
    </form>
  </div>
</div>
);
};

export default EditDataPopup;
