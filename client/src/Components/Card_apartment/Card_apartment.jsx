import React from 'react';
import './Card_apartment.css';
import photo_template from '../../../src/assets/card_template.png';
import './DaneDoWczytania'


const Card_apartment = (props) => {
  const { NazwaOkolicy, CenaMieszkania, IloscMetrow,CenaMetrow, Miasto } = props;

  return (
    <div className='card_apartment_calosc'>
    <div className='card_apartment_block'>
      <div className='inside_card'>
        <div className='down_blue_block'>
          <div className='Tekst_gorny'>{NazwaOkolicy} {Miasto}</div>
          <div className='Tekst_dolny'>{CenaMieszkania}  {IloscMetrow} {CenaMetrow} PLN/m2 </div>
          
          
         
        </div>
          
        <img src={photo_template} className='photo_card_template'/>
        
      </div>
    </div>
    </div>
  );
};

export default Card_apartment;
