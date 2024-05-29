import React from 'react';
import './modal.css';

const Modal = ({ show, onClose, message }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>Zamknij</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
