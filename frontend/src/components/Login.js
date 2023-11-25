import React, { useState } from 'react';
import axios from '../config/axios'; // Import Axios instance
import { useNavigate } from 'react-router-dom';
import './Forms.css'; // Import your CSS file for styling

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  
  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Login logic - Sending username and password to the backend for login
    axios.post('/api/login', formData)
      .then(response => {
        // Handle successful login
        console.log('Login successful:', response.data);
        setMessage('Login successful! Redirecting to the list of games...');
        // Redirect to GameList after a successful login
        setTimeout(() => {
          navigate('/');
        }, 2000);
      })
      .catch(error => {
        // Handle login errors
        console.error('Login error:', error);
        setMessage('Login error. Please try again.');
      });
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input className="input-field" type="text" id="username" name="username" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input className="input-field" type="password" id="password" name="password" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
