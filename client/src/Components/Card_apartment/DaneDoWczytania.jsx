import React, { useEffect, useState } from 'react';
import Card_apartment from './Card_apartment';
import axios from 'axios';

const DaneDoWczytania = () => {
  const [propertiesData, setPropertiesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/getallproperty');
        setPropertiesData(response.data);
      } catch (error) {
        console.error('Data ', error);
      }
    };
  
    fetchData();
  }, []);
  

  if (propertiesData.length === 0) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      {propertiesData.map(propertyData =>{
        console.log('property_id:', propertyData.property.id_property)
        return (
        <Card_apartment 
          key={propertyData.property.id_property}
          property_id={propertyData.property.id_property}
          NazwaOkolicy={propertyData.address.county} 
          CenaMieszkania={propertyData.property.price}
          IloscMetrow={propertyData.property.square_metrage}
          Miasto={propertyData.address.locality} 
          CenaMetrow={propertyData.property.p_p_meter}
          Zdjecie={`data:image/png;base64, ${propertyData.photos.length > 0 ? propertyData.photos[0].photo : ''}`}
        />
      ))}
    </>
  );
  
};

export default DaneDoWczytania;