import React, { useState } from 'react';

const Chat = ({ sendMessage }) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents new line in the input field
      handleSendMessage();
    }
  };

  return (
    <div>
      {/* Chat Display */}
      {/* Render the messages here */}

      {/* Chat Input */}
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        style={{ marginRight: '10px' }}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
