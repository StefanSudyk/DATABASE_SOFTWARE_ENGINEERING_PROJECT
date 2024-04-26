import React from 'react'
import './Popularne.css'
export const Popularne = () => {
  return (
    <div className='popularne-holder'>
        <div className='popularne-naglowek'>
            Popularne lokalizacje
        </div>
        <div className='popularne-gora'>
        <div className='gora popularne-warszawa'>Warszawa</div>
        <div className='gora popularne-wroclaw'>Wrocław</div>
        </div>
        <div className='popularne-dol'>
        <div className='dol popularne-gdansk'>Gdańsk</div>
        <div className='dol popularne-poznan'>Poznań</div>
        <div className='dol popularne-krakow'>Kraków</div>
        </div>
    </div>
  )
}

