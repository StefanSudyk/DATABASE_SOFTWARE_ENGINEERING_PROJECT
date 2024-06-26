import React, { useEffect, useState} from 'react'
import './Profile_view.css'
import Footer from '../../Footer/Footer.jsx'
import axios from 'axios';
import EditProfilePopup from './editProfilePopUp.jsx'; 
import EditCompanyPopup from './editCompanyPopUp.jsx';
import EditPasswordPopUp from './editProfilePasswordPopUp.jsx';
import AddCompanyPopUp from './addCompanyPopUp.jsx';
import OfferList from './Offerlist.jsx';
import ButtonBack from '../Strona_glowna/ButtonBack/ButtonBack.jsx';

const ProfileView = () => {
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [companyName, setCompanyName] = useState('');
  const [regonNumber, setRegonNumber] = useState('');
  const [nipNumber, setNipNumber] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [street, setStreet] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [city, setCity] = useState('');
  const [companyType, setCompanyType] = useState('');

  //definition of constant to popupWindow
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupCompany, setShowPopupCompany] = useState(false);
  const [showPasswordPopUp, setShowPasswordPopUp] = useState(false);
  const [showAddPopupCompany, setShowAddPopupCompany] = useState(false);

  const [dataUpdated, setDataUpdated] = useState(false);

  const [userId, setUserId] = useState(null);
  const [companyId, setCompanyId] = useState(null);

useEffect(() => {
  const fetchCompanyData = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/getcompany/${companyId}`);
      const companyData = response.data;

      // Update state variables with the fetched company data
      setCompanyName(companyData.cp_name || '');
      setRegonNumber(companyData.REGON || '');
      setNipNumber(companyData.NIP || '');
      setPostalCode(companyData.postal_code || '');
      setStreet(companyData.street || '');
      setCity(companyData.city || '');
      setBuildingNumber(companyData.house_number || '');
      setCompanyType(companyData.cp_type || '');
    } catch (error) {
      console.error(`Error fetching company data: ${error}`);
    }
  };

  if (companyId ) {
    fetchCompanyData();
  }
}, [companyId]); 


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

        // Update state variables with the fetched user data
        setFirstName(userData.name || '');
        setLastName(userData.surname || '');
        setEmail(userData.email || '');
        setPhoneNumber(userData.phone_number || '');
        // Assuming the user data includes a userId field
        setUserId(userData.id_user);
        setCompanyId(userData.id_company); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/get/${userId}`);
        const userData = response.data;

        // Update state variables with the fetched user data
        setFirstName(userData.name || '');
        setLastName(userData.surname || '');
        setEmail(userData.email || '');
        setPhoneNumber(userData.phone_number || '');
        // Assuming the user data includes a userId field
        setUserId(userData.id_user);
        setCompanyId(userData.id_company);
      } catch (error) {
        console.error(`Error fetching user data: ${error}`);
      }
      
    };

    if (userId || dataUpdated) {
      fetchUserData();
      setDataUpdated(false);
    }
  }, [userId, dataUpdated]); 

  return (
    
    <div className="container">
      <div className='przycisk'>
      <ButtonBack/> 
      </div>
      <div className="content-container">
      
        <div className="form-container">
        
          <label htmlFor="" className="title-of-form">Twoje dane: </label>
          
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

          </form>
        </div>

        <div className="form-container">
        <label className="title-of-form">Dane firmy:</label>
        
        <form className='profile-form'>
          <label className='profile-form-label' htmlFor="companyName">Nazwa Firmy: </label>
          <input className='profile-input'
            type="text"
            id="companyName"
            value={companyName}
            disabled
          />

          <label className='profile-form-label' htmlFor="regonNumber">Numer REGON:</label>
          <input className='profile-input'
          
            type="text"
            id="regonNumber"
            value={regonNumber}
            disabled
          />

          <label className='profile-form-label' htmlFor="nipNumber">NIP:</label>
          
          <input className='profile-input'
            type="text"
            id="nipNumber"
            value={nipNumber}
            disabled
          />

          <label className='profile-form-label' htmlFor="postalCode">Kod pocztowy:</label>
          <input className='profile-input'
            type="text"
            id="postalCode"
            value={postalCode}
            disabled
          />

          <label className='profile-form-label' htmlFor="city">Miasto:</label>
          
          <input className='profile-input'
            type="text"
            id="city"
            value={city}
            disabled
          />

          <label className='profile-form-label' htmlFor="street">Ulica:</label>
          <input className='profile-input'
            type="text"
            id="street"
            value={street}
            disabled
          />

          <label className='profile-form-label' htmlFor="buildingNumber">Numer Budynku:</label>
          <input className='profile-input'
            type="text"
            id="buildingNumber"
            value={buildingNumber}
            disabled
          />

          <label className='profile-form-label' htmlFor="companyType">Typ firmy:</label>
          <input className='profile-input'
            type="text"
            id="companyType"
            value={companyType}
            disabled
          />
        </form>
        </div>
        <div className='content-column'>
            
            <button className='profile-button-style' onClick={() => setShowPopup(true)}>
            Edytuj dane
            </button>
            
            <button className='profile-button-style' onClick={() => setShowPasswordPopUp(true)} >
            Zmień hasło
            </button>
            
            <button className='profile-button-style' onClick={() => {
              setShowAddPopupCompany(true); 
              console.log(showAddPopupCompany);
            }} disabled={companyId !== null}>
              Dodaj Firmę
            </button>

            <button className='profile-button-style' onClick={() => setShowPopupCompany(true)}>
              Edytuj dane firmy
            </button>

            <EditProfilePopup showPopup={showPopup} setShowPopup={setShowPopup} userId={userId} setDataUpdated={setDataUpdated} />
            <EditPasswordPopUp showPopup={showPasswordPopUp} setShowPopup={setShowPasswordPopUp} userId={userId} setDataUpdated={setDataUpdated} />
            <AddCompanyPopUp showAddPopupCompany={showAddPopupCompany} setShowAddPopupCompany={setShowAddPopupCompany} setDataUpdated={setDataUpdated}/>
            <EditCompanyPopup showPopupCompany={showPopupCompany} setShowPopupCompany={setShowPopupCompany} companyId={companyId} setDataUpdated={setDataUpdated} />
            
        </div>
        <div className='profile-column'>
          <div className="third-column-content">
          <OfferList />
          </div>
        </div>  
      </div>
      <Footer />
    </div>
  );
};

export default ProfileView;