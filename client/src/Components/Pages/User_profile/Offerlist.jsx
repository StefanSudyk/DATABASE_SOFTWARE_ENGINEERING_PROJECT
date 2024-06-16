import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OfferBox from './Offerblock.jsx'; 
import './Offerlist.css'

function OfferList() {
  const [offers, setOffers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [dataUpdated, setRefresh] = useState(false); // Add this line

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/currentuser`, {
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
    const apiUrl = process.env.REACT_APP_API_URL;
    axios.get(`${apiUrl}/getallproperty?user=${userId}`)
      .then(response => {
        console.log('Response data:', response.data); // Debug message
        setOffers(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [userId, dataUpdated]);
  
  return (
    <div>
      {offers.map((offer, index) => {
        console.log(`Rendering offer ${index}:`, offer); // Debug message
        return <OfferBox key={index} offer={offer} setRefresh={setRefresh} />;
      })}
    </div>
  );
}

export default OfferList;
