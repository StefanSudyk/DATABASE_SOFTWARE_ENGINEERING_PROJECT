import React from 'react';
import { Link } from 'react-router-dom';
import './ButtonBack.css';

const ButtonBack = () => {
  return (
    <Link to="/" className="button-back">
      <span className="button-back-icon">&lt;</span> Wróć
    </Link>
  );
};

export default ButtonBack;