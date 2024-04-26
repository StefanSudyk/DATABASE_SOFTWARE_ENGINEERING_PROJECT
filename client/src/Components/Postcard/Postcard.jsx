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
              <div className='box-warsaw'>
              <div className='text-photos'>
                  Warszawa
                </div>
                <picture>
                  <img src={warsaw} alt="Warszawa" className='picture-up-row' />
                </picture>
              </div>
          </div>
          <div className='photo-wroclaw'>
              <div className='box-wroclaw'>
              <div className='text-photos'>
                  Wrocław
              </div>
                <picture>
                  <img src={wroclaw} alt="Wrocław" className='picture-up-row'/>
                </picture>
              </div>
          </div>
        </div>
      <div className="second-row-postcard">
         <div className='photo-gdansk'>
              <div className='box-gdansk'>
              <div className='text-photos'>
                  Gdańsk
              </div>  
                <picture>
                  <img src={gdansk} alt="Gdańsk" className='picture-down-row'/>
                </picture>
              </div>
          </div>
          <div className='photo-poznan'>
              <div className='box-poznan'>
              <div className='text-photos'>
                  Poznań
              </div>  
                <picture>
                  <img src={poznan} alt="Poznań" className='picture-down-row'/>
                </picture>
              </div>
          </div>
          <div className='photo-cracow'>
              <div className='box-cracow'>
                <div className='text-photos'>
                  Kraków
                </div>
                <picture>
                  <img src={cracow} alt="Kraków" role='presentation' className='picture-down-row' />
                </picture>
              </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default postcard