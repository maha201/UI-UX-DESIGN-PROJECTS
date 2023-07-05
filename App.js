import React, { useState } from 'react';
import './App.css';

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleMessageSend = () => {
    if (inputText.trim() === '') {
      return;
    }

    const randomIndex = Math.floor(Math.random() * user_list.length);
    const randomUser = user_list[randomIndex];

    const newMessage = {
      id: Date.now(),
      user: randomUser,
      text: inputText,
      likes: 0,
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');
  };

  const handleLikeClick = (id) => {
    setMessages(prevMessages =>
      prevMessages.map(message =>
        message.id === id ? { ...message, likes: message.likes + 1 } : message
      )
    );
  };

  return (
    <div className="chat-app">
      <div className="chat-window">
        {messages.map(message => (
          <div key={message.id} className="message">
            <div className="avatar">
              {message.user.charAt(0)}
            </div>
            <div className="message-content">
              <div className="message-header">
                <span className="username">{message.user}</span>
                <span className="timestamp">{new Date(message.id).toLocaleTimeString()}</span>
              </div>
              <div className="message-text">{message.text}</div>
              <button className="like-button" onClick={() => handleLikeClick(message.id)}>
                <span role="img" aria-label="Like">👍</span> {message.likes}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
        <button className="send-button" onClick={handleMessageSend}>Send</button>
      </div>
    </div>
  );
}

export default App;
