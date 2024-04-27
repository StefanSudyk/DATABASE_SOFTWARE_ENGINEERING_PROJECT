import { useState } from "react"
import './Form.css'
export const Form = () => {
    /* to nie
    const [porperty, setProperty] = useState({
        idProperty: '',
        idOwner: '',
        title: '',
        price: '',
        squareMetrage: '',
        finishingStandard: '',
        condition: 'Kondycja jest git',
        market: '',
        publicationDate: '',
        ppMeter: '',
        sponsored: ''
    }) */

    //Podstawowe
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [squareMetrage,setSquareMetrage ] = useState("");
    const [finishingStandard, setFinishingStandard] = useState("");
    const [market, setMarket ] = useState("");
    const [publicationDate, setPublicationDate] = useState("");
    const [ppMeter, setPpMeter] = useState("");
    const [sponsored, setSponsored] = useState("");
    //o te takie
    const [idProperty, setIdProperty] = useState(1);
    const [idOwner, setIdOwner] = useState(1);

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

    return (
    
    <form onSubmit={(e) => {
        e.preventDefault();
        console.log("Podstawowe dane: ",{idProperty, idOwner, title, price, squareMetrage, finishingStandard, market, publicationDate, ppMeter, sponsored});
        console.log("Adres: ",{idProperty, country, region, district, locality, street, postalCode, houseNumber, coordinates});
        console.log("Wnętrze: ",{idProperty, idInfrastructure, nrRooms, nrBathrooms, basement, attic, nrGarages, nrBalconies, nrFloors, typeOfHeating, conditionInside, description});
        console.log("Infrastruktura: ",{idProperty, shopDistance, parkDistance, playgroundDistance, kindergardenDistance, schoolDistance, bicycleRack, carParkingSpace});

       
    }}
    >
        <div className="form-podstawowe">
        <h1>
            Podstawowe dane:
        </h1>
        <div className="titlee">
            <p>Tytuł ogłoszenia</p>
            <input onChange={(e) => {setTitle(e.target.value)}} type="text" name="title" placeholder="Tytuł"/>
        </div>
        <div>
            <p>Cena</p>
            <input onChange={(e) => {setPrice(e.target.value)}} type="number" name="price" placeholder="Cena"/>
        </div>
        <div>
            <p>Powierzchnia w m^2</p>
            <input onChange={(e) => {setSquareMetrage(e.target.value)}} type="number" name="squareMetrage" placeholder="Powierzchnia (m2)"/>
        </div>
        <div>
            <p>Standard wykończenia</p>
            <input onChange={(e) => {setFinishingStandard(e.target.value)}} type="text" name="finishingStandard" placeholder="Dom/Szeregówka/Mieszkanie"/>
        </div>
        <div>
            <p>Rynek</p>
            <input onChange={(e) => {setMarket(e.target.value)}} type="text" name="market" placeholder="Wtórny/Pierwotny"/>
        </div>
        <div>
            <p>Data dodania ogłoszenia--z automatu</p>
            <input onChange={(e) => {setPublicationDate(e.target.value)}} type="date" name="publicationDate" placeholder="Data->teraz"/>
        </div>
        <div>
            <p>Cena za m^2--tez z automatu</p>
            <input onChange={(e) => {setPpMeter(e.target.value)}} type="number" name="ppMeter" placeholder="Cena za metr kw"/>
        </div>
        <div>
            <p>Sponsorowane</p>
            <select onChange={(e) => {setSponsored(e.target.value)}}  name="sponsored">
                <option value={'sponsoredNone'}>Sponsorowane</option>
                <option value={'sponsoredYes'}>Tak</option>
                <option value={'sponsoredNo'}>Nie</option>
            </select>
        </div>
        </div>
        <div className="form-multimedia">
        <h1>
            Multimedia:
        </h1>
            Podobno nie dzialaja to nie ma B)
        </div>
        <div className="form-adres">
        <h1>
            Adres:                                  
        </h1>
        <div>
            <p>Kraj</p>
            <input onChange={(e) => {setCountry(e.target.value)}} type="text" name="country" placeholder="Kraj"/>
        </div>
        <div>
            <p>Województwo</p>
            <input onChange={(e) => {setRegion(e.target.value)}} type="text" name="region" placeholder="Województwo"/>
        </div>
        <div>
            <p>Gmina</p>
            <input onChange={(e) => {setDistrict(e.target.value)}} type="text" name="district" placeholder="Gmina"/>
        </div>
        <div>
            <p>Miejscowość</p>
            <input onChange={(e) => {setLocality(e.target.value)}} type="text" name="locality" placeholder="Miejscowość"/>
        </div>
        <div>
            <p>Ulica</p>
            <input onChange={(e) => {setStreet(e.target.value)}} type="text" name="street" placeholder="Ulica"/>
        </div>
        <div>
            <p>Kod pocztowy</p>
            <input onChange={(e) => {setPostalCode(e.target.value)}} type="text" name="postalCode" placeholder="Kod pocztowy"/>
        </div>
        <div>
            <p>Numer domu</p>
            <input onChange={(e) => {setHouseNumber(e.target.value)}} type="number" name="houseNumber" placeholder="Numer domu"/>
        </div>
        <div>
            <p>Kordy??</p>
            <input onChange={(e) => {setCoordinates(e.target.value)}} type="text" name="coordinates" placeholder="Kordy X/Y"/>
        </div>
        </div>
        <div className="form-wnetrze">
        <h1>
            Wnętrze:
        </h1>
        <div>
            <p>Liczba pomieszczeń</p>
            <input onChange={(e) => {setNrRooms(e.target.value)}} type="number" name="nrRooms" placeholder="Liczba pomieszczeń"/>
        </div>
        <div>
            <p>Liczba łazienek</p>
            <input onChange={(e) => {setNrBathrooms(e.target.value)}} type="number" name="nrBathrooms" placeholder="Liczba łazienek"/>
        </div>
        <div>
            <p>Liczba garaży</p>
            <input onChange={(e) => {setNrGarages(e.target.value)}} type="number" name="nrGarages" placeholder="Liczba garaży"/>
        </div>
        <div>
            <p>Liczba balkonów</p>
            <input onChange={(e) => {setNrBalconies(e.target.value)}} type="number" name="nrBalconies" placeholder="Liczba balkonów"/>
        </div>
        <div>
            <p>Liczba pięter</p>
            <input onChange={(e) => {setNrFloors(e.target.value)}} type="number" name="nrFloors" placeholder="Liczba pięter"/>
        </div>
        <div>
        <p>Posiada piwnicę</p>
        <select onChange={(e) => {setBasement(e.target.value)}}  name="basement">
                <option value={'basementNone'}>---</option>
                <option value={'basementYes'}>Tak</option>
                <option value={'basementNo'}>Nie</option>
        </select>
        </div>
        <div>
        <p>Posiada strych</p>
        <select onChange={(e) => {setAttic(e.target.value)}}  name="attic">
                <option value={'atticNone'}>---</option>
                <option value={'atticYes'}>Tak</option>
                <option value={'atticNo'}>Nie</option>
        </select>
        </div>
        <div>
            <p>Rodzaj ogrzewania</p>
        <select onChange={(e) => {setTypeOfHeating(e.target.value)}}  name="typeOfHeating">
                <option value={'heatingNone'}>---</option>
                <option value={'heatingBrak'}>Brak</option>
                <option value={'heatingPompaCiepla'}>Pompa ciepła</option>
                <option value={'heatingPiec'}>Piec</option>
                <option value={'heatingPiecNaEkoGroszek'}>Piec na eko groszek</option>
                <option value={'heatingPiecGazowy'}>Piec gazowy</option>
                <option value={'heatingOgrzewanieElektryczne'}>Ogrzewanie elektryczne</option>
                <option value={'heatingKolektorySloneczne'}>Kolektory słoneczne</option>
        </select>
        </div>
        <div>
            <p>Kondycja?</p>
        <select onChange={(e) => {setConditionInside(e.target.value)}}  name="conditionInside">
                <option value={'conditionNone'}>---</option>
                <option value={'conditionFormalnosciPrzed'}>Formalności przed</option>
                <option value={'conditionStanZerowy'}>Stan zerowy</option>
                <option value={'conditionStanSurowyOtwarty'}>Stan surowy otwarty</option>
                <option value={'conditionStanSurowyZamkniety'}>Stan surowy zamknięty</option>
                <option value={'conditionPraceWykonczeniowe'}>Prace wykończeniowe</option>
                <option value={'conditionGotowy'}>Gotowy</option>
        </select>
        </div>
        <div>
            <p>Opis ogłoszenia</p>
            <input onChange={(e) => {setDescription(e.target.value)}} type="text" name="description" placeholder="Opis"/>
        </div>
        </div>
        <div className="form-infrastruktura">
        <h1>Infrastruktura:</h1>
        <div>
            <p>Odległość do sklepu(w metrach)</p>
            <input onChange={(e) => {setShopDistance(e.target.value)}} type="number" name="shopDistance" placeholder="Odległość do sklepu"/>
        </div>
        <div>
            <p>Odległość do parku(w metrach)</p>
            <input onChange={(e) => {setParkDistance(e.target.value)}} type="number" name="parkDistance" placeholder="Odległość do parku"/>
        </div>
        <div>
            <p>Odległość do placu zabaw(w metrach)</p>
            <input onChange={(e) => {setPlaygroundDistance(e.target.value)}} type="number" name="playgroundDistance" placeholder="Odległość do placu zabaw"/>
        </div>
        <div>
            <p>Odległość do przedszkola(w metrach)</p>
            <input onChange={(e) => {setKindergardenDistance(e.target.value)}} type="number" name="kindergartenDistance" placeholder="Odległość do przedszkola"/>
        </div>
        <div>
            <p>Odległość do szkoły(w metrach)</p>
            <input onChange={(e) => {setSchoolDistance(e.target.value)}} type="number" name="schoolDistance" placeholder="Odległość do szkoły"/>
        </div>
        <div>
            <p>Stojak na rowery</p>
        <select onChange={(e) => {setBicycleRack(e.target.value)}}  name="bicycleRack">
                <option value={'bicycleRackNone'}>---</option>
                <option value={'bicycleRackYes'}>Tak</option>
                <option value={'bicycleRackNo'}>Nie</option>
        </select>
        </div>
        <div>
            <p>Miejsce parkingowe</p>
        <select onChange={(e) => {setCarParkingSpace(e.target.value)}}  name="carParkingSpace">
                <option value={'carParkingSpaceNone'}>---</option>
                <option value={'carParkingSpaceYes'}>Tak</option>
                <option value={'carParkingSpaceNo'}>Nie</option>
        </select>
        </div>
        </div>
        <button type="submit">Dodaj</button>
    </form>
    
    )
};