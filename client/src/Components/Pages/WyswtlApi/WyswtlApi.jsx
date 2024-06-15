import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importowanie useNavigate
import '../WyswtlApi/WyswtlApi.css';

axios.defaults.withCredentials = true;

const WyswietlApi = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // Inicjalizacja hooka useNavigate

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
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.post(`${apiUrl}/logout`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      localStorage.removeItem('token');
      setUserData(null);
      console.log('Logged out successfully');
      navigate('/'); // Przekierowanie do strony głównej
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className='wylog_zalog'>
      {userData ? (
        <div className='navbar_use_wyloguj'>
          Witaj, {userData.name}
          <button onClick={handleLogout}>Wyloguj</button>
        </div>
      ) : (
        <div className='navbar_use_zaloguj'>
          Zaloguj się!
        </div>
      )}
    </div>
  );
};

export default WyswietlApi;
