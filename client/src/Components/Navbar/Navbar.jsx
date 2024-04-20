import React from 'react'
import './Navbar.css'
import main_logo from '../../assets/main_logo.png'
/*import ogloszenie from '../../assets/Ogłoszenie.png' */


const Navbar = () => {
  return (
    
    <div className='navbar'>
    
    <img src={main_logo}  className='logo'/>
      <ul>
      
        <li className="navbar_text">Moje konto</li>
        <li className="navbar_text">
          Testowanie API
          </li>
        <li className='DodajOgloszenie'> Dodaj ogłoszenie</li>
        {/*<img src={ogloszenie}  className='logo'/> nie uzyte zdjecie, jako przycisk*/}
      </ul>
      

    </div>
    

  )
}

export default Navbar
