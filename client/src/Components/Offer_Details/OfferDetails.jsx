import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './OfferDetails.css';
import Footer from '../Footer/Footer.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import Popup from './PopUpFavourite.jsx';
import { useNavigate } from 'react-router-dom';

const OfferDetails = () => {
  const { property_id } = useParams();
  const [property, setProperty] = useState(null);
  const [user, setUser] = useState(null)
  const [showFullNumber, setShowFullNumber] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userFavourite, setUserFavourite] = useState(null)

  const translations = {
    "Formalities": "Formalności przed",
    "Zero condition": "Stan zerowy",
    "Open basic condition": "Stan surowy otwarty",
    "Close basic condition": "Stan surowy zamknięty",
    "Finishing works": "Prace wykończeniowe",
    "Finished": "Gotowy",
    "secondary": "wtórny",
    "primary": "pierwotny",
    "Lack": "Brak",
    "Heat pump": "Pompa ciepła",
    "Furnace": "Piec",
    "Eco-pea stove": "Piec na eko groszek",
    "Gas furnace": "Piec gazowy",
    "Electric heating": "Ogrzewanie elektryczne",
    "Solar panels": "Kolektory słoneczne"
  };
  const navigate = useNavigate();

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

     
        setUserFavourite(userData.id_user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);
  const handleRegisterLogin = () => {
    navigate('/Zaloguj');
  };

  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return token != null;
  }; 

  const handleClick = () => {
    if (isLoggedIn()) {
      setShowFullNumber(true);
    } else {
      setShowAlert(true);
    }
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
     
        const response = await axios.get(`${apiUrl}/currentuser`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
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
        const response = await axios.get(`${apiUrl}/get/${userFavourite}`);
        
        const userData = response.data;
        setUserFavourite(userData.id_user);

      } catch (error) {
        console.error(`Error fetching user data: ${error}`);
      }
      
    };
  }, [userFavourite]); 

  const checkFavouriteStatus = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getfavourite/${userFavourite}`);
      setIsFavourite(response.data.some(property => property.id === property_id));
    } catch (error) {
      console.error('Failed to check favourite status:', error);
    }
  };

  useEffect(() => {
    if (userFavourite) {
      checkFavouriteStatus();
    }
  }, [userFavourite]);

  const handleAddToFavourites = async () => {
    if (isLoggedIn()) {
      try {
        if (isFavourite) {
          // If it's already a favourite, remove it
          await axios.delete(`${apiUrl}/deletefavourite/${userFavourite}/${property_id}`);
          setIsFavourite(false); // Update state to reflect removal
        } else {
          // If it's not a favourite, add it
          await axios.post(`${apiUrl}/postfavourite/${userFavourite}/${property_id}`);
          setIsFavourite(true); // Update state to reflect addition
        }
      } catch (error) {
        console.error('Failed to update favourites:', error);
      }
    } else {
      console.log('Not logged in, showing alert');
      setIsPopupOpen(!isPopupOpen);
    }
  };
  

  useEffect(() => {
    const fetchProperty = async () => {
      try {       
        const response = await axios.get(`${apiUrl}/getproperty/${property_id}`);
        console.log('API response:', response.data); 
        setProperty(response.data);
      } catch (error) {
        console.error('Failed to fetch property:', error);
      }
    };
  
    fetchProperty();
  }, [property_id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (property && property.id_owner) {
          const response = await axios.get(`${apiUrl}/get/${property.id_owner}`);
          console.log('User fetched:', response.data); // Debug message
          setUser(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
  
    fetchUser();
  }, [property]);
 
  const dateOnly = property ? property.publication_date.split(' ').slice(0, 4).join(' ') : '';

  if (!property || !user) {
    return <div>Loading...</div>;
  }
  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
  };

  const displayNumber = user && showFullNumber 
  ? formatPhoneNumber(user.phone_number) : `${formatPhoneNumber(user?.phone_number.slice(0, 3))}`;

  console.log('Rendering with property and user:', property, user); 

  return (   
    <div className='Offer-Details-container'>
      <div className='offer-details-outer'>
      <div className="offer-details-box">
        <div className="offer-details-column">
          <div className="property-image">
            <div className="property-image-container">
            <img src={`data:image/png;base64,${property.photo}`} alt="Property" className='property-img-details'/>
            <button 
              className={`button-favourite ${isFavourite ? 'filled' : 'not-filled'}`} 
              onClick={handleAddToFavourites}>
             <FontAwesomeIcon 
                icon={isFavourite ? fasHeart : farHeart} 
                style={{ color: isFavourite ? 'red' : 'grey' }} />
            </button>
            <Popup 
            isOpen={isPopupOpen} 
            closePopup={() => setIsPopupOpen(false)} 
            handleRegisterLogin={handleRegisterLogin}
            />
            <div className="property-information">
              <p className="offer-details-information">ul.{property.street} {property.house_number}
                , {property.district}, {property.locality}, {property.region}
              </p>
            </div>
            </div>
            
          </div>
          <div className="property-contact">
            <div className='title-property'>Zamieścił</div>
            <div className="property-info-container">
            <p className="offer-details-contact">{user.name} {user.surname} </p>
            <p className="offer-details-contact">
              {displayNumber} {!showFullNumber && <button onClick={handleClick} className='button-offer'>pokaż numer</button>}
            </p>
              {showAlert && 
              <div className="alert-popup">
                <div className="alert-content">
                  Musisz być zalogowanym, aby zobaczyć numer
                  <button className='close-notification' onClick={() => setShowAlert(false)}>Close</button>
                </div>
              </div>
              }
          </div>
          </div>
          <div className="Offer-Details-description">
            <div className="offer-description-title">Opis</div>
            <div className="offer-description-container">
            <p className="offer-description-text">{property.description}</p>
            </div>
          </div>
        </div>  
        <div className="offer-details-column">
          <div className='offer-details-title'>
            <span className="title-details">{property.title}</span> 
          </div>
          <div className="property-details">
            <p className='offer-details-p'>Metraż: {property.square_metrage}m²</p>
            <p className='offer-details-p'>Cena: {property.price} PLN</p>
            <p className='offer-details-p'>Cena za: {Math.round(property.p_p_meter)}</p>
            <p className='offer-details-p'>Wykończenie: {translations[property.condition_]}</p>
            <p className='offer-details-p'>Rynek: {translations[property.market]}</p>
            <p className='offer-details-p'>Liczba łazieniek: {property.nr_bathrooms}</p>
            <p className='offer-details-p'>Liczba pokoji: {property.nr_rooms}</p>
            <p className='offer-details-p'>Ilość balkonów: {property.nr_balconies}</p>
            <p className='offer-details-p'>Piętro: {property.nr_floors}</p>
            <p className='offer-details-p'>Rodzaj ogrzewania: {translations[property.type_of_heating]}</p>
            <p className='offer-details-p'>Garaż: {property.nr_garages}</p>
            <p className='offer-details-p'>Strych: {property.attic ? 'Tak' : 'Nie'}</p>

          </div>
          <div className="public-date">
            {dateOnly}
          </div>
        </div>
        </div>
        <div className='additional-information-container'>
        <div className='title-information'>Informacje dodatkowe</div>
        <div className="additional-information-box">
          {property.shop_distance !== 0 && <p className="offer-details-p">
            Odległość do najbliższego sklepu: {property.shop_distance} metry</p>}
          {property.park_distance !== 0 && <p className="offer-details-p">
            Odległość do najbliższego parku: {property.park_distance} metry</p>}
          {property.playground_distance !== 0 && <p className="offer-details-p">
            Odległość do najbliższego placu zabaw: {property.playground_distance} metry</p>}
          {property.kindergarden_distance !== 0 && <p className="offer-details-p">
            Odległość do najbliższego przedszkola: {property.kindergarden_distance} metry</p>}
          {property.school_distance !== 0 && <p className="offer-details-p">
            Odległość do najbliższej szkoły: {property.school_distance} metry</p>}
          {property.bicycle_rack && <p className="offer-details-p">
            Czy dla nieruchomością znajduje się stojak na rowery: Tak</p>}
          {property.car_parking_space && <p className="offer-details-p">
            Czy do nieruchomości przypisane jest miejsce parkingowe: Tak</p>}
      </div>
      </div>
      </div>
     
      <Footer/>
    </div>
    
  );
};

export default OfferDetails;
