import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './editProfilePasswordPopUp.css';

const EditProfilePasswordPopUp = ({ showPopup, setShowPopup, userId, setDataUpdated }) => {
  const handleSave = () => {
    // Check if the form is empty or the passwords do not match
    if (!password || !confirmPassword) {
      setNotification('No field can be left empty');
      return;
    }
  
    if (password.length < 8) {
      setNotification('Password should be at least 8 characters long');
      return;
    }
  
    if (password !== confirmPassword) {
      setNotification('Passwords do not match');
      return;
    }
  
    // Prepare the data to be sent
    const data = {
      password: password,
      password_repeat: confirmPassword
    };
  
    // Send a PATCH request to update the user data
    axios.patch(`http://127.0.0.1:5000/patch/${userId}/password`, data)
      .then(response => {
        console.log('Password updated successfully');
        setNotification('Password updated successfully');
        setDataUpdated(true);
        setPassword(''); // Clear the form
        setConfirmPassword(''); // Clear the form
      })
      .catch(error => {
        console.error('Error updating password', error);
        setNotification('Error updating password');
      });
  };
  
  const handleClose = () => {
    setPassword(''); // Clear the form
    setConfirmPassword(''); // Clear the form
    setNotification(null); // Clear the notification
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className='popup'>
      <div className='popup_inner'>
        Zmień hasło
        {notification && <div className="notification">{notification}</div>}
        <form className='popup-window-password-data'>
          <label className='popup-window-password-data' htmlFor="password">Hasło:</label>
          <input className='popup-window--password-data-input'
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <label className='popup-window-password-data' htmlFor="confirmPassword">Powtórz Hasło:</label>
          <input className='popup-window--password-data-input'
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <button className='button-popupWindow-Password' onClick={handleSave}>Zapisz</button>
          <button className='button-popupWindow-Password' onClick={handleClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePasswordPopUp;
