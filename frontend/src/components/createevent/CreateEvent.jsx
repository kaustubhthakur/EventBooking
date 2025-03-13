import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateEvent.css';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    city: '',
    location: '',
    maxseats: 100
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    // Check for auth token
    const token = localStorage.getItem('authToken');
    if (!token) {
      setErrorMessage('You must be logged in to create an event');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/events', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      setIsLoading(false);
      if (response.data) {
        navigate(`/events/${response.data._id}`);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(
        error.response?.data?.message || 'Failed to create event. Please try again.'
      );
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create New Event</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
      <form onSubmit={handleSubmit} className="create-event-form">
        <div className="form-group">
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="maxseats">Maximum Seats</label>
          <input
            type="number"
            id="maxseats"
            name="maxseats"
            min="1"
            value={formData.maxseats}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;