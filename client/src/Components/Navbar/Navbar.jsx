import React, { useState, useEffect } from 'react';
import './Navbar.css';
import main_logo from '../../assets/main_logo.png';
import { Link } from "react-router-dom";
import axios from 'axios';
import WyswietlApi from '../Pages/WyswtlApi/WyswtlApi';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refresh, setRefresh] = useState(0); // Stan do wymuszenia odświeżenia

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      console.log('Retrieved token:', token); // Debug log to check token

      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:5000/currentuser", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('API response:', response.data); // Debug log to check API response

        // Check if the email exists in the user data
        if (response.status === 200 && response.data && response.data.email) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoggedIn(false);
      }
    };
    checkUser();
  }, [refresh]); // Dependency on refresh state to force re-render



  return (
    <div className='navbar'>
      <Link to="/" >
        <img src={main_logo} className='logo' alt="main logo" />
      </Link>
      <ul>
        {isLoggedIn ? (
          <li>
            <Link to="/User_profile" ><WyswietlApi/></Link>
          </li>
        ) : (
          <li>
            <Link to="/Zaloguj" ><WyswietlApi/></Link>
          </li>
        )}
        <li>
          <Link to="/Dodaj_ogloszenie" className='DodajOgloszenie' >Dodaj ogłoszenie</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
