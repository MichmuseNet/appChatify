import { useState } from 'react';
import { socket } from '../socket';

function MyForm({ currentRoom, username }) {
  const [value, setValue] = useState('');

  const handleInputChange = (e) => {
    const text = e.target.value;
    setValue(text);

    socket.emit('typing', { 
      username: username || 'Anónimo', 
      room: currentRoom 
    });

    if (window.typingTimeout) clearTimeout(window.typingTimeout);

    window.typingTimeout = setTimeout(() => {
      socket.emit('stop_typing', { room: currentRoom });
    }, 3000);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      socket.emit('chat message', {
        content: value.trim(),
        username: username || 'Anónimo',
        room: currentRoom
      });
      setValue('');
      socket.emit('stop_typing', { room: currentRoom });
      if (window.typingTimeout) clearTimeout(window.typingTimeout);
    }
  };

  return (
    <form onSubmit={onSubmit} className="footer-form">
      <input
        className="message-input"
        value={value}
        onChange={handleInputChange} 
        placeholder={`Enviar mensaje a #${currentRoom}...`}
        autoComplete="off"
      />
      <button type="submit" className="send-button">Enviar</button>
    </form>
  );
}

export default MyForm;