import React from 'react'
import './obsluga_klienta.css'
const obsluga_klienta = () => {
  return (
    <div className='obsluga_klienta_main_div'>
      
      <form >
    <p>Imię:</p>
    <p><input type="text" name="nm"/></p>
    <p>Nazwisko:</p>
    <p><input type="text" name="snm"/></p>
    <p>Numer telefonu:</p>
    <p><input type="text" name="phnum"/></p>
    <p>E-mail address:</p>
    <p><input type="email" name="email"/></p>
    <p>Powód zgłoszenia</p>
    <p><input type="email" name="email"/></p>
    <p>Opis zgłoszenia</p>
    <p><input type="text" className="tekstbox"/></p>
  
    <p><input type="submit" value="Prześlij"/></p>
    </form> 
      
    </div>
  )
}

export default obsluga_klienta
