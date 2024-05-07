import React from 'react'
import Navbar from '../src/Components/Navbar/Navbar.jsx'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import WyswtlApi from './Components/Pages/WyswtlApi/WyswtlApi.jsx';
import Zaloguj from './Components/Pages/Zaloguj/Zaloguj.jsx'
import Wyloguj from './Components/Pages/Wyloguj/Wyloguj.jsx'
import Strona_glowna from './Components/Pages/Strona_glowna/Strona_glowna.jsx'
import Dodaj_ogloszenie from './Components/Pages/Dodaj_ogloszenie/Dodaj_ogloszenie.jsx'
import DaneDoWczytania from './Components/Card_apartment/DaneDoWczytania.jsx';
import Polityka_prywatności from './Components/Pages/Strony_do_stopki/polityka_prywatności.jsx';
import Regulamin from './Components/Pages/Strony_do_stopki/regulamin.jsx';
import Obsluga_klienta from './Components/Pages/Strony_do_stopki/obsluga_klienta.jsx';
const App = () => {
  
  const isLoggedIn = false;
  return (
     
    <BrowserRouter>
    <Navbar isLoggedIn={isLoggedIn}/>
 
    <Routes>
      <Route path="/" element={<Strona_glowna/>} />
      <Route path="Test_API" element={<WyswtlApi/>} />
      <Route path="/polityka_prywatności" element={<Polityka_prywatności/>}/>
      <Route path="/regulamin" element={<Regulamin/>} />
      <Route path="/obsluga_klienta" element={<Obsluga_klienta/>}/>
      <Route path="Zaloguj" element={<Zaloguj/>}/>
      <Route path="Wyloguj" element={<Wyloguj/>}/>
      <Route path="Dodaj_ogloszenie" element={<Dodaj_ogloszenie/>}/>
    </Routes>
    
      </BrowserRouter>
      
  )
}

export default App;