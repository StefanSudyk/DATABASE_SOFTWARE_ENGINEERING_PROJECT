import React, { useEffect, useState} from 'react'
import './Profile_view.css'
import Footer from '../../Footer/Footer.jsx'
import axios from 'axios';
import Offer_block from './Offer_block.jsx'

const ProfileView = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted!');
  };

  return (
    <div className="container">
      <div className="content-container">
        <div className="form-container">
          <form className='profile-form'>
            <label className='profile-form-label' htmlFor="firstName">Imię: </label>
            <input className='profile-input'
              type="text"
              id="firstName"
              value={firstName}
              disabled
            />

            <label className='profile-form-label' htmlFor="lastName">Nazwisko:</label>
            <input className='profile-input'
              type="text"
              id="lastName"
              value={lastName}
              disabled
            />

            <label className='profile-form-label' htmlFor="email">E-mail:</label>
            <input className='profile-input'
              type="email"
              id="email"
              value={email}
              disabled
            />

            <label className='profile-form-label' htmlFor="phoneNumber">Numer telefonu:</label>
            <input className='profile-input'
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              disabled
            />

            <label className='profile-form-label' htmlFor="password">Hasło:</label>
            <input className='profile-input'
              type="password"
              id="password"
              value={password}
              disabled
            />

            <label className='profile-form-label' htmlFor="confirmPassword">Powtórz Hasło:</label>
            <input className='profile-input'
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              disabled
            />

            <button className='Edit'>
                Edytuj
            </button>
          </form>
        </div>
        <div className='conent-second-column'>
            <button className='profile-button-style'>
              Dodaj
            </button>

            <button className='profile-button-style'>
              Dodaj
             </button>
        </div>
        <div className='profile-third-column'>
          <div className="third-column-content">
            <Offer_block />
          </div>
        </div>  
      </div>
      <Footer />
    </div>
  );
};

export default ProfileView;