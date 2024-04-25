import React from 'react'
import Navbar from '../src/Components/Navbar/Navbar.jsx'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import WyswtlApi from './Components/Pages/WyswtlApi.jsx';
import Zaloguj from './Components/Pages/Zaloguj.jsx'
import Wyloguj from './Components/Pages/Wyloguj.jsx'
import Strona_glowna from './Components/Pages/Strona_glowna.jsx'


const App = () => {
  const isLoggedIn = false;
  return (
     
    <BrowserRouter>
    <Navbar isLoggedIn={isLoggedIn}/>
    <Routes>
      <Route path="/" element={<Strona_glowna/>} />
      <Route path="Test_API" element={<WyswtlApi/>} />
      <Route path="Zaloguj" element={<Zaloguj/>}/>
      <Route path="Wyloguj" element={<Wyloguj/>}/>
    </Routes>
    
      </BrowserRouter>
  )
}

export default App;