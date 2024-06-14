import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './OfferDetails.css';

const OfferDetails = () => {
  const { property_id } = useParams();
  const [property, setProperty] = useState(null);


  console.log(property_id)
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/getproperty/${property_id}`);
        console.log('API response:', response.data); 
        setProperty(response.data);
      } catch (error) {
        console.error('Failed to fetch property:', error);
      }
    };
  
    fetchProperty();
  }, [property_id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className='Offer-Details-container'>
      <div className="property-image">
      <img src={`data:image/png;base64,${property.photo}`} alt="Property" />
        <div className="property-contact">Contact: Kamila Pilaczyńska</div>
      </div>
      <div className="property-details">
        <h2>{property.title}</h2>
        <p>Cena: {property.price} PLN</p>
        <p>Metraż: {property.square_metrage} m²</p>
        <p>Rodzaj nieruchomości: {property.type}</p>
        <p>Lokalizacja: {property.location}</p>
        <p>Rynek: {property.market}</p>
        <p>Liczba pokoi: {property.nr_rooms}</p>
        <p>Balkonów: {property.nr_balconies}</p>
        <p>Piętro: {property.nr_floors}</p>
        <p>Liczba garaży: {property.nr_garages}</p>
        <p>City: {property.locality}</p>
      </div>    
    </div>
  );
};

export default OfferDetails;
