import React from 'react';
import Card_apartment from './Card_apartment';

const DaneDoWczytania = () => {
  return (
    <div>
     
      <Card_apartment 
        NazwaOkolicy="Baranówka"
        CenaMieszkania="400 000"
        IloscMetrow="60"
        Miasto="Rzeszów"
        CenaMetrow="11 500"
      />
   
    </div>
  );
};

export default DaneDoWczytania;
