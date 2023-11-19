import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../config/axios'; // Assuming axios.js holds the Axios instance with baseURL set to http://localhost:5000
import Chat from './Chat'; // Import the Chat component

const Lobby = () => {
  const { gameId } = useParams();
  const [gameName, setGameName] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch the game name based on the game ID
    axios.get(`/api/game/${gameId}`)
      .then(response => {
        setGameName(response.data.gameName);
      })
      .catch(error => {
        console.error('Error fetching game name:', error);
      });
  }, [gameId]);

  const handleReceiveMessage = (message) => {
    const newMessage = { text: message, sender: 'You' };
    setMessages([...messages, newMessage]);
  };

  return (
    <div>
      <h2>Lobby</h2>
      <div>
        <h3>Game ID: {gameId}</h3>
        <h3>Game Name: {gameName}</h3>
        {/* Chat Component */}
        <Chat sendMessage={handleReceiveMessage} />
        {/* Chat Display */}
        <div style={{ border: '1px solid #ccc', minHeight: '200px', padding: '10px', marginBottom: '10px' }}>
          {messages.map((message, index) => (
            <div key={index}>
              <strong>{message.sender}: </strong>
              {message.text}
            </div>
          ))}
        </div>
      </div>
      <Link to="/">Go Back to Main Page</Link>
    </div>
  );
};

export default Lobby;
