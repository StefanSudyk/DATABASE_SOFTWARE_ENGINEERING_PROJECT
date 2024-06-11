import { Link } from 'react-router-dom'
import React,{useState, useEffect} from 'react'
import './advertisementForm.css'
import axios from 'axios'

//price per metrage is calculate in submit handle

const advertisementForm = () => { 

  //Podstawowe
   const [title, setTitle] = useState(" ");
   const [price, setPrice] = useState(" ");
   const [squareMetrage,setSquareMetrage ] = useState(" ");
   const [finishingStandard, setFinishingStandard] = useState(" ");
   const [market, setMarket ] = useState(" ");
   const [ppMeter, setPpMeter] = useState(" "); //logic in handle submit is 

   //Adres
   const [country, setCountry  ] = useState(" ");
   const [region, setRegion  ] = useState(" ");
   const [district, setDistrict  ] = useState(" ");
   const [locality, setLocality  ] = useState(" ");
   const [street, setStreet  ] = useState("");
   const [postalCode, setPostalCode  ] = useState("");
   const [houseNumber, setHouseNumber  ] = useState("");
   const [coordinates, setCoordinates  ] = useState("");
 
  //Wnetrze
   const [nrRooms, setNrRooms ] = useState("");
   const [nrBathrooms, setNrBathrooms ] = useState("");
   const [basement, setBasement ] = useState("");
   const [attic, setAttic ] = useState("");
   const [nrGarages, setNrGarages ] = useState("");
   const [nrBalconies, setNrBalconies ] = useState("");
   const [nrFloors, setNrFloors ] = useState("");
   const [typeOfHeating, setTypeOfHeating ] = useState("");
   const [conditionInside, setConditionInside ] = useState("");
   const [description, setDescription ] = useState("");

  //Pokoje
  
  const [rooms, setRooms] = useState([{ index: 1, metrage: "" }]);

  //Additional
   const [bicycleRack, setBicycleRack ] = useState("");
   const [carParkingSpace, setCarParkingSpace ] = useState("");

   //Infrastruktura not Implemented
   const [shopDistance, setShopDistance ] = useState("");
   const [parkDistance, setParkDistance ] = useState("");
   const [playgroundDistance, setPlaygroundDistance ] = useState("");
   const [kindergardenDistance, setKindergardenDistance ] = useState("");
   const [schoolDistance, setSchoolDistance ] = useState("");

   //Checkbox
   const [sponsored, setSponsored] = useState("");

   //Addons
   const [publicationDate, setPublicationDate] = useState('');

   //Checkbox addons
   const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const [notification, setNotification] = useState(null); 
  const [showPopup, setShowPopup] = useState(false);
  const [images, setImages] = useState([{ name: 'image1', required: true }]);

  const addImage = () => {
    setImages([...images, { name: `image${images.length + 1}`, required: true }]);
  };

  const [imageBase64String, setImageBase64String] = useState("");

  // const [imageBase64Strings, setImageBase64Strings] = useState([]); //Array list

  const handleRoomMetrageChange = (event, i) => {
    const newRooms = [...rooms];
    newRooms[i].metrage = event.target.value;
    setRooms(newRooms);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      // The result attribute contains the data as a base64 encoded string
      const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
  
      // Store the base64 string in state
      setImageBase64String(base64String);
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // array version 
  /*const [imageBase64Strings, setImageBase64Strings] = useState([]);

    const handleImageChange = (event) => {
      const files = Array.from(event.target.files);
      const reader = new FileReader();
    
      reader.onloadend = () => {
        // The result attribute contains the data as a base64 encoded string
        const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    
        // Store the base64 string in state
        setImageBase64Strings(prevStrings => [...prevStrings, base64String]);
      };
    
      files.forEach(file => {
        reader.readAsDataURL(file);
      });
    };
  */

  //user
  const [userId, setUserId] = useState(null);
  
 
    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('No token found');
            return;
          }
          
          const response = await axios.get("http://127.0.0.1:5000/currentuser", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const userData = response.data;
  
          setUserId(userData.id_user);
  
        } catch (error) {
          console.error('Error fetching user data:', error);
          console.error('Error details:', error.response); // Debug message
        }
      };
      fetchData();
    }, []);

  const handleClose = () => {
    setShowPopup(false);
  };
    
console.log(userId);

const handleSubmit = async (event) => {
  event.preventDefault();

  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
  const year = date.getFullYear();

  const publicationDate = `${day}.${month}.${year}`;

  const pricePerMeter = price / squareMetrage; //handling p_p_metrage

  const formData = {
    'id_owner': userId,
    'title' : title,
    'price' : price,
    'square_metrage' : squareMetrage,
    'finishing_standard' : finishingStandard,
    'market' : market,
    'publication_date': publicationDate,
    'p_p_meter': pricePerMeter,
    'sponsored': sponsored,

    'county': country,
    'region': region,
    'district': district,
    'locality': locality,
    'street': street,
    'postal_code': postalCode,
    'house_number': houseNumber,
    'coordinates': userId ,//coordinates,

    'address_photo': description,
    'description_photo': description,
    'photo':imageBase64String,
    
    'nr_rooms':nrRooms,
    'nr_bathrooms':nrBathrooms,
    'basement':basement,
    'attic':attic,
    'nr_garages':nrGarages,
    'nr_balconies':nrBalconies,
    'nr_floors':nrFloors,
    'type_of_heating':typeOfHeating,
    'condition_':conditionInside,
    'description':description,

   'shop_distance': shopDistance || "0",
    'park_distance': parkDistance || "0",
    'playground_distance': playgroundDistance || "0",
    'kindergarden_distance': kindergardenDistance || "0",
    'school_distance': schoolDistance || "0",

    'bicycle_rack':bicycleRack,
    'car_parking_space':carParkingSpace,

    
    ...rooms.reduce((obj, room, i) => {
      obj[`room_index`] = i + 1;
      obj[`room_metrage`] = parseFloat(room.metrage);
      return obj;
    }, {}),
    
  };

  console.log('Form data:', formData); // Debug message

  try {
    console.log('Sending POST request to http://127.0.0.1:5000/postproperty'); // Debug message
    const response = await axios.post('http://127.0.0.1:5000/postproperty', formData);

    console.log('Response:', response); // Debug message

    if (response.status === 200) {
      console.log('Advertisement added successfully');
      setNotification('Advertisement added successfully. Redirecting...');
      setShowPopup(true); // Show the popup
      setTimeout(() => {
        setNotification(null);
        setShowPopup(false); // Hide the popup after 2 seconds
        // Redirect the user here
      }, 2000);
    }
  } catch (error) {
    setNotification('Error adding advertisement. Please try again.');
    setShowPopup(true); // Show the popup
    console.error('Error adding advertisement:', error);
    console.error('Error details:', error.response); // Debug message
  }
};

  return (
    <div className="form-container">
      <form className='form-advertisement-data' onSubmit={handleSubmit}>
        <div className='div-advertisement'>
          <p className='advertimest-paragraph'>Podstawowe dane</p>
          <label className='advertisement-label' htmlFor="title">Tytuł ogłoszenia:</label>
          <input className='advertisement-input' type="text" name="title" required onChange={(e) => setTitle(e.target.value)} /><br /><br />

          <label className='advertisement-label' htmlFor="area">Powierzchnia:</label>
          <input className='advertisement-input' type="number" min='0' name="area" required onChange={(e) => setSquareMetrage(e.target.value)} /> m²<br /><br />

          <label className='advertisement-label' htmlFor="standard">Standard wykończenia:</label>
          <select className='advertisement-select' name="standard" required onChange={(e) => setFinishingStandard(e.target.value)}>
            <option value="HOUSE">Dom</option>
            <option value="TERRACED_HOUSE">Dom szeregowy</option>
            <option value="APARTMENT">Apartament</option>
            <option value="OTHER">Inne</option>
          </select><br /><br />

          <label className='advertisement-label' htmlFor="market">Rynek:</label>
          <select className='advertisement-select' name="market" 
          required onChange={(e) => setMarket(e.target.value)}>
            <option value="primary">Rynek pierwotny</option>
            <option value="secondary">Rynek wtórny</option>
          </select><br /><br />
      
          <label className='advertisement-label' htmlFor="price">Cena:</label>
          <input className='advertisement-input' type="number" name="price" 
          required onChange={(e) => setPrice(e.target.value)} /> PLN
          <br /><br />
      </div>
      <div className='div-advertisement'>
        <p className='advertimest-paragraph'>Adres</p>

        <label className='advertisement-label' htmlFor="country">Kraj:</label>
        <input className='advertisement-input' type="text" name="country" 
        required onChange={(e) => setCountry(e.target.value)} 
        /><br /><br />

        <label className='advertisement-label' htmlFor="province">Województwo:</label>
        <input className='advertisement-input' type="text" name="province" 
        required onChange={(e) => setRegion(e.target.value)} />
        <br /><br />

        <label className='advertisement-label' htmlFor="commune">Gmina:</label>
        <input className='advertisement-input' type="text" name="commune" 
        required onChange={(e) => setDistrict(e.target.value)} />
        <br /><br />

        <label className='advertisement-label' htmlFor="city">Miejscowość:</label>
        <input className='advertisement-input' type="text" name="city" 
        required onChange={(e) => setLocality(e.target.value)} />
        <br /><br />

        <label className='advertisement-label' htmlFor="street">Ulica:</label>
        <input className='advertisement-input' type="text" name="street" 
        required onChange={(e) => setStreet(e.target.value)} />
        <br /><br />

        <label className='advertisement-label' htmlFor="postal_code">Kod pocztowy:</label>
        <input className='advertisement-input' type="text" name="postal_code" required onChange={(e) => 
        setPostalCode(e.target.value)} 
        /><br /><br />

        <label className='advertisement-label' htmlFor="house_number">Numer domu:</label>
        <input className='advertisement-input' type="text" name="house_number" 
        required onChange={(e) => setHouseNumber(e.target.value)} 
        /><br /><br />

      {/*
        <label className='advertisement-label' htmlFor="coordinates">Koordynaty:</label>
        <input className='advertisement-input' type="text" name="coordinates"
        placeholder="e.g. 40.7128, -74.0060"
        required onChange={(e) => setCoordinates(e.target.value)} />
      <br /><br /> */}

      </div>

      <div className="div-advertisement">
        <p className='advertimest-paragraph'>Wnętrze:</p>

        <label className='advertisement-label' htmlFor="rooms">Liczba pokoi:</label>
        <input className='advertisement-input' type="number" min='0' name="rooms" 
        required onChange={(e) => setNrRooms(e.target.value)} />
        <br /><br />
        
        <button type="button" onClick={() => setRooms([...rooms, { index: rooms.length + 1, metrage: "" }])}>
        Dodaj pokój</button><br /><br />
        
        {rooms.map((room, i) => (
        <div key={i}>
          <label className='advertisement-label' htmlFor={`room_index_${i}`}>Indeks pokoju {i + 1}:</label>
          <input className='advertisement-input' type="number" min='1' name={`room_index_${i}`} value={room.index}
           required readOnly /><br /><br />

          <label className='advertisement-label' htmlFor={`room_metrage_${i}`}>Metraż pokoju {i + 1}:</label>
          <input className='advertisement-input' type="number" min='0' step="0.01" name={`room_metrage_${i}`} value={room.metrage}
          required onChange={(e) => handleRoomMetrageChange(e, i)} /> m²<br /><br />
        </div>
      ))}

        <label className='advertisement-label' htmlFor="bathrooms">Ilość łazienek:</label>
        <input className='advertisement-input' type="number" min='0' name="bathrooms" 
        required onChange={(e) => setNrBathrooms(e.target.value)} />
        <br /><br />

        <label className='advertisement-label' htmlFor="heating">Rodzaj ogrzewania:</label>
        <select className='advertisement-select' name="heating" required onChange={(e) => setTypeOfHeating(e.target.value)}>
          <option value="">Wybierz</option>
          <option value="LACK">Brak</option>
          <option value="HEAT_PUMP">Pompa cieplna</option>
          <option value="FURNACE">Piec</option>
          <option value="ECO_PEA_STOVE">Eko-groszek</option>
          <option value="GAS_FURNACE">Gazowe</option>
          <option value="ELECTRIC_HEATING">Elektryczne</option>
          <option value="SOLAR_PANELS">Fotowoltaika(Panele Słoczneczne)</option>
        </select><br /><br />

        <label className='advertisement-label' htmlFor="condition">Stan:</label>
        <select className='advertisement-select' name="condition" required onChange={(e) => setConditionInside(e.target.value)}>
          <option value="">Wybierz</option>
          <option value="FORMALITIES">Formalności</option>
          <option value="ZERO_CONDITION">Stan zerowy</option>
          <option value="OPEN_BASIC_CONDITION">Stan otwarty</option>
          <option value="CLOSE_BASIC_CONDITION">Stan zamknięty</option>
          <option value="FINISHING_WORKS">Prace wykończeniowe</option>
          <option value="FINISHED">Gotowe do zamieszkania</option>
        </select><br /><br />

        <label className='advertisement-label' htmlFor="basement">Piwnica:</label>
        <select className='advertisement-select' name="basement" 
        required onChange={(e) => setBasement(e.target.value)}>
          <option value="1">Tak</option>
          <option value="0">Nie</option>
        </select><br /><br />

        <label className='advertisement-label' htmlFor="nr_balconies">Liczba balkonów:</label>
        <input className='advertisement-input' type="number" min='0' name="nr_balconies" 
        required onChange={(e) => setNrBalconies(e.target.value)} />
        <br /><br />

        <label className='advertisement-label' htmlFor="attic">Strych:</label>
        <select className='advertisement-select' name="attic" 
        required onChange={(e) => setAttic(e.target.value)}>  
          <option value="1">Tak</option>
          <option value="0">Nie</option>
        </select><br /><br />

        <label className='advertisement-label' htmlFor="floors">Ilość pięter:</label>
        <input className='advertisement-input' type="number" min='0' name="floors" 
        required onChange={(e) => setNrFloors(e.target.value)} />
        <br /><br />

        <label className='advertisement-label' htmlFor="garages">Ilość garaży:</label>
        <input className='advertisement-input' type="number" min='0' name="garages" 
        required onChange={(e) => setNrGarages(e.target.value)} />
        <br /><br />
        
        <label className='advertisement-label' htmlFor="bicycleRack">Stojak na rowery:</label>
        <select className='advertisement-select' name="bicycleRack" required onChange={(e) => setBicycleRack(e.target.value)}>  
          <option value="1">Tak</option>
          <option value="0">Nie</option>
        </select><br /><br />

        <label className='advertisement-label' htmlFor="carParkingSpace">Miejsce parkingowe:</label>
        <select className='advertisement-select' name="carParkingSpace" required onChange={(e) => setCarParkingSpace(e.target.value)}>  
          <option value="1">Tak</option>
          <option value="0">Nie</option>
        </select><br /><br />
      </div>

      <div className="div-advertisement-container">
      <p className='advertisement-paragraph'>Informacje dodatkowe:</p>
        <label className='advertisement-label' htmlFor="description">Opis: </label>
        <input className='advertisement-input' type="text" name="description" 
        required onChange={(e) => setDescription(e.target.value)} 
        /><br /><br />

      <label className='advertisement-label' htmlFor="showAdditionalInfo">Dodaj dodatkowe informacje:</label>
      <input type="checkbox" id="showAdditionalInfo" name="showAdditionalInfo" 
      onChange={() => setShowAdditionalInfo(!showAdditionalInfo)} />

      {showAdditionalInfo && (
        <div className="div-advertisement">


        <label className='advertisement-label' htmlFor="shopDistance">Odległość od sklepu (metry):</label>
        <input className='advertisement-input' type="number" min='0' name="shopDistance" 
        onChange={(e) => setShopDistance(e.target.value)} />
        <br /><br />

        <label className='advertisement-label' htmlFor="parkDistance">Odległość od parku (metry):</label>
        <input className='advertisement-input' type="number" min='0' name="parkDistance" 
        onChange={(e) => setParkDistance(e.target.value)} />
        <br /><br />

        <label className='advertisement-label' htmlFor="playgroundDistance">Odległość od placu zabaw (metry):</label>
        <input className='advertisement-input' type="number" min='0' name="playgroundDistance" 
        onChange={(e) => setPlaygroundDistance(e.target.value)} />
        <br /><br />

        <label className='advertisement-label' htmlFor="kindergardenDistance">Odległość od przedszkola (metry):</label>
        <input className='advertisement-input' type="number" min='0' name="kindergardenDistance" 
         onChange={(e) => setKindergardenDistance(e.target.value)} />
        <br /><br />

        <label className='advertisement-label' htmlFor="schoolDistance">Odległość od szkoły (metry):</label>
        <input className='advertisement-input' type="number" min='0' name="schoolDistance" 
         onChange={(e) => setSchoolDistance(e.target.value)} />
        <br /><br />
        </div>
        )}
      </div>

      <p className='advertisement-paragraph'>Multimedia</p>

      <input type="file" required onChange={handleImageChange} />

      {/*
      {images.map((image, index) => (
        <div key={image.name}>
          <input type="file" name={image.name} required onChange={handleImageChange} />
        </div>
      ))}<br /><br />

      <button type="button" onClick={addImage}>Dodaj zdjęcie</button><br /><br />
      */}

      <p className='advetimest-paragraph'>Dodatkowe:</p>
      <label>Dodaj promowanie oferty:</label>
      <input type="checkbox" name="promotion" value="1" onChange={(e) => setSponsored(e.target.checked)} />
      <br /><br />
      
      <label>Akceptuje regulamin strony:</label>
      <input type="checkbox" name="agreement" required /><br /><br />

      <button type="submit">Wyślij</button>

      {showPopup && (
      <div className="popup-notify">
        <div className="popup-inner-notify">
          {notification}
          {notification.startsWith('Advertisement added successfully') && <Link to="/">Go back to home</Link>}  
          <button onClick={handleClose} className="close-button">Close</button>
        </div>
      </div>
      )}
    </form>
  </div>
  );
};

export default advertisementForm;
