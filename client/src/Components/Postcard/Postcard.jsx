import React from 'react'
import './Postcard.css'
import warsaw from '../../assets/warsaw-photo.jpg'
import cracow from '../../assets/cracow-photo.jpg'
import wroclaw  from '../../assets/wroclaw-photo.jpg'
import poznan from '../../assets/poznan-photo.jpg'
import gdansk from '../../assets/gdansk-photo.jpg'

const postcard = () => {
  return (
    
    <div className='postcard-main-box'>
      <div className='writing-name'>
          <div className='popular-location-title'>
              <h1 id='stylish'>Popularne lokalizacje</h1>
          </div>
          <div className='popular-location-undertitle'>
              <h6 id ='undertitle'>Najpopularniejsze miasta w Polsce</h6>
          </div>
      </div>
      <div className="main-photos-box">
        <div className='first-row-postcard'>
          <div className='photo-warsaw'>
              <div className='box-photo-up-row'>
              <div className='text-photos'>
                  Warszawa
                </div>
                  <a href='https://www.youtube.com/'>
                  <img src={warsaw} alt="Warszawa" className='picture-up-row' />
                  </a>
               
              </div>
          </div>
          <div className='photo-wroclaw'>
              <div className='box-photo-up-row'>
              <div className='text-photos'>
                  Wrocław
              </div>
                <a href=''>
                  <img src={wroclaw} alt="Wrocław" className='picture-up-row'/>
                </a>
              </div>
          </div>
        </div>
      <div className="second-row-postcard">
        {/* Tutaj powinno byc photo-gdansk, ale nie wiem dlaczego photo-gdansk nie działa w css jak to jest ten sam kod więc mamy 
        photo-krakow, ponieważ to działa*/}
          <div className='photo-krakow'>  
              <div className='box-photo-down-row'>
                <div className='text-photos'>
                  Gdańsk
                </div>
                  <a href=''>
                  <img src={gdansk} alt="Gdańsk" role='presentation' className='picture-down-row' />
                  </a>
              </div>
          </div>
          <div className='photo-poznan'>
              <div className='box-photo-down-row'>
              <div className='text-photos'>
                  Poznań
              </div>  
                  <a href=''>
                  <img src={poznan} alt="Poznań" className='picture-down-row'/>
                  </a>
              </div>
          </div>
          <div className='photo-cracow'>
              <div className='box-photo-down-row'>
                <div className='text-photos'>
                  Kraków
                </div>
                  <a href=''>
                  <img src={cracow} alt="Kraków" role='presentation' className='picture-down-row' />
                  </a>
              </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default postcard