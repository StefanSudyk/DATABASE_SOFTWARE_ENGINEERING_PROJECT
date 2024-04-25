import React from 'react'
import Navbar from '../src/Components/Navbar/Navbar.jsx'
import { BrowserRouter } from 'react-router-dom';
import WyswtlApi from './Components/Pages/WyswtlApi.jsx';

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <div className='background'/>
      
      
      </BrowserRouter>
  )
}

export default App;