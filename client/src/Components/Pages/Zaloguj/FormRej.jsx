import { useState } from "react"

export const FormRej = () => {
    const [nrTel, setNrTel] = useState("");
    const [imie, setImie] = useState("");
    const [nazwisko, setNazwisko] = useState("");
    const [haslo, setHaslo] = useState("");

    return (
    <form onSubmit={(e) => {
        e.preventDefault();
        console.log("Dane rejestracji: ",{nrTel, imie, nazwisko, haslo});
    }}
    >
        <h1>
            Rejestracja:
        </h1>
        <div>
            <input onChange={(e) => {setNrTel(e.target.value)}} type="number" name="nrTel" placeholder="Numer Telefonu"/>
        </div>
        <div>
            <input onChange={(e) => {setHaslo(e.target.value)}} type="password" name="haslo" placeholder="Hasło"/>
        </div>
        <div>
            <input onChange={(e) => {setImie(e.target.value)}} type="text" name="imie" placeholder="Imie"/>
        </div>
        <div>
            <input onChange={(e) => {setNazwisko(e.target.value)}} type="text" name="nazwisko" placeholder="Nazwisko"/>
        </div>
        <button type="submit">Zarejestruj</button>
    </form>
    )
};