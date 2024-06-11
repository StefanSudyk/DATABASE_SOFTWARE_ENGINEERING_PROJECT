// OfferBlock.jsx
import React, { useState } from 'react';
import './Offerblock.css'; // Assuming you have a CSS file for styling
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import ConfirmationPopup from './confirmationPopUp.jsx'; // Import the ConfirmationPopup component
import EditPropertyPopUp from './editPropertyPopUp.jsx';

function OfferBlock({ offer, setRefresh}) {
  
  const { property } = offer;
  const { publication_date, sponsored, title } = property;

  const dateOnly = publication_date.split(' ').slice(0, 4).join(' ');

  // State for the confirmation popup
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);

  // State for the edit popup
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);

  // Handler for the Delete button
  const handleDelete = () => {
    console.log('Delete button clicked'); // Debug message
    setConfirmIsOpen(true);
  };

  // Handler for the Confirm button in the confirmation popup
  const handleConfirm = async () => {
    // Delete the property here
    // You might need to adjust the URL and the method according to your backend
    await axios.delete(`http://127.0.0.1:5000/deleteproperty/${property.id_property}`);
    setRefresh(true); // Set dataUpdated to true after deleting the property
    // Close the confirmation popup
    setConfirmIsOpen(false);
    // Do something after the property is deleted
    
  };

  const handleEdit = () =>{
    setEditIsOpen(true);
    setCurrentProperty(property.id_property); // Set currentProperty to property.id_property
  };


  console.log(setRefresh)

  // Handler for the Close button in the confirmation popup
  const handleClose = () => {
    setConfirmIsOpen(false);
  };

  return (
    <div className="offer-box">
      <h2>{title}</h2>
      <p>Data publikacji: {dateOnly}</p> {/* Use dateOnly here */}
      <p>Promowane: {sponsored ? 'Tak' : 'Nie'}</p>
      <div className="button-container">
      <button className='profile-button-style' onClick={handleEdit}>Edytuj</button>
        <button className='profile-button-style' onClick={handleDelete}>Usuń</button>
      </div>
      <ConfirmationPopup isOpen={confirmIsOpen} onConfirm={handleConfirm} onClose={handleClose} />
      <EditPropertyPopUp isOpen={editIsOpen} property={currentProperty} onClose={() => setEditIsOpen(false)} 
      setRefresh={setRefresh} />
    </div>
  );
}

export default OfferBlock;
