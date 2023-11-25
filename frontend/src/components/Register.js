import React, { useState } from 'react';
import axios from '../config/axios'; // Import Axios instance
import { useNavigate } from 'react-router-dom';
import './Forms.css'; // Import your CSS file for styling

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/register', formData)
      .then(response => {
        console.log('Registration successful:', response.data);
        setMessage('Registration successful! Redirecting to GameList...');
        setTimeout(() => {
          navigate('/gamelist');
        }, 2000);
      })
      .catch(error => {
        console.error('Registration error:', error);
        setMessage('Registration error. Please try again.');
      });
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            className="input-field"
            type="text"
            name="username"
            id="username"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className="input-field"
            type="email"
            name="email"
            id="email"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="input-field"
            type="password"
            name="password"
            id="password"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
