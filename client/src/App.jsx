import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../src/Components/Navbar/Navbar.jsx';
import WyswtlApi from './Components/Pages/WyswtlApi/WyswtlApi.jsx';
import Zaloguj from './Components/Pages/Zaloguj/Zaloguj.jsx';
import Wyloguj from './Components/Pages/Wyloguj/Wyloguj.jsx';
import Strona_glowna from './Components/Pages/Strona_glowna/Strona_glowna.jsx';
import Dodaj_ogloszenie from './Components/Pages/Dodaj_ogloszenie/Dodaj_ogloszenie.jsx';
import DaneDoWczytania from './Components/Card_apartment/DaneDoWczytania.jsx';
import Polityka_prywatności from './Components/Pages/Strony_do_stopki/polityka_prywatności.jsx';
import Regulamin from './Components/Pages/Strony_do_stopki/regulamin.jsx';
import Obsluga_klienta from './Components/Pages/Strony_do_stopki/obsluga_klienta.jsx';
import User_profile from './Components/Pages/User_profile/Profile_view.jsx';
import OfferDetails from './Components/Offer_Details/OfferDetails.jsx';
import SearchResults from './Components/Pages/Strona_glowna/SearchRes/SearchResults.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <DynamicNavbar />
      <Routes>
        <Route path="/" element={<Strona_glowna />} />
        <Route path="Test_API" element={<WyswtlApi />} />
        <Route path="/polityka_prywatności" element={<Polityka_prywatności />} />
        <Route path="/regulamin" element={<Regulamin />} />
        <Route path="/obsluga_klienta" element={<Obsluga_klienta />} />
        <Route path="Zaloguj" element={<Zaloguj />} />
        <Route path="Wyloguj" element={<Wyloguj />} />
        <Route path="Dodaj_ogloszenie" element={<Dodaj_ogloszenie />} />
        <Route path="/User_profile" element={<User_profile />} />
        <Route path="/property/:property_id" element={<OfferDetails />} />
        <Route path="/results" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
};

const DynamicNavbar = () => {
  const location = useLocation();
  return <Navbar key={location.pathname} />;
};

export default App;
