import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Chat from './Chat'; // Import the Chat component

const Lobby = () => {
  const { gameId } = useParams();
  const location = useLocation();
  const gameName = location.state && location.state.gameName;

  const [messages, setMessages] = useState([]);

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
