import { useState, useEffect } from 'react';
import { socket } from '../socket';

function Chats() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleChatMessage = (msg, id) => {
      console.log('✅ Mensaje recibido:', msg);
      
      // Actualizamos el offset para que sea igual al de tu amiga (Estabilidad)
      if (socket.auth) {
        socket.auth.serverOffset = id;
      }

      setMessages((prev) => {
        // Si el mensaje ya llegó (por ID), no lo repetimos
        if (id && prev.find(m => m.id === id)) return prev;
        
        // Guardamos un objeto consistente
        return [...prev, { content: msg, id: id || Date.now() }];
      });
    };

    socket.on('chat message', handleChatMessage);

    return () => {
      socket.off('chat message', handleChatMessage);
    };
  }, []);

  return (
    <div className="messages-area"> {/* Asegúrate de que tenga la S como en el CSS */}
      {messages.length === 0 && <p>No hay mensajes aún...</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {messages.map((m, index) => (
          <li key={m.id || index} style={{ 
            background: '#4e5058', // Color tipo Discord
            color: 'white',
            margin: '8px 0', 
            padding: '10px', 
            borderRadius: '8px' 
          }}>
            {typeof m === 'string' ? m : m.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Chats;