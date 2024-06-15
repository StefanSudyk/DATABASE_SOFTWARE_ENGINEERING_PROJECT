import React from 'react'
import Card_apartment from '../../../Card_apartment/Card_apartment.jsx'
import './Promowane.css'
import DaneDoWczytania from '../../../Card_apartment/DaneDoWczytania.jsx'
import DaneDoWczytaniaPromowane from '../../../Card_apartment/DaneDoWczytaniaPromowane.jsx'
export const Promowane = () => {
  return (
    <>
    <div className="promowane_ogloszenia">
    Promowane ogłoszenia
    
    <div className='oferty_przydzielone'>
    Oferty zostały przydzielone na podstawie twojej lokalizacji      
    <div className='promowane_offer_block'>
      <div className='bloki_poszczegolne'>
        
        
      <DaneDoWczytaniaPromowane/>
      </div>
      
      
    </div>
    </div>
    </div>
    </>
  )
}
