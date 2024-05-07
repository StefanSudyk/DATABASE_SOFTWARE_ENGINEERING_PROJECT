import React, { useState } from 'react'
import './LoginRejestr.css'
import  MainLogo  from '../../../assets/main_logo.png'
const LoginRejestr = () => {

    const [action,setAction] = useState("Zarejestruj")

  return (
<div className="login-all">
    {action==="Zarejestruj"?
    <div className='login-container'>
      <div className="login-photo"></div>
      <div className="login-content">
        <div className="login-logo">
            <img src={MainLogo}></img>
        </div>
        <div className="login-wybor">         
            <div className={action==="Zarejestruj"?"login-wybor-div granat":"login-wybor-div"} onClick={()=>{setAction("Zarejestruj")}}>Zarejestruj</div>
            <div className={action==="Zaloguj"?"login-wybor-div granat":"login-wybor-div"} onClick={()=>{setAction("Zaloguj")}}>Zaloguj</div>
        </div>
        <div className="login-form">
            <div className="input">  
                <input type='text' placeholder='Numer Telefonu'></input>
            </div>
            <div className="input">
                <input type='text' placeholder='Imię'></input>
            </div>
            <div className="input">
                <input type='text' placeholder='Nazwisko'></input>
            </div>
            <div className="input">  
                <input type='password' placeholder='Hasło'></input>
            </div>
           
        </div>
        <div className="submits">
            <div className="submit submit-czys">
                <button type='submit' className='but-czysc'>Wyczyść</button>
            </div>
            <div className="submit submit-rej">
                <button type='submit' className='but-logrej'>Zarejestruj</button>
            </div>
        </div>
      </div>
    </div>:
        <div className='login-container-login'>
        <div className="login-photo"></div>
        <div className="login-content">
          <div className="login-logo">
              <img src={MainLogo}></img>
          </div>
          <div className="login-wybor">         
              <div className={action==="Zarejestruj"?"login-wybor-div granat":"login-wybor-div"} onClick={()=>{setAction("Zarejestruj")}}>Zarejestruj</div>
              <div className={action==="Zaloguj"?"login-wybor-div granat":"login-wybor-div"} onClick={()=>{setAction("Zaloguj")}}>Zaloguj</div>
          </div>
          <div className="login-form">
              <div className="input">  
                  <input type='text' placeholder='Numer Telefonu'></input>
              </div>
              <div className="input">  
                  <input type='password' placeholder='Hasło'></input>
              </div>
              
          <div className="forgot-password">Zapomniałeś hasła? <span>Kliknij tutaj!</span></div>
          
          </div>
          <div className="submits">
              <div className="submit submit-czys">
                  <button type='submit' className='but-czysc'>Wyczyść</button>
              </div>
              <div className="submit submit-log">
                  <button type='submit' className='but-logrej'>Zaloguj</button>
              </div>
          </div>
        </div>
      </div>}
</div>
  )
}

export default LoginRejestr
