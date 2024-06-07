import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const WyswietlApi = () => {
  const [userData, setUserData] = useState(null);

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
      await axios.post("http://127.0.0.1:5000/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      localStorage.removeItem('token');
      setUserData(null);
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <div className='first_line'>
        To jest pierwsza linijka
      </div>
      {userData ? (
        <div>
          <h2>Dane użytkownika:</h2>
          <p>Witaj, {userData.name}</p>
          {/* Wyświetl inne informacje o użytkowniku */}
          <button onClick={handleLogout}>Wyloguj</button>
        </div>
      ) : (
        <div>
          <h2>Nie jesteś zalogowany</h2>
        <p>Zaloguj się!</p>
        </div>
      )}
    </div>
  );
};

export default WyswietlApi;

