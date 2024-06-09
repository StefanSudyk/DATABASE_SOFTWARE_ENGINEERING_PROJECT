import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OfferBox from './Offerblock.jsx'; 
import './Offerlist.css'

function OfferList() {
  const [offers, setOffers] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        
        const response = await axios.get("http://127.0.0.1:5000/currentuser", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const userData = response.data;

        console.log('User data:', userData); // Debug message
        setUserId(userData.id_user);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    console.log(`Fetching properties for user ${userId}`); // Debug message
    axios.get(`http://127.0.0.1:5000/getallproperty?user=${userId}`)
      .then(response => {
        console.log('Response data:', response.data); // Debug message
        setOffers(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [userId]);

  return (
    <div>
      {offers.map((offer, index) => {
        console.log(`Rendering offer ${index}:`, offer); // Debug message
        return <OfferBox key={index} offer={offer} />;
      })}
    </div>
  );
}

export default OfferList;
