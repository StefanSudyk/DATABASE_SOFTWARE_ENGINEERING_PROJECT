import React from 'react';
import './confirmationPopUp.css';

function ConfirmationPopup({ isOpen, onConfirm, onClose }) {

  if (!isOpen) {
    return null;
  }

  return (
    <div className='popup-background'>
    <div className="confirmation-popup">
      <p className=''>Are you sure you want to delete this property?</p>
      <div className='confirmation-button-container'>
      <button className='confirmation-notification-button' onClick={onClose}>Cancel</button>
      <button className='confirmation-notification-button' onClick={onConfirm}>Confirm</button>
      </div>
    </div>
    </div>
  );
}

export default ConfirmationPopup;

