import React from 'react';
import Card_apartment from './Card_apartment';

const DaneDoWczytania = () => {
  return (
    <div>
     
      <Card_apartment 
        NazwaOkolicy="Centrum"
        CenaMieszkania="400 000 zł"
        IloscMetrow="60 m²"
        Miasto="Warszawa"
        CenaMetrow="11 500"
      />
   
    </div>
  );
};

export default DaneDoWczytania;
