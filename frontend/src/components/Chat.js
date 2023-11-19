import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = ({ gameId }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    const newSocket = io('http://localhost:5000'); // Replace with your Flask server address
    setSocket(newSocket);

    newSocket.emit('joinRoom', { room: `lobby_${gameId}` });

    return () => newSocket.close();
  }, [gameId]);

  useEffect(() => {
    if (!socket) return;

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => socket.off('message');
  }, [socket]);

  const sendMessage = () => {
    if (!socket || !messageText.trim()) return;

    socket.emit('chatMessage', { room: `lobby_${gameId}`, message: messageText });
    setMessageText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div>
      {/* Chat UI components */}
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
