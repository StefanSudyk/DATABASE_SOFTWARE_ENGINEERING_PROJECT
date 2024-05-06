import React from 'react'
import './Strona_glowna.css'
import main_bg from '../../../assets/bg_main_picture.png'
import { Promowane } from './Promowane/Promowane.jsx'
import { Popularne } from './Popularne/Popularne.jsx'
import Postcard from '../../Postcard/Postcard.jsx'
import Card_apartment from '../../Card_apartment/Card_apartment.jsx'
const Strona_glowna = () => {
  return (
    <div className='glowna_strona'>
        <div className='kontener_bg_photo'>
          <img src={main_bg}  className='main_bg'/>
            <div className='white_bg_first_page'>
            <Promowane/>
            </div>
            
        </div>
    
     
    <div className='whatever'>
      <Postcard/>
      </div>  
      
    <div className='oddziel-to'>
      
      </div>  
      
    <div>
      strona glowna
      </div>    
      <div>
      strona glowna
      </div>
      
    <div>
      strona glowna
      </div>  
      
    <div className='footer'>
      strona glowna
      </div>  
      
    

    </div>
  )
}

export default Strona_glowna
