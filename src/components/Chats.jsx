import { useState, useEffect } from 'react';
import { socket } from '../socket';

function Chats() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Definimos la función que maneja el mensaje
    const handleChatMessage = (msg, serverOffset) => {
      console.log('Mensaje desde server:', msg);

      // 1. Actualizamos el offset para la recuperación de mensajes (evita el error)
      if (socket.auth) {
        socket.auth.serverOffset = serverOffset;
      }

      // 2. Añadimos el mensaje a la lista en pantalla
      setMessages((prev) => [...prev, { content: msg, id: serverOffset }]);
    };

    // Escuchamos el evento
    socket.on('chat message', handleChatMessage);

    return () => {
      // Limpiamos el evento al cerrar el componente
      socket.off('chat message', handleChatMessage);
    };
  }, []);

  return (
    <ul className="messages-list">
      {messages.map((m, index) => (
        // Usamos el id o el index como respaldo para la key de React
        <li key={m.id || index}>{m.content}</li>
      ))}
    </ul>
  );
}

export default Chats;