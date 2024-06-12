import React from 'react';
import { Link } from 'react-router-dom';
import './Card_apartment.css';
import photo_template from '../../../src/assets/card_template.png';
import './DaneDoWczytania'


const Card_apartment = (props) => {
  const { property_id, NazwaOkolicy, CenaMieszkania, IloscMetrow,CenaMetrow, Miasto, Zdjecie } = props;

  console.log(property_id)

  return (
    <Link to={`/property/${property_id}`} className='link-card-apartment'>
    <div className='card_apartment_calosc' >
    <div className='card_apartment_block'>
      <div className='inside_card'>
        <div className='down_blue_block'>
          <div className='Tekst_gorny'>{NazwaOkolicy}, {Miasto}</div>
          <div className='Tekst_dolny'>{CenaMieszkania} PLN &nbsp;  {IloscMetrow} m²&nbsp;&nbsp; {CenaMetrow} PLN/m2 </div>
          
        </div>
       
        <img src={Zdjecie} className='photo_card_template' alt="Zdjęcie nieruchomości" />
      
      </div>
    </div>
    </div>
    </Link> 
  );
};

export default Card_apartment;
