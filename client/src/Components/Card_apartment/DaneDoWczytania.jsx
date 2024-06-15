import React, { useEffect, useState } from 'react';
import Card_apartment from './Card_apartment';

const DaneDoWczytania = () => {
  const [propertiesData, setPropertiesData] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    fetch(`${apiUrl}/getallproperty`) 
      .then(response => response.json())
      .then(data => setPropertiesData(data))
      .catch(error => console.error('Data ', error));
  }, []);

  if (propertiesData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {propertiesData.map(propertyData => (
        <Card_apartment 
          key={propertyData.property.id_property}
          property_id={propertyData.property.id_property}
          NazwaOkolicy={propertyData.address.county} 
          CenaMieszkania={propertyData.property.price}
          IloscMetrow={Math.round(propertyData.property.square_metrage)}
          Miasto={propertyData.address.locality} 
          CenaMetrow={Math.round(propertyData.property.p_p_meter)}
          Zdjecie={`data:image/png;base64, ${propertyData.photos.length > 0 ? propertyData.photos[0].photo : ''}`}
        />
      ))}
    </>
  );
};

export default DaneDoWczytania;