import React, { useState } from 'react'
import axios from 'axios'
import './LoginRejestr.css'
import  MainLogo  from '../../../assets/main_logo.png'
const LoginRejestr = () => {

    const [action,setAction] = useState("Zarejestruj")

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone_number: '123456789',
        password: '',
        password_repeat: 'haslo123',
        email: 'defaultemail@gmail.com',
        usertype: 'User'
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/post', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
        });
        console.log(response.data);
        } catch (error) {
            console.error('Upsi!', error);
            console.log({formData});
        }
    };
  return (
<form onSubmit={handleSubmit}>
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
                <input type='text' name="phone_number" placeholder='Numer Telefonu' value={formData.phone_number} onChange={handleChange}></input>
            </div>
            <div className="input">
                <input type='text' name="name" placeholder='Imię' value={formData.name} onChange={handleChange}></input>
            </div>
            <div className="input">
                <input type='text' name="surname" placeholder='Nazwisko' value={formData.surname} onChange={handleChange}></input>
            </div>
            <div className="input">  
                <input type='password' name ="password" placeholder='Hasło' value={formData.password} onChange={handleChange}></input>
            </div>
            <div className="input">  
                <input type='password' name ="password" placeholder='Hasło' value={formData.password} onChange={handleChange}></input>
            </div>
            <div className="input">  
                <input type='password' name ="password" placeholder='Hasło' value={formData.password} onChange={handleChange}></input>
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
</form>
  )
}

export default LoginRejestr
