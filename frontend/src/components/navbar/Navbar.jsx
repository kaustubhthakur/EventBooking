import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simple authentication check
    const token = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('username');
    
    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername || 'User'); // Fallback if username isn't stored
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      // Get the token
      const token = localStorage.getItem('authToken');
      
      // Call backend logout endpoint
      await axios.post('/api/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Clear authentication data from localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
      
      // Update state
      setIsLoggedIn(false);
      setUsername('');
      
      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if the backend call fails, remove the token and log the user out
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
      setIsLoggedIn(false);
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/">BookMySeat</a>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <a href="/" className="nav-links">Home</a>
          </li>
          <li className="nav-item">
            <a href="/movies" className="nav-links">Movies</a>
          </li>
          <li className="nav-item">
            <a href="/theaters" className="nav-links">Theaters</a>
          </li>
        </ul>

        <div className="auth-buttons">
          {isLoggedIn ? (
            <>
              <span className="username">Welcome, {username}</span>
              <button className="profile-button" onClick={() => navigate('/profile')}>Profile</button>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className="login-button" onClick={() => navigate('/login')}>Login</button>
              <button className="register-button" onClick={() => navigate('/register')}>Register</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;