import React from 'react'
import './Promowane.css'
import prom from '../../../../assets/prom'
import Item from './Item/Item'
export const Promowane = () => {
  return (
<div className='promowane'>
    <div className='promowane-gora'>
        <div className="promowane_ogloszenia">
            Promowane ogłoszenia
        </div><div className='oferty_przydzielone'>
                Oferty zostały przydzielone na podstawie twojej lokalizacji
            </div>
    </div>
    <div className='promowane-dol'>
        {prom.map((item, i)=>{
            return <Item key={i} id={item.id} adres={item.adres} cena={item.cena} metraz={item.metraz} zdjecie={item.zdjecie} ppmeter={item.ppmeter}/>
        })}
    </div>
</div>
  )
}
