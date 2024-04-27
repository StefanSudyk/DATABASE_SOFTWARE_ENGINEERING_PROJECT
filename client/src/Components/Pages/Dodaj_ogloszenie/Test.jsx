import './Test.css'
export const Test = () => {
return(
<div className='form-body'>
<div className='form-container'>
<div className='form-title'>DODAJ OGŁOSZENIE</div>
    <form>
    <div className='form-podstawoweDane'>
        <div className='input-box'>
            <span className='details'>Tytuł ogłoszenia</span>
            <input type='text' placeholder='Wpisz tytuł ogłosznia' required></input>
        </div>
        <div className='input-box'>
            <span className='details'>Cena</span>
            <input type='text' placeholder='Wpisz cenę' required></input>
        </div>
        <div className='input-box'>
            <span className='details'>Powierzchnia</span>
            <input type='text' placeholder='Wpisz powierzchnię' required></input>
        </div>
        <div className='input-box'>
            <span className='details'></span>
        </div>
    </div>
    <div className='form-standardWykonczenia'>
        <input type='radio' name='standardWykonczenia' id='standardWykonczenia-Dom'></input>
        <input type='radio' name='standardWykonczenia' id='standardWykonczenia-Szeregowka'></input>
        <input type='radio' name='standardWykonczenia' id='standardWykonczenia-Mieszkanie'></input>
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
   
    <div className='button'>
        <input type='submit' value="Dodaj ogłoszenie"></input>
    </div>
    </form>
</div>

</div>
    
)};