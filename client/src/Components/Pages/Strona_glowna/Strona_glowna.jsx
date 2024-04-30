import React from 'react'
import './Strona_glowna.css'
import Postcard from '../../Postcard/Postcard.jsx'
import Footer from '../../Footer/Footer.jsx'

const Strona_glowna = () => {
  return (
    <div className='hello'>
  
      <div>
        hello
      </div>
      <div className='postcard'>
        <Postcard/>
      </div>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Strona_glowna
