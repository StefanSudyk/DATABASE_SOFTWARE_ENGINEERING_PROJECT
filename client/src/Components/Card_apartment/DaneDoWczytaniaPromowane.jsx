import React, { useEffect, useState } from 'react';
import Card_apartment from './Card_apartment';

const DaneDoWczytaniaPromowane = ({ locality = "Rzeszów" }) => {
  const [propertiesData, setPropertiesData] = useState([]);

  useEffect(() => {
    fetchProperties(locality);
  }, [locality]);

  const fetchProperties = (location) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const url = `${apiUrl}/getallproperty?locality=${location}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const limitedData = data.slice(0, 5);
        setPropertiesData(limitedData);
      })
      .catch(error => console.error('cos srednio', error));
  };

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

export default DaneDoWczytaniaPromowane;