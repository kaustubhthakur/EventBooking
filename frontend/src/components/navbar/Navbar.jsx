import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/">
            <img src="/logo.png" alt="Logo" className="logo" />

          </a>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>

     

        <div className="auth-buttons">
          <button className="login-button">Login</button>
          <button className="register-button">Register</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;