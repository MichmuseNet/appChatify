import { useState, useEffect } from 'react';
import { socket } from '../socket';

function Chats() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Escuchamos el mensaje. Cuando llega, actualizamos el estado de React.
    const handleChatMessage = (msg, id) => {
      console.log('✅ Mensaje recibido:', msg);
      setMessages((prev) => {
        // Evitamos duplicados por ID si el historial y el real-time se cruzan
        if (prev.find(m => m.id === id)) return prev;
        return [...prev, { content: msg, id: id }];
      });
    };

    socket.on('chat message', handleChatMessage);

    return () => {
      socket.off('chat message', handleChatMessage);
    };
  }, []);

  return (
    <div className="chats-container" style={{ padding: '10px' }}>
      {messages.length === 0 && <p>No hay mensajes aún...</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {messages.map((m) => (
          <li key={m.id} style={{ 
            background: '#f0f0f0', 
            margin: '5px 0', 
            padding: '8px', 
            borderRadius: '5px' 
          }}>
            {m.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Chats;