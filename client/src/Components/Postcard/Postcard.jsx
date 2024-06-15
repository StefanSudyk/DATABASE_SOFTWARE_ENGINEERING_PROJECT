import React from 'react';
import './Postcard.css';
import warsaw from '../../assets/warsaw-photo.jpg';
import cracow from '../../assets/cracow-photo.jpg';
import wroclaw from '../../assets/wroclaw-photo.jpg';
import poznan from '../../assets/poznan-photo.jpg';
import gdansk from '../../assets/gdansk-photo.jpg';
import { Link } from 'react-router-dom'; 

const Postcard = () => {
  return (
    <div className='postcard-main-box'>
      <div className='writing-name'>
        <div className='popular-location-title'>
          <div id='stylish'>Popularne lokalizacje</div>
        </div>
        <div className='popular-location-undertitle'>
          <div id='undertitle'>Najpopularniejsze miasta w Polsce</div>
        </div>
      </div>
      <div className="main-photos-box">
        <div className="photos-container">
          <div className='first-row-postcard'>
            <div className='photo-warsaw'>
              <div className='box-photo-up-row'>
                <div className='text-photos-up-row'>
                  Warszawa
                </div>
                <Link to='/results?locality=Warszawa'> 
                  <img src={warsaw} alt="Warszawa" className='picture-up-row' />
                </Link>
              </div>
            </div>
            <div className='photo-wroclaw'>
              <div className='box-photo-up-row'>
                <div className='text-photos-up-row'>
                  Wrocław
                </div>
                <Link to='/results?locality=Wrocław'> 
                  <img src={wroclaw} alt="Wrocław" className='picture-up-row'/>
                </Link>
              </div>
            </div>
          </div>
          <div className="second-row-postcard">
            <div className='photo-gdansk'>  
              <div className='box-photo-down-row'>
                <div className='text-photos-down-row'>
                  Gdańsk
                </div>
                <Link to='/results?locality=Gdańsk'> 
                  <img src={gdansk} alt="Gdańsk" role='presentation' className='picture-down-row' />
                </Link>
              </div>
            </div>
            <div className='photo-poznan'>
              <div className='box-photo-down-row'>
                <div className='text-photos-down-row'>
                  Poznań
                </div>  
                <Link to='/results?locality=Poznań'> 
                  <img src={poznan} alt="Poznań" className='picture-down-row'/>
                </Link>
              </div>
            </div>
            <div className='photo-cracow'>
              <div className='box-photo-down-row'>
                <div className='text-photos-down-row'>
                  Kraków
                </div>
                <Link to='/results?locality=Kraków'> 
                  <img src={cracow} alt="Kraków" role='presentation' className='picture-down-row' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postcard;
