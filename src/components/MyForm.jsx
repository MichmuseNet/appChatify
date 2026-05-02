import { useState } from 'react';
import { socket } from '../socket';

function MyForm({ currentRoom, username }) {
  const [value, setValue] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!socket.connected) {
      console.error('No se puede enviar: el socket no está conectado');
      return;
    }

    if (value.trim()) {
      const messageData = {
        content: value.trim(),
        username: username || 'Anónimo',
        room: currentRoom,
        created_at: new Date().toISOString()
      };

      console.log('Enviando mensaje:', messageData);

      socket.emit('chat message', messageData);

      setValue('');
    }
  };

  return (
    <form onSubmit={onSubmit} className="footer-form">
      <input
        className="message-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`Enviar mensaje a #${currentRoom}...`}
        autoComplete="off"
      />

      <button type="submit" className="send-button">
        Enviar
      </button>
    </form>
  );
}

export default MyForm;