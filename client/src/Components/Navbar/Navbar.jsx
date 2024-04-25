import React from 'react'
import './Navbar.css'
import main_logo from '../../assets/main_logo.png'
/*import ogloszenie from '../../assets/Ogłoszenie.png' */
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    
    <div className='navbar'>
     <Link to="/">
    <img src={main_logo}  className='logo'/>
    </Link>
      <ul>
          <li className="navbar_text_test_api">
            <Link to="/Test_API">Testowanie API</Link>
          </li>

        <li className="navbar_text">
        <Link to="/Logowanie">Zaloguj/Zarejestruj</Link>
        </li>
        
        <li className='DodajOgloszenie'> Dodaj ogłoszenie</li>

        {/*<img src={ogloszenie}  className='logo'/> nie uzyte zdjecie, jako przycisk*/}
      </ul>
      

    </div>
    

  )
}

export default Navbar
