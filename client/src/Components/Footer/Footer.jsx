import React from 'react'
import './Footer.css'
import {Link} from 'react-router-dom';
import black_logo from '../../assets/black-logo.jpg';
import facebook_icon from '../../assets/facebook.svg';
import instagram_icon from '../../assets/Instagram.svg';
import x_icon from '../../assets/X.svg';
import Strona_glowna from '../../Components/Pages/Strona_glowna/Strona_glowna.jsx'

const Footer = () => {
  return (
    <div className="footer-padding">
    <div className="footer-container">
        <div className='logo-container'>
            <div className='logo-footer'>
            <img src={black_logo} className='site-logo'/>  
            </div>
        <div className='icons-footer'>
            Znajdziesz nas na:
            
           <Link to="" ><img src={facebook_icon} alt='facebook'/> </Link>
           <Link to="" ><img src={x_icon} alt='x'/> </Link>
           <Link to="" ><img src={instagram_icon} alt='instagram'/> </Link>
           
        </div>
        </div>
        <div className='column-links-footer'>
            <p id='links-footer-text'>Mapa strony</p>
            <li><Link to={Strona_glowna}>Strona główna</Link></li>
            <li><Link to=''>Promowane ogłoszenia </Link></li>
        </div>
        <div className='column-links-footer'>
        <p id='links-footer-text'>Informacje prawne</p>
           <li> <Link to="/regulamin">Regulamin</Link></li>
           <li> <Link to="/polityka_prywatności">Polityka prywatności</Link> </li>
        </div>
        <div className='column-links-footer'>
        <p id='links-footer-text'>Kontakt</p>
            <li><Link to="/obsluga_klienta"> Obsługa klienta </Link></li>
        </div>
    </div>

        <hr></hr>

        <div className="footer-below">
            <div className="copyright-footer">
                <p id='footer-copyright-text'>
                &copy; Copyright {new Date().getFullYear()} Flat&Homes
                </p>
            </div>
        </div>
    </div>

  )
}

export default Footer