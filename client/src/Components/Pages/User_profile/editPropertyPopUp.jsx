import React,{useState, useEffect} from 'react'
import './editPropertyPopUp.css'
import axios from 'axios'

const editPropertyPopUp = ({ isOpen, property, setEditIsOpen, onClose, setRefresh }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleAnullment = () => {
    setEditIsOpen(false);
  };
  const [imageBase64String, setImageBase64String] = useState("");
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

 //Additional
  const [bicycleRack, setBicycleRack ] = useState("");
  const [carParkingSpace, setCarParkingSpace ] = useState("");

  //Infrastruktura 
  const [shopDistance, setShopDistance ] = useState("");
  const [parkDistance, setParkDistance ] = useState("");
  const [playgroundDistance, setPlaygroundDistance ] = useState("");
  const [kindergardenDistance, setKindergardenDistance ] = useState("");
  const [schoolDistance, setSchoolDistance ] = useState("");

  //Checkbox
  const [sponsored, setSponsored] = useState("");

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {

        // Make sure 'property' object is available in this scope
        console.log(`Fetching data for property ID: ${property}`); // Debug message
        const response = await axios.get(`${apiUrl}/getproperty/${property}`);
        
        if (response.status === 200) {
          console.log('Property data:', response.data);
          const propertyData = response.data;
  
          // Update state with the fetched data

          setTitle(propertyData.title);
          setPrice(propertyData.price);
          setSquareMetrage(propertyData.square_metrage);
          setFinishingStandard(propertyData.finishing_standard);
          setMarket(propertyData.market);

          setSponsored(propertyData.sponsored);
  
          // Address information
          setCountry(propertyData.county);
          setRegion(propertyData.region);
          setDistrict(propertyData.district);
          setLocality(propertyData.locality);
          setStreet(propertyData.street);
          setPostalCode(propertyData.postal_code);
          setHouseNumber(propertyData.house_number);
          
          // Assuming 'coordinates' is an object with 'lat' and 'lng'
          setCoordinates({ lat: propertyData.coordinates.lat, lng: propertyData.coordinates.lng });

  
          // Property details
          setNrRooms(propertyData.nr_rooms);
          setNrBathrooms(propertyData.nr_bathrooms);
          setBasement(propertyData.basement);
          setAttic(propertyData.attic);
          setNrGarages(propertyData.nr_garages);
          setNrBalconies(propertyData.nr_balconies);
          setNrFloors(propertyData.nr_floors);
          setTypeOfHeating(propertyData.type_of_heating);
          setConditionInside(propertyData.condition_);
  
          setDescription(propertyData.description);
  
          // Distances
          setShopDistance(propertyData.shop_distance || "0");
          setParkDistance(propertyData.park_distance || "0");
          setPlaygroundDistance(propertyData.playground_distance || "0");
          setKindergardenDistance(propertyData.kindergarden_distance || "0");
          setSchoolDistance(propertyData.school_distance || "0");
  
          // Amenities
          setBicycleRack(propertyData.bicycle_rack);
          setCarParkingSpace(propertyData.car_parking_space);
          // ... update other state variables as needed ...
          
          // If rooms are an array of objects like [{ index: 1, metrage: "" }, ...]
          
          
          // ... handle additional info if needed ...
        }
      } catch (error) {
        console.error('Error fetching property data:', error);
        // Handle error here, e.g., set error notification
      }
    };
  
    if (isOpen) {
      fetchPropertyData();
    }
  }, [isOpen, property]); // Depend on isOpen and property.id to re-run the effect

  const [rooms, setRooms] = useState([{ index: 1, metrage: "" }]);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

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

  
  if (!isOpen) return null;


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = date.getFullYear();
  
    const publicationDate = `${day}.${month}.${year}`;
  
    const pricePerMeter = price / squareMetrage; //handling p_p_metrage
  
    const formData = {
      'title' : title,
      'price' : price,
      'square_metrage' : squareMetrage,
      'finishing_standard' : finishingStandard,
      'market' : market,
      'publication_date': publicationDate,
      'p_p_meter': pricePerMeter,
      'sponsored': sponsored || 0,
  
      'county': country,
      'region': region,
      'district': district,
      'locality': locality,
      'street': street,
      'postal_code': postalCode,
      'house_number': houseNumber,
      
  
      'address_photo': description,
      'description_photo': description,
      'photo':imageBase64String,
      
      'coordinates':0,
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
  
    console.log('Form data:', formData); 
    
      try {
        
        console.log(`Sending PATCH request to ${apiUrl}/updateproperty/${property}`); // Debug message
        const response = await axios.patch(`${apiUrl}/updateproperty/${property}`, formData);
        
        // ... existing code ...
      } catch (error) {
        console.error('Error:', error);
        // Handle error here, e.g., set error notification
      }
      setEditIsOpen(false);
    };


  return (
    <div className='edit-popup'>
      <div className="edit-inner-popup">
      <div className="form-container">
      <form className='form-advertisement-data' onSubmit={handleSubmit}>
        <div className='div-advertisement'>
          <p className='advertisement-paragraph'>Podstawowe dane</p>
          <label className='advertisement-label' htmlFor="title" >Tytuł ogłoszenia:</label>
          <input className='advertisement-input' value={title} type="text" name="title" required onChange={(e) => setTitle(e.target.value)} placeholder='max 100 znaków'/><br /><br />

          <div className="flex-container">
                <div className="flex-item">
                    <label className="advertisement-label" htmlFor="area">Powierzchnia:</label>
                    <input className="advertisement-input"value={squareMetrage} type="number" min="0" name="area" required onChange={(e) => setSquareMetrage(e.target.value)} placeholder='m²'/> 
                </div>
                <div className="flex-item">
                    <label className="advertisement-label" htmlFor="standard">Standard wykończenia:</label>
                    <select className="advertisement-select" name="standard" value={finishingStandard} required onChange={(e) => setFinishingStandard(e.target.value)}>
                        <option value="HOUSE">Dom</option>
                        <option value="TERRACED_HOUSE">Dom szeregowy</option>
                        <option value="APARTMENT">Apartament</option>
                        <option value="OTHER">Inne</option>
                    </select>
                </div>
            </div>
            <div className="flex-container">
                <div className="flex-item">
                    <label className="advertisement-label" htmlFor="market">Rynek:</label>
                    <select className="advertisement-select" name="market" value={market} required onChange={(e) => setMarket(e.target.value)}>
                        <option value="primary">Rynek pierwotny</option>
                        <option value="secondary">Rynek wtórny</option>
                    </select>
                </div>
                <div className="flex-item">
                    <label className="advertisement-label" htmlFor="price">Cena:</label>
                    <input className="advertisement-input cena" type="number" name="price" value={price} required onChange={(e) => setPrice(e.target.value)} placeholder='PLN'/> 
                </div>
            </div>
      </div>
      <div className='div-advertisement'>
      <p className="advertisement-paragraph">Adres</p>

      <label className="advertisement-label" htmlFor="country">Dzielnica:</label>
      <input className="advertisement-input" type="text" name="country" value={country} required onChange={(e) => setCountry(e.target.value)}/>

      <div className="flex-container">
          <div className="flex-item">
              <label className="advertisement-label" htmlFor="province">Województwo:</label>
              <input className="advertisement-input" type="text" name="province" value={region} required onChange={(e) => setRegion(e.target.value)} />
          </div>
          <div className="flex-item">
              <label className="advertisement-label" htmlFor="commune">Gmina:</label>
              <input className="advertisement-input" type="text" name="commune" value={district} required onChange={(e) => setDistrict(e.target.value)} />
          </div>
      </div>

      <div className="flex-container">
          <div className="flex-item">
              <label className="advertisement-label" htmlFor="city">Miejscowość:</label>
              <input className="advertisement-input" type="text" name="city" value={locality} required onChange={(e) => setLocality(e.target.value)} />
          </div>
          <div className="flex-item">
              <label className="advertisement-label" htmlFor="street">Ulica:</label>
              <input className="advertisement-input" type="text" name="street" value={street} required onChange={(e) => setStreet(e.target.value)} />
          </div>
      </div>

      <div className="flex-container">
          <div className="flex-item">
              <label className="advertisement-label" htmlFor="postal_code">Kod pocztowy:</label>
              <input className="advertisement-input" type="text" name="postal_code" value={postalCode} required onChange={(e) => setPostalCode(e.target.value)} />
          </div>
          <div className="flex-item">
              <label className="advertisement-label" htmlFor="house_number">Numer domu:</label>
              <input className="advertisement-input" type="text" name="house_number"value={houseNumber} required onChange={(e) => setHouseNumber(e.target.value)} />
          </div>
      </div>

      {/*
        <label className='advertisement-label' htmlFor="coordinates">Koordynaty:</label>
        <input className='advertisement-input' type="text" name="coordinates"
        placeholder="e.g. 40.7128, -74.0060"
        required onChange={(e) => setCoordinates(e.target.value)} />
      <br /><br /> */}

      </div>
      
      <div className="div-advertisement">
        <p className='advertisement-paragraph'>Wnętrze</p>

        <label className='advertisement-label' htmlFor="rooms">Liczba pokoi:</label>
        <input className='advertisement-input' type="number" min='0' name="rooms" value={nrRooms} 
        required onChange={(e) => setNrRooms(e.target.value)} />
        <br /><br />

        {rooms.map((room, i) => (
          <div key={i}>
        <div className="flex-container">

          
            <div className="flex-item">
              <label className='advertisement-label' htmlFor={`room_index_${i}`}>Indeks pokoju {i + 1}:</label>
              <input className='advertisement-input' type="number" min='1' name={`room_index_${i}`} value={room.index}
              required readOnly /><br /><br />
            </div>
            <div className="flex-item">
              <label className='advertisement-label' htmlFor={`room_metrage_${i}`}>Metraż pokoju {i + 1}:</label>
              <input className='advertisement-input' type="number" min='0' step="0.01" name={`room_metrage_${i}`} value={room.metrage}
              required onChange={(e) => handleRoomMetrageChange(e, i)} placeholder='m²'/> <br /><br />
            </div>
          </div>
        </div>
      ))}
            <button type="button" className="AddRoom"onClick={() => setRooms([...rooms, { index: rooms.length + 1, metrage: "" }])}>
              Dodaj pokój</button><br /><br />
      </div>

      <div className="div-advertisement">
        <div className="flex-container">
          <div className="flex-item">
            <label className='advertisement-label' htmlFor="bathrooms">Ilość łazienek:</label>
            <input className='advertisement-input' type="number" min='0' name="bathrooms" value={nrBathrooms}
            required onChange={(e) => setNrBathrooms(e.target.value)} />
            <br /><br />
          </div>
          <div className="flex-item">
            <label className='advertisement-label' htmlFor="heating">Rodzaj ogrzewania:</label>
            <select className='advertisement-select' name="heating" value={typeOfHeating} required onChange={(e) => setTypeOfHeating(e.target.value)}>
              <option value="">Wybierz</option>
              <option value="LACK">Brak</option>
              <option value="HEAT_PUMP">Pompa cieplna</option>
              <option value="FURNACE">Piec</option>
              <option value="ECO_PEA_STOVE">Eko-groszek</option>
              <option value="GAS_FURNACE">Gazowe</option>
              <option value="ELECTRIC_HEATING">Elektryczne</option>
              <option value="SOLAR_PANELS">Fotowoltaika(Panele Słoczneczne)</option>
            </select><br /><br />
          </div>
        </div>
        <div className="flex-container">
          <div className="flex-item">
            <label className='advertisement-label' htmlFor="condition">Stan:</label>
            <select className='advertisement-select' name="condition" value={conditionInside} required onChange={(e) => setConditionInside(e.target.value)}>
              <option value="">Wybierz</option>
              <option value="FORMALITIES">Formalności</option>
              <option value="ZERO_CONDITION">Stan zerowy</option>
              <option value="OPEN_BASIC_CONDITION">Stan otwarty</option>
              <option value="CLOSE_BASIC_CONDITION">Stan zamknięty</option>
              <option value="FINISHING_WORKS">Prace wykończeniowe</option>
              <option value="FINISHED">Gotowe do zamieszkania</option>
            </select><br /><br />
          </div>
          <div className="flex-item">
            <label className='advertisement-label' htmlFor="basement">Piwnica:</label>
            <select className='advertisement-select' name="basement" value={basement}
            required onChange={(e) => setBasement(e.target.value)}>
              <option value="1">Tak</option>
              <option value="0">Nie</option>
            </select><br /><br />
          </div>
        </div>
        <div className="flex-container">
          <div className="flex-item">
            <label className='advertisement-label' htmlFor="nr_balconies">Liczba balkonów:</label>
            <input className='advertisement-input' type="number" min='0' name="nr_balconies" value={nrBalconies}
            required onChange={(e) => setNrBalconies(e.target.value)} />
            <br /><br />
          </div>
          <div className="flex-item">
            <label className='advertisement-label' htmlFor="attic">Strych:</label>
            <select className='advertisement-select' name="attic" value={attic}
            required onChange={(e) => setAttic(e.target.value)}>  
              <option value="1">Tak</option>
              <option value="0">Nie</option>
            </select><br /><br />
          </div>
        </div>
        <div className="flex-container">
          <div className="flex-item">
            <label className='advertisement-label' htmlFor="floors">Ilość pięter:</label>
            <input className='advertisement-input' type="number" min='0' name="floors" value={nrFloors}
            required onChange={(e) => setNrFloors(e.target.value)} />
            <br /><br />
          </div>
          <div className="flex-item">
            <label className='advertisement-label' htmlFor="garages">Ilość garaży:</label>
            <input className='advertisement-input' type="number" min='0' name="garages" value={nrGarages}
            required onChange={(e) => setNrGarages(e.target.value)} />
            <br /><br />
          </div>  
        </div>
        <div className="flex-container">
          <div className="flex-item">
            <label className='advertisement-label' htmlFor="bicycleRack">Stojak na rowery:</label>
            <select className='advertisement-select' name="bicycleRack" value={bicycleRack} required onChange={(e) => setBicycleRack(e.target.value)}>  
              <option value="1">Tak</option>
              <option value="0">Nie</option>
            </select><br /><br />
          </div>
          <div className="flex-item">
            <label className='advertisement-label' htmlFor="carParkingSpace">Miejsce parkingowe:</label>
            <select className='advertisement-select' name="carParkingSpace" value={carParkingSpace} required onChange={(e) => setCarParkingSpace(e.target.value)}>  
              <option value="1">Tak</option>
              <option value="0">Nie</option>
            </select><br /><br />
          </div>
        </div>
      </div>

      <div className="div-advertisement-container">
      <div className="div-advertisement">  
        
        <p className='advertisement-paragraph'>Informacje dodatkowe:</p>
          <label className='advertisement-label' htmlFor="description">Opis: </label>
          <input className='advertisement-input' type="text" name="description" 
          required onChange={(e) => setDescription(e.target.value)} value={description} placeholder='max 200 znaków'
          /><br /><br />
        <div className="flex-container">
          <label className='advertisement-label' htmlFor="showAdditionalInfo">Dodaj dodatkowe informacje:</label>
          <input type="checkbox" className='infoCheckbox' id="showAdditionalInfo" name="showAdditionalInfo" 
          onChange={() => setShowAdditionalInfo(!showAdditionalInfo)} />
        </div>
      </div>
      {showAdditionalInfo && (
        <div className="div-advertisement">

        <div className="flex-container">  
          <div className="flex-item">
            <label className='advertisement-label' htmlFor="shopDistance">Odległość od sklepu:</label>
            <input className='advertisement-input' type="number" min='0' name="shopDistance" value={shopDistance}
            onChange={(e) => setShopDistance(e.target.value)} placeholder='w metrach'/>
            <br /><br />
          </div>
          <div className="flex-item">
            <label className='advertisement-label' htmlFor="parkDistance">Odległość od parku:</label>
            <input className='advertisement-input' type="number" min='0' name="parkDistance" value={parkDistance}
            onChange={(e) => setParkDistance(e.target.value)} placeholder='w metrach'/>
            <br /><br />
          </div>
        </div>
        <div className="flex-container"> 
          <div className="flex-item">
            <label className='advertisement-label' htmlFor="playgroundDistance">Odległość od placu zabaw:</label>
            <input className='advertisement-input' type="number" min='0' name="playgroundDistance" value={playgroundDistance}
            onChange={(e) => setPlaygroundDistance(e.target.value)} placeholder='w metrach'/>
            <br /><br />
          </div>
          <div className="flex-item">
            <label className='advertisement-label' htmlFor="kindergardenDistance">Odległość od przedszkola:</label>
            <input className='advertisement-input' type="number" min='0' name="kindergardenDistance" value={kindergardenDistance}
            onChange={(e) => setKindergardenDistance(e.target.value)} placeholder='w metrach'/>
            <br /><br />
          </div>
        </div>
        <div className="flex-container-mid">
          <div className="flex-item-mid">
            
            <label className='advertisement-label' htmlFor="schoolDistance">Odległość od szkoły:</label>
            <input className='advertisement-input' type="number" min='0' name="schoolDistance" value={schoolDistance}
            onChange={(e) => setSchoolDistance(e.target.value)} placeholder='w metrach'/>
            
            <br /><br />
          
          </div>
        </div>
        </div>
        )}
      </div>
      <div className="div-advertisement">
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
      </div>
      
      <label className='advertisement-label'>Dodaj promowanie oferty</label>
      <input type="checkbox" className='infoCheckbox' name="promotion" value="1" onChange={(e) => setSponsored(e.target.checked)} />
      
      <label className='advertisement-label'>Akceptuje regulamin strony</label>
      <input type="checkbox" className='infoCheckbox' name="agreement" required /><br /><br />
      
      <div className='button-container'>
        <button type="submit" className='sendButton'>Wyślij</button>
        <button  onClick={onClose} className='sendButton'>Anuluj</button>
      </div>
      </form>
      </div>
  
      </div>      
    </div>
  )
}


export default editPropertyPopUp