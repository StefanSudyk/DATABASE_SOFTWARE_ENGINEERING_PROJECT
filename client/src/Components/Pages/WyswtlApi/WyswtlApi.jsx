import React, { useState, useEffect } from 'react';
import Axios from 'axios';


const WyswietlApi = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("http://127.0.0.1:5000/get/1");
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className='first_line'>
        To jest pierwsza linijka
      </div>
      {data && (
        <div>
          <h2>Dane JSON:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
    
  );
};

export default WyswietlApi;
