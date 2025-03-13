import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const { username, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Clear error when user starts typing again
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
    
    // Clear login error when user modifies either field
    if (loginError) {
      setLoginError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Username validation
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    // Form validation
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const response = await axios.post('https://localhost:6969/auth/login', {
        username,
        password
      });
      
      if (response.data) {
        // Store authentication token
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
        }
        
        // Store user data if provided
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        
        setIsLoading(false);
        
        // Redirect to dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data) {
        setLoginError(error.response.data.error || 'Invalid credentials');
      } else {
        setLoginError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2>Login to Your Account</h2>
        {loginError && <div className="error-message">{loginError}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Enter your username"
              className={errors.username ? 'input-error' : ''}
            />
            {errors.username && <p className="error-text">{errors.username}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          
          <div className="register-link">
            Don't have an account? <a href="/register">Register</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;