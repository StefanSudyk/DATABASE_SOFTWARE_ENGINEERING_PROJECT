import React from 'react'
import './Navbar.css'
import main_logo from '../../assets/main_logo.png'
/*import ogloszenie from '../../assets/Ogłoszenie.png' */
import {Link} from "react-router-dom"

const Navbar = ({ isLoggedIn }) => {
  return (
    
    <div className='navbar'>
     <Link to="/">
    <img src={main_logo}  className='logo'/>
    </Link>
      <ul>
          <li className="navbar_text_test_api">
            <Link to="/Test_API">Testowanie API</Link>
          </li>
          {isLoggedIn ? (
            <Link to="/Wyloguj">Wyloguj</Link>
          ) : (
            <Link to="/Zaloguj">Zaloguj</Link>
          )}
     
       
        <li>
          <Link to="/Dodaj_ogloszenie" className='DodajOgloszenie'> Dodaj ogłoszenie </Link>
        </li>

       
      </ul>
      

    </div>
    

  )
}

export default Navbar
