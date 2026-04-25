import { useState, useEffect } from 'react';
import { socket } from '../socket';

function Chats({ currentRoom }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([]);

    const handleLoadMessages = (history) => {
      console.log('Historial cargado:', history);
      setMessages(history);
    };

    // 3. Escuchar nuevos mensajes
    const handleChatMessage = (msgData) => {
      console.log('Nuevo mensaje recibido:', msgData);

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
      {messages.length === 0 && (
        <p style={{ color: '#8e9297', textAlign: 'center' }}>
          No hay mensajes en #{currentRoom} aún...
        </p>
      )}
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {messages.map((m, index) => (
          <li key={m.id || index} style={{ 
            background: '#4e5058', 
            color: 'white',
            margin: '8px 0', 
            padding: '10px', 
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <span style={{ 
              fontSize: '0.75rem', 
              color: '#00aff4', 
              fontWeight: 'bold',
              marginBottom: '4px' 
            }}>
              {m.username || 'Anónimo'}
            </span>
            
            <span>{m.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Chats;