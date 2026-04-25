import { useState, useEffect } from 'react';
import { socket } from '../socket';

function Chats({ currentRoom }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([]);

    const handleLoadMessages = (history) => {
      setMessages(history);
    };

    const handleChatMessage = (msgData) => {

      if (msgData.room === currentRoom) {
        setMessages((prev) => [...prev, msgData]);
      }
    };

    socket.on('load messages', handleLoadMessages);
    socket.on('chat message', handleChatMessage);

    return () => {
      socket.off('load messages', handleLoadMessages);
      socket.off('chat message', handleChatMessage);
    };
  }, [currentRoom]); 

  return (
    <div className="messages-area">
      {messages.length === 0 && <p>No hay mensajes en #{currentRoom} aún...</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {messages.map((m) => (
          <li key={m.id} style={{ 
            background: '#4e5058', 
            color: 'white',
            margin: '8px 0', 
            padding: '10px', 
            borderRadius: '8px' 
          }}>
            <small style={{ color: '#b5bac1', display: 'block' }}>{m.username}</small>
            {m.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Chats;