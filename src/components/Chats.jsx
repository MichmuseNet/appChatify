import { useState, useEffect } from 'react';
import { socket } from '../socket';

function Chats() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Escuchamos el evento de forma simple
    const handleChatMessage = (msg, serverOffset) => {
      console.log('Mensaje desde server:', msg);

      // Intentamos guardar el offset, pero si falla, no dejamos que rompa la app
      try {
        if (socket && socket.auth) {
          socket.auth.serverOffset = serverOffset;
        }
      } catch (err) {
        console.warn("No se pudo guardar el offset, pero el mensaje se mostrará.");
      }

      // Añadimos el mensaje al estado para que se vea en pantalla
      setMessages((prev) => [...prev, { content: msg, id: serverOffset }]);
    };

    socket.on('chat message', handleChatMessage);

    return () => {
      socket.off('chat message', handleChatMessage);
    };
  }, []);

  return (
    <ul className="messages-list">
      {messages.map((m, index) => (
        <li key={m.id || index}>{m.content}</li>
      ))}
    </ul>
  );
}

export default Chats;