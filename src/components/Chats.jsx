import { useState, useEffect } from 'react';
import { socket } from '../socket';

function Chats({ currentRoom }) {
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState(null);

  useEffect(() => {
    setMessages([]);
    setTypingUser(null); 

    const handleLoadMessages = (history) => setMessages(history);
    const handleChatMessage = (msgData) => {
      if (msgData.room === currentRoom) setMessages((prev) => [...prev, msgData]);
    };

    const handleUserTyping = (data) => {
      const savedNames = JSON.parse(localStorage.getItem('chatify_usernames') || '{}');
      const myName = savedNames[currentRoom];
      if (data.room === currentRoom && data.username !== myName) {
        setTypingUser(data.username);
      }
    };

    const handleUserStopTyping = (data) => {
      if (data.room === currentRoom) setTypingUser(null);
    };

    socket.on('load messages', handleLoadMessages);
    socket.on('chat message', handleChatMessage);
    socket.on('user_typing', handleUserTyping);
    socket.on('user_stop_typing', handleUserStopTyping);

    return () => {
      socket.off('load messages', handleLoadMessages);
      socket.off('chat message', handleChatMessage);
      socket.off('user_typing', handleUserTyping);
      socket.off('user_stop_typing', handleUserStopTyping);
    };
  }, [currentRoom]);

  return (
    <>
      <div className="messages-area">
        {messages.length === 0 && (
          <p style={{ color: '#8e9297', textAlign: 'center' }}>
            No hay mensajes en #{currentRoom} aún...
          </p>
        )}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {messages.map((m, index) => (
            <li key={m.id || index}>
              <span style={{ fontSize: '0.75rem', color: '#00aff4', fontWeight: 'bold', display: 'block' }}>
                {m.username || 'Anónimo'}
              </span>
              <span>{m.content}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="typing-container">
        {typingUser && (
          <p className="typing-text">{typingUser} está escribiendo...</p>
        )}
      </div>
    </>
  );
}

export default Chats;