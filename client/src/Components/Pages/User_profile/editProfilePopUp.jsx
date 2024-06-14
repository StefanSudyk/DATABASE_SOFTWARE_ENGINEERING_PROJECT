import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './editProfilePopUp.css'

const EditProfilePopup = ({ showPopup, setShowPopup, userId, setDataUpdated}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Fetch data from your API when the popup opens
  useEffect(() => {
    if (showPopup) {
      axios.get(`http://127.0.0.1:5000/get/${userId}`) // Fetch user data
        .then(response => {
          const userData = response.data;
          setFirstName(userData.name || '');
          setLastName(userData.surname || '');
          setEmail(userData.email || '');
          setPhoneNumber(userData.phone_number || '');
        })
        .catch(error => {
          console.error('Error fetching data', error);
        });
    }
  }, [showPopup, userId]);
  
  const handleSave = () => {
    // Prepare the data to be sent
    const data = {
      name: firstName,
      surname: lastName,
      email: email,
      phone_number: phoneNumber,
      // Add other fields as needed
    };
  
    // Send a PATCH request to update each user data field
    Object.keys(data).forEach((field) => {
      axios.patch(`http://127.0.0.1:5000/patch/${userId}/${field}`, { [field]: data[field] })
        .then(response => {
          console.log(`Data ${field} saved successfully`);
          setDataUpdated(true);
        })
        .catch(error => {
          console.error(`Error saving data ${field}`, error);
        });
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
      <button className='button-popupWindow-Edit' onClick={handleSave}>Zapisz</button>
      <button className='button-popupWindow-Edit' onClick={() => setShowPopup(false)}>Close</button>
    </form>
  </div>
</div>
);
};

export default EditProfilePopup;