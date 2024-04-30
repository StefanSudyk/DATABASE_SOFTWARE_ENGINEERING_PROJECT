import { useState } from "react"

export const Form = () => {
    const [nrTel, setNrTel] = useState("");
    const [haslo, setHaslo] = useState("");

    return (
    <form onSubmit={(e) => {
        e.preventDefault();
        console.log("Dane logowania: ",{nrTel, haslo});
    }}
    >
        <h1>
            Logowanie:
        </h1>
        <div>
            <input onChange={(e) => {setNrTel(e.target.value)}} type="number" name="publicationDate" placeholder="Numer Telefonu"/>
        </div>
        <div>
            <input onChange={(e) => {setHaslo(e.target.value)}} type="password" name="publicationDate" placeholder="Hasło"/>
        </div>
        <button type="submit">Zaloguj</button>
    </form>
    )
};