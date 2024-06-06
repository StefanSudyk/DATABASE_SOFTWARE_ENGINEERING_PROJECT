import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Offer_block.css"

function OfferBox() {
  const [offer, setOffer] = useState({ title: '', date: '' });

  useEffect(() => {
    axios.get('API_URL')
      .then(response => {
        setOffer(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div className="offer-container">
      <h2>{offer.title}</h2>
      <p>{offer.date}</p>
      <button onClick={() => { /* Logic to edit offer goes here */ }}>Edit</button>
      <button onClick={() => { /* Logic to delete offer goes here */ }}>Delete</button>
    </div>
  );
}

export default OfferBox;
