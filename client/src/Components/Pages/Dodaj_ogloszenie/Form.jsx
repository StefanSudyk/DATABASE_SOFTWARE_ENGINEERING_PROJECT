import './Form.css'
import { useState } from "react"
export const Form = () => {
    //Podstawowe
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [squareMetrage,setSquareMetrage ] = useState("");
    const [finishingStandard, setFinishingStandard] = useState("");
    const [market, setMarket ] = useState("");
    const [publicationDate, setPublicationDate] = useState('12-12-2002');
    const [ppMeter, setPpMeter] = useState("70");
    const [sponsored, setSponsored] = useState("No");
   //Adres
   const [country, setCountry  ] = useState("");
   const [region, setRegion  ] = useState("");
   const [district, setDistrict  ] = useState("");
   const [locality, setLocality  ] = useState("");
   const [street, setStreet  ] = useState("");
   const [postalCode, setPostalCode  ] = useState("");
   const [houseNumber, setHouseNumber  ] = useState("");
   const [coordinates, setCoordinates  ] = useState("point"); //!!!!!

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

        //Infrastruktura
    const [idInfrastructure, setIdInfrastructure ] = useState("");
    const [shopDistance, setShopDistance ] = useState("");
    const [parkDistance, setParkDistance ] = useState("");
    const [playgroundDistance, setPlaygroundDistance ] = useState("");
    const [kindergardenDistance, setKindergardenDistance ] = useState("");
    const [schoolDistance, setSchoolDistance ] = useState("");
    const [bicycleRack, setBicycleRack ] = useState("");
    const [carParkingSpace, setCarParkingSpace ] = useState("");
return(

    <>
    <div className='form-body'>
        <div className='form-container'>
            <div className='form-title'>DODAJ OGŁOSZENIE</div>

            <form onSubmit={(e) => {
                e.preventDefault();
                console.log("Podstawowe dane: ",{title, price, squareMetrage, finishingStandard, market, publicationDate, ppMeter, sponsored});
                console.log("Adres: ",{country, region, district, locality, street, postalCode, houseNumber, coordinates});
                console.log("Wnętrze: ",{nrRooms, nrBathrooms, basement, attic, nrGarages, nrBalconies, nrFloors, typeOfHeating, conditionInside, description});
                console.log("Infrastruktura: ",{shopDistance, parkDistance, playgroundDistance, kindergardenDistance, schoolDistance, bicycleRack, carParkingSpace});

            } }

            >
                <div className='form-tableTitle'>Podstawowe dane:</div>
                <div className='form-info'>
                    <div className='input-box'>
                        <span className='details'>Tytuł ogłoszenia</span>
                        <input onChange={(e) => { setTitle(e.target.value); } } type='text' placeholder='Wpisz tytuł ogłosznia' required></input>
                    </div>
                    <div className='input-box'>
                        <span className='details'>Cena</span>
                        <input onChange={(e) => {setPrice(e.target.value)}} type='text' placeholder='Wpisz cenę' required></input>
                    </div>
                    <div className='input-box'>
                        <span className='details'>Powierzchnia</span>
                        <input onChange={(e) => {setSquareMetrage(e.target.value)}} type='text' placeholder='Wpisz powierzchnię' required></input>
                    </div>
                    <div className='input-box'>
                        <span className='details'></span>
                    </div>
                </div>
                <div className='form-standardWykonczenia'>
                    <input type='radio' name='standardWykonczenia' id='standardWykonczenia-Dom' value='Dom' onChange={(e) => {setFinishingStandard(e.target.value)}}></input>
                    <input type='radio' name='standardWykonczenia' id='standardWykonczenia-Szeregowka' value='Szeregowka' onChange={(e) => {setFinishingStandard(e.target.value)}}></input>
                    <input type='radio' name='standardWykonczenia' id='standardWykonczenia-Mieszkanie' value='Mieszkanie' onChange={(e) => {setFinishingStandard(e.target.value)}}></input>
                    <span className='standardWykonczenia-title'>Standard Wykończenia</span>
                    <div className='standardWykonczenia-category'>
                        <label for='standardWykonczenia-Dom'>
                            <span className='dot one'></span>
                            <span className='standardWykonczenia'>Dom</span>
                        </label>
                        <label for='standardWykonczenia-Szeregowka'>
                            <span className='dot two'></span>
                            <span className='standardWykonczenia'>Szeregówka</span>
                        </label>
                        <label for='standardWykonczenia-Mieszkanie'>
                            <span className='dot three'></span>
                            <span className='standardWykonczenia'>Mieszkanie</span>
                        </label>
                    </div>
                </div>
                <div className='form-market'>
                    <input type='radio' name='market' id='market-Wtorny' value='Wtorny' onChange={(e) => { setMarket(e.target.value); } }></input>
                    <input type='radio' name='market' id='market-Pierwotny' value='Pierwotny' onChange={(e) => { setMarket(e.target.value); } }></input>
                    <span className='market-title'>Market</span>
                    <div className='market-category'>
                        <label for='market-Wtorny'>
                            <span className='dot one'></span>
                            <span className='market'>Wtórny</span>
                        </label>
                        <label for='market-Pierwotny'>
                            <span className='dot two'></span>
                            <span className='market'>Pierwotny</span>
                        </label>
                    </div>
                </div>
                <div className='form-tableTitle'>Adres:</div>

                <div className='form-info'>
                    <div className='input-box'>
                        <span className='details'>Kraj</span>
                        <input onChange={(e) => {setCountry(e.target.value)}} type='text' placeholder='Wpisz kraj' required></input>
                    </div>
                    <div className='input-box'>
                        <span className='details'>Województwo</span>
                        <input onChange={(e) => {setRegion(e.target.value)}} type='text' placeholder='Wpisz województwo' required></input>
                    </div>
                    <div className='input-box'>
                        <span className='details'>Gmina</span>
                        <input onChange={(e) => {setDistrict(e.target.value)}} type='text' placeholder='Wpisz gminę' required></input>
                    </div>
                    <div className='input-box'>
                        <span className='details'>Miejscowość</span>
                        <input onChange={(e) => {setLocality(e.target.value)}} type='text' placeholder='Wpisz miejscowość' required></input>
                    </div>
                    <div className='input-box'>
                        <span className='details'>Ulica</span>
                        <input onChange={(e) => {setStreet(e.target.value)}} type='text' placeholder='Wpisz ulicę' required></input>
                    </div>
                    <div className='input-box'>
                        <span className='details'>Kod pocztowy</span>
                        <input onChange={(e) => {setPostalCode(e.target.value)}} type='text' placeholder='Wpisz kod pocztowy' required></input>
                    </div>
                    <div className='input-box'>
                        <span className='details'>Numer domu</span>
                        <input onChange={(e) => {setHouseNumber(e.target.value)}} type='text' placeholder='Wpisz numer domu' required></input>
                    </div>
                    <div className='input-box'>
                        <span className='details'>Kordy xd</span>
                        <input onChange={(e) => {setCoordinates(e.target.value)}} type='text' placeholder='Wpisz kordy X/Y' required></input>
                    </div>
                </div>
                <div className='form-tableTitle'>Wnętrze:</div>
                <div className='form-info'>
                    <div className='input-box'>
                        <span className='details'>Ilość pomieszczeń</span>
                        <input onChange={(e) => {setNrRooms(e.target.value)}} type='number' placeholder='Wpisz ilość pomieszczeń' required></input>
                    </div>
                    <div className='input-box'>
                        <span className='details'>Ilość łazienek</span>
                        <input onChange={(e) => {setNrBathrooms(e.target.value)}} type='number' placeholder='Wpisz ilość łazienek' required></input>
                    </div>
                    <div className='input-box'>
                        <span className='details'>Ilość balkonów</span>
                        <input onChange={(e) => {setNrBalconies(e.target.value)}} type='number' placeholder='Wpisz ilość balkonów' required></input>
                    </div>
                    <div className='input-box'>
                        <span className='details'>Ilość garaży</span>
                        <input onChange={(e) => {setNrGarages(e.target.value)}} type='number' placeholder='Wpisz ilość garaży' required></input>
                    </div>
                    <div className='input-box'>
                        <span className='details'>Ilość pięter</span>
                        <input onChange={(e) => {setNrFloors(e.target.value)}} type='number' placeholder='Wpisz ilość pięter' required></input>
                    </div>
                    <div className='input-box'></div>
                </div>
                <div className='form-piwnica'>
                    <input type='radio' name='piwnica' id='piwnica-Tak' value='Piwnica-Tak' onChange={(e) => {setBasement(e.target.value)}}></input>
                    <input type='radio' name='piwnica' id='piwnica-Nie' value='Piwnica-Nie' onChange={(e) => {setBasement(e.target.value)}}></input>
                    <span className='piwnica-title'>Posiada piwnicę</span>
                    <div className='piwnica-category'>
                        <label for='piwnica-Tak'>
                            <span className='dot one'></span>
                            <span className='piwnica'>Tak</span>
                        </label>
                        <label for='piwnica-Nie'>
                            <span className='dot two'></span>
                            <span className='piwnica'>Nie</span>
                        </label>
                    </div>
                </div>
                <div className='form-strych'>
                    <input type='radio' name='strych' id='strych-Tak' value='Strych-Tak' onChange={(e) => {setAttic(e.target.value)}}></input>
                    <input type='radio' name='strych' id='strych-Nie' value='Strych-Nie' onChange={(e) => {setAttic(e.target.value)}}></input>
                    <span className='strych-title'>Posiada strych</span>
                    <div className='strych-category'>
                        <label for='strych-Tak'>
                            <span className='dot one'></span>
                            <span className='strych'>Tak</span>
                        </label>
                        <label for='strych-Nie'>
                            <span className='dot two'></span>
                            <span className='strych'>Nie</span>
                        </label>
                    </div>
                </div>
                <div className='form-ogrzewanie'>
                    <input type='radio' name='ogrzewanie' id='ogrzewanie-brak' value='Brak' onChange={(e) => {setTypeOfHeating(e.target.value)}}></input>
                    <input type='radio' name='ogrzewanie' id='pompaCiepla' value='Pompa ciepła' onChange={(e) => {setTypeOfHeating(e.target.value)}}></input>
                    <input type='radio' name='ogrzewanie' id='piec' value='Piec' onChange={(e) => {setTypeOfHeating(e.target.value)}}></input>
                    <input type='radio' name='ogrzewanie' id='piecNaEkoGroszek' value='Piec na eko groszek' onChange={(e) => {setTypeOfHeating(e.target.value)}}></input>
                    <input type='radio' name='ogrzewanie' id='piecGazowy' value='Piec gazowy' onChange={(e) => {setTypeOfHeating(e.target.value)}}></input>
                    <input type='radio' name='ogrzewanie' id='ogrzewanieElektryczne' value='Ogrzewanie Elektryczne' onChange={(e) => {setTypeOfHeating(e.target.value)}}></input>
                    <input type='radio' name='ogrzewanie' id='kolektorySloneczne' value='Kolektory słoneczne' onChange={(e) => {setTypeOfHeating(e.target.value)}}></input>
                    <span className='ogrzewanie-title'>Rodzaj ogrzewania</span>
                    <div className='ogrzewanie-category'>
                        <label for='ogrzewanie-brak'>
                            <span className='dot one'></span>
                            <span className='ogrzewanie'>Brak</span>
                        </label>
                        <label for='pompaCiepla'>
                            <span className='dot two'></span>
                            <span className='ogrzewanie'>Pompa ciepła</span>
                        </label>
                        <label for='piec'>
                            <span className='dot three'></span>
                            <span className='ogrzewanie'>Piec</span>
                        </label>
                        <label for='piecNaEkoGroszek'>
                            <span className='dot four'></span>
                            <span className='ogrzewanie'>Piec na eko groszek</span>
                        </label>
                    </div>
                    <div className='ogrzewanie-category'>
                        <label for='piecGazowy'>
                            <span className='dot five'></span>
                            <span className='ogrzewanie'>Piec gazowy</span>
                        </label>
                        <label for='ogrzewanieElektryczne'>
                            <span className='dot six'></span>
                            <span className='ogrzewanie'>Ogrzewanie elektryczne</span>
                        </label>
                        <label for='kolektorySloneczne'>
                            <span className='dot seven'></span>
                            <span className='ogrzewanie'>Kolektory słoneczne</span>
                        </label>
                    </div>
                <div className='form-condition'>
                    <input type='radio' name='condition' id='formalnosciPrzed' value='Formalności przed' onChange={(e) => {setConditionInside(e.target.value)}}></input>
                    <input type='radio' name='condition' id='stanZerowy' value='Stan zerowy' onChange={(e) => {setConditionInside(e.target.value)}}></input>
                    <input type='radio' name='condition' id='stanSurowyOtwarty' value='Stan surowy otwarty' onChange={(e) => {setConditionInside(e.target.value)}}></input>
                    <input type='radio' name='condition' id='stanSurowyZamkniety' value='Stan surowy zamknięty' onChange={(e) => {setConditionInside(e.target.value)}}></input>
                    <input type='radio' name='condition' id='praceWykonczeniowe' value='Prace wykończeniowe' onChange={(e) => {setConditionInside(e.target.value)}}></input>
                    <input type='radio' name='condition' id='gotowy' value='Gotowy' onChange={(e) => {setConditionInside(e.target.value)}}></input>
                    <span className='condition-title'>Condition</span>
                    <div className='condition-category'>
                        <label for='formalnosciPrzed'>
                            <span className='dot one'></span>
                            <span className='condition'>Formalności przed</span>
                        </label>
                        <label for='stanZerowy'>
                            <span className='dot two'></span>
                            <span className='condition'>Stan zerowy</span>
                        </label>
                        <label for='stanSurowyOtwarty'>
                            <span className='dot three'></span>
                            <span className='condition'>Stan surowy otwarty</span>
                        </label>
                    </div>
                    <div className='condition-category'>
                        <label for='stanSurowyZamkniety'>
                            <span className='dot four'></span>
                            <span className='condition'>Stan surowy zamknięty</span>
                        </label>
                        <label for='praceWykonczeniowe'>
                            <span className='dot five'></span>
                            <span className='condition'>Prace wykończeniowe</span>
                        </label>
                        <label for='gotowy'>
                            <span className='dot six'></span>
                            <span className='condition'>Gotowy</span>
                        </label>
                    </div>
                    </div>
                <div className='form-info'>
                    <div className='input-box'>
                        <span className='details'>Opis</span>
                        <input onChange={(e) => {setDescription(e.target.value)}} type='text' placeholder='Opis oferty' required></input>
                    </div>
                </div>
                </div>
                <div className='form-tableTitle'>Infrastruktura:</div>
                <div className='form-info'>
                    <div className='input-box'>
                        <span className='details'>Odległość do sklepu(w metrach)</span>
                        <input onChange={(e) => {setShopDistance(e.target.value)}} type='number' placeholder='Wpisz odległość'></input>
                    </div>
                    <div className='input-box'>
                        <span className='details'>Odległość do parku(w metrach)</span>
                        <input onChange={(e) => {setParkDistance(e.target.value)}} type='number' placeholder='Wpisz odległość'></input>
                    </div>
                    <div className='input-box'>
                        <span className='details'>Odległość do placu zabaw(w metrach)</span>
                        <input onChange={(e) => {setPlaygroundDistance(e.target.value)}} type='number' placeholder='Wpisz odległość'></input>
                    </div>
                    <div className='input-box'>
                        <span className='details'>Odległość do przedszkola(w metrach)</span>
                        <input onChange={(e) => {setKindergardenDistance(e.target.value)}} type='number' placeholder='Wpisz odległość'></input>
                    </div>
                    <div className='input-box'>
                        <span className='details'>Odległość do szkoły(w metrach)</span>
                        <input onChange={(e) => {setSchoolDistance(e.target.value)}} type='number' placeholder='Wpisz odległość'></input>
                    </div>
                    <div className='input-box'>
                        <span className='details'></span>
                    </div>
                </div>
                <div className='form-bicycleRack'>
                    <input type='radio' name='bicycleRack' id='bicycleRack-Tak' value='BicycleRack-Tak' onChange={(e) => {setBicycleRack(e.target.value)}}></input>
                    <input type='radio' name='bicycleRack' id='bicycleRack-Nie' value='BicycleRack-Nie' onChange={(e) => {setBicycleRack(e.target.value)}}></input>
                    <span className='bicycleRack-title'>Posiada stojak na rowery</span>
                    <div className='bicycleRack-category'>
                        <label for='bicycleRack-Tak'>
                            <span className='dot one'></span>
                            <span className='bicycleRack'>Tak</span>
                        </label>
                        <label for='bicycleRack-Nie'>
                            <span className='dot two'></span>
                            <span className='bicycleRack'>Nie</span>
                        </label>
                    </div>
                </div>

                <div className='form-parkingSpace'>
                    <input type='radio' name='parkingSpace' id='parkingSpace-Tak' value='ParkingSpace-Tak' onChange={(e) => {setCarParkingSpace(e.target.value)}}></input>
                    <input type='radio' name='parkingSpace' id='parkingSpace-Nie' value='ParkingSpace-Nie' onChange={(e) => {setCarParkingSpace(e.target.value)}}></input>
                    <span className='parkingSpace-title'>Posiada miejsce parkingowe</span>
                    <div className='parkingSpace-category'>
                        <label for='parkingSpace-Tak'>
                            <span className='dot one'></span>
                            <span className='parkingSpace'>Tak</span>
                        </label>
                        <label for='parkingSpace-Nie'>
                            <span className='dot two'></span>
                            <span className='parkingSpace'>Nie</span>
                        </label>
                    </div>
                </div>


                <div className='button'>
                    <input type='submit' value="Dodaj ogłoszenie"></input>
                </div>

            </form>
        </div>

    </div></>
    
)};