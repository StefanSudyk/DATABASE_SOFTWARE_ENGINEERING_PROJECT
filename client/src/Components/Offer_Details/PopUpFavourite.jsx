import React from 'react';
import './PopUpFavourite.css'

const Popup = ({ isOpen, closePopup, handleRegisterLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-container">
    <div className="popup-content">
      <span className="close-btn" onClick={closePopup}>&times;</span>
      <p className="popup-header">Zapisz ogłoszenie</p>
      <p className="popup-text">Aby zapisać ogłoszenie, zaloguj się na swoje konto lub dokonaj rejestracji.</p>
      <p className="popup-text">Dzięki temu otrzymasz szybki dostęp do swoich zapisanych ofert z dowolnego miejsca i dowolnego urządzenia.</p>
      <button className="popup-button" onClick={handleRegisterLogin}>Zarejestruj się / Zaloguj</button>
    </div>
  </div>
);
};

export default Popup;