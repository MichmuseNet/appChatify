import { useState, useEffect } from 'react';
import { socket } from '../socket';

function Chats() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Escuchamos el mensaje que viene del servidor
    const handleChatMessage = (msg, id) => {
      setMessages((prev) => [...prev, { content: msg, id: id }]);
    };

    socket.on('chat message', handleChatMessage);

    // Limpiamos el evento al desmontar el componente
    return () => {
      socket.off('chat message', handleChatMessage);
    };
  }, []);

  return (
    <ul>
      {messages.map((m) => (
        <li key={m.id}>{m.content}</li>
      ))}
    </ul>
  );
}