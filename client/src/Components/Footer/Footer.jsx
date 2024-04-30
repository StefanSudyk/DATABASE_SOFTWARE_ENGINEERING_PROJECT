import React from 'react'
import './Footer.css'
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer-bg'>
      <div className="footer-container">
        <div className="logo">
            <div className='border'>
            <div className='logo-name'>
                FLAT&HOMES
            </div>
            </div>    
        </div>
        <div className='right-column'>
          <div className="column-elements">
            <div className='first-column'>
                <h4>Mapa strony</h4>
              Strona główna<br/>
              Promowane ogłoszenia
              
            </div>
            <div className='second-column'>
              <h4>Legal</h4>
                <Link to='https://pl.wikipedia.org/wiki/Regulamin'>Regulamin</Link><br/>
                <Link to='https://pl.wikipedia.org/wiki/Polityka_prywatno%C5%9Bci'>Polityka prywatności</Link>
              </div>
            <div className='third-column'>
              <h4>Kontakt</h4>
              Obsługa klienta<br/>
          </div>
        </div>
        </div>
    </div>
    </div>
  )
}

export default Footer