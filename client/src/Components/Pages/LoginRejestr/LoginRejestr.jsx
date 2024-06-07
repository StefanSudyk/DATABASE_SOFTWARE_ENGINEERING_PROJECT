import React, { useState } from 'react';
import axios from 'axios';
import './LoginRejestr.css';
import MainLogo from '../../../assets/main_logo.png';
import Modal from './modal';

axios.defaults.withCredentials = true;

const RegisterForm = ({ setError, setShowModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone_number: '',
    password: '',
    password_repeat: '',
    email: '',
    usertype: 'User'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
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
      console.log(response.data.message);
      setError('');
      setShowModal(false);
    } catch (error) {
      console.error('Upsi!', error);
      if (error.response) {
        setError(`${error.response.data.message}`);
      } else {
        setError('Wystąpił błąd.');
      }
      setShowModal(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="login-form">
        <div className="input">
          <label htmlFor="phone_number">Numer Telefonu</label>
          <input type='text' id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange}></input>
        </div>
        <div className="input">
          <label htmlFor="email">Email</label>
          <input type='email' id="email" name="email" value={formData.email} onChange={handleChange}></input>
        </div>
        <div className="input">
          <label htmlFor="name">Imię</label>
          <input type='text' id="name" name="name" value={formData.name} onChange={handleChange}></input>
        </div>
        <div className="input">
          <label htmlFor="surname">Nazwisko</label>
          <input type='text' id="surname" name="surname" value={formData.surname} onChange={handleChange}></input>
        </div>
        <div className="input">
          <label htmlFor="password">Hasło</label>
          <input type='password' id="password" name="password" value={formData.password} onChange={handleChange}></input>
        </div>
        <div className="input">
          <label htmlFor="password_repeat">Powtórz hasło</label>
          <input type='password' id="password_repeat" name="password_repeat" value={formData.password_repeat} onChange={handleChange}></input>
          <div className="forgot-password1">Hasło musi posiadać 8 znaków </div>
        </div>
        <div className="submits">
          <div className="submit submit-czys">
            <button type='button' className='but-czysc' onClick={() => setFormData({
              name: '',
              surname: '',
              phone_number: '',
              password: '',
              password_repeat: '',
              email: '',
              usertype: 'User'
            })}>Wyczyść</button>
          </div>
          <div className="submit submit-rej">
            <button type='submit' className='but-logrej'>Zarejestruj</button>
          </div>
        </div>
      </div>
    </form>
  );
};

const LoginForm = ({ setError, setShowModal }) => {
  const [loginData, setLoginData] = useState({
    phone_number: '',
    password: ''
  });
  const [passwordError, setPasswordError] = useState('');

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/login', loginData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const { token } = response.data;
      localStorage.setItem('token', token); // Zapisanie tokenu w lokalnym magazynie danych
      console.log("TOKEN", response.data);
      console.log(response.data.message);
      setError('');
      setShowModal(false);
    } catch (error) {
      console.error('Upsi!', error);
      if (error.response) {
        setError(`${error.response.data.message}`);
      } else {
        setError('Wystąpił błąd.');
      }
      setShowModal(true);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="login-form">
        <div className="input">
          <label htmlFor="login-phone">Numer Telefonu</label>
          <input
            type='text'
            id="login-phone"
            name="phone_number"
            value={loginData.phone_number}
            onChange={handleLoginChange}
          />
        </div>
        <div className="input">
          <label htmlFor="login-password">Hasło</label>
          <input
            type='password'
            id="login-password"
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
            required
            minLength="8"
            maxLength="50"
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <div className="forgot-password">Zapomniałeś hasła? <span>Kliknij tutaj!</span></div>
      </div>
      <div className="submits">
        <div className="submit submit-czys">
            <button type='button' className='but-czysc' onClick={() => setLoginData({
              phone_number: '',
              password: '',
            })}>Wyczyść</button>
        </div>
        <div className="submit submit-log">
          <button type='submit' className='but-logrej'>Zaloguj</button>
        </div>
      </div>
    </form>
  );
};

const LoginRejestr = () => {
  const [action, setAction] = useState("Zarejestruj");
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="login-all">
      <Modal show={showModal} onClose={() => setShowModal(false)} message={error} />
      <div className="login-container">
        <div className="login-photo"></div>
        <div className="login-content">
          
          <div className="login-wybor">
            <div className={action === "Zarejestruj" ? "login-wybor-div granat" : "login-wybor-div"} onClick={() => setAction("Zarejestruj")}>Zarejestruj</div>
            <div className={action === "Zaloguj" ? "login-wybor-div granat" : "login-wybor-div"} onClick={() => setAction("Zaloguj")}>Zaloguj</div>
          </div>
          {action === "Zarejestruj" ? (
            <RegisterForm setError={setError} setShowModal={setShowModal} />
          ) : (
            <LoginForm setError={setError} setShowModal={setShowModal} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRejestr;
