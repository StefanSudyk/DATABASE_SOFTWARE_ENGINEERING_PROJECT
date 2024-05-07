import React from 'react'
import './Item.css'

const Item = (props) => {

    const imgStyl={
        backgroundImage: `url(${props.zdjecie})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };

  return (
    <div className='item' style={imgStyl}>
        
        <div className="item-opis">
            <p className='item-opis-adres'>
                {props.adres}
            </p>
            <p className='item-opis-reszta'>
                {props.cena}PLN&nbsp;&nbsp;&nbsp;
                {props.metraz}m<sup>2</sup>&nbsp;&nbsp;&nbsp;
                {props.ppmeter}zł/m<sup>2</sup>
            </p>
        </div>
        
    </div>
  )
}

export default Item
