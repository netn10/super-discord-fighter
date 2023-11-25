import React, { useState } from 'react';
import axios from '../config/axios'; // Import Axios instance
import { useNavigate } from 'react-router-dom';

const RegisterLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
  });

  const [message, setMessage] = useState('');
  
  const usernames = new Set(); // Define the usernames variable here and initialize it as a new Set

  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Registration logic - Add the username to the set (simulated database)
    axios.post('/api/registerlogin', formData)
      .then(response => {
        // Handle successful registration
        console.log('Registration successful:', response.data);
        setMessage('Registration successful! Redirecting to the list of games...');
        // Redirect to GameList after a successful registration
        setTimeout(() => {
          navigate('/');
        }, 2000);
      })
      .catch(error => {
        // Handle registration errors
        console.error('Registration error:', error);
        setMessage('Registration error. Please try again.');
      });
  };

  return (
    <div>
      <h2>Register and Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterLogin;
