// ConfirmationPopup.jsx
import React from 'react';
import './confirmationPopUp.css';

function ConfirmationPopup({ isOpen, onConfirm, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="confirmation-popup">
      <h2>Are you sure you want to delete this property?</h2>
      <button onClick={onConfirm}>Delete</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default ConfirmationPopup;

