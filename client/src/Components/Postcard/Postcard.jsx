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
              <div id='stylish'>Popularne lokalizacje</div>
          </div>
          <div className='popular-location-undertitle'>
              <div id ='undertitle'>Najpopularniejsze miasta w Polsce</div>
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
                  <a href='https://www.youtube.com/'>
                  <img src={warsaw} alt="Warszawa" className='picture-up-row' />
                  </a>
               
              </div>
          </div>
          <div className='photo-wroclaw'>
              <div className='box-photo-up-row'>
              <div className='text-photos-up-row'>
                  Wrocław
              </div>
                <a href=''>
                  <img src={wroclaw} alt="Wrocław" className='picture-up-row'/>
                </a>
              </div>
          </div>
        </div>
      <div className="second-row-postcard">
          <div className='photo-gdansk'>  
              <div className='box-photo-down-row'>
                <div className='text-photos-down-row'>
                  Gdańsk
                </div>
                  <a href=''>
                  <img src={gdansk} alt="Gdańsk" role='presentation' className='picture-down-row' />
                  </a>
              </div>
          </div>
          <div className='photo-poznan'>
              <div className='box-photo-down-row'>
              <div className='text-photos-down-row'>
                  Poznań
              </div>  
                  <a href=''>
                  <img src={poznan} alt="Poznań" className='picture-down-row'/>
                  </a>
              </div>
          </div>
          <div className='photo-cracow'>
              <div className='box-photo-down-row'>
                <div className='text-photos-down-row'>
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
    </div>
  )
}

export default postcard