import { useState } from 'react';
import { socket } from '../socket';

function MyForm({ currentRoom, username }) {
  const [value, setValue] = useState('');
//trying to merge
  const handleInputChange = (e) => {
    const text = e.target.value;
    setValue(text);

    socket.emit('typing', { 
      username: username || 'Anónimo', 
      room: currentRoom,
      senderId: socket.id 
    });

    if (window.typingTimeout) {
      clearTimeout(window.typingTimeout);
    }

    window.typingTimeout = setTimeout(() => {
      socket.emit('stop_typing', { 
        room: currentRoom,
        senderId: socket.id 
      });
    }, 3000);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!socket.connected) return;

    if (value.trim()) {
      const messageData = {
        content: value.trim(),
        username: username || 'Anónimo',
        room: currentRoom
      };

      socket.emit('chat message', messageData);
      setValue('');

      
      socket.emit('stop_typing', { 
        room: currentRoom,
        senderId: socket.id 
      });
      
      if (window.typingTimeout) {
        clearTimeout(window.typingTimeout);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="footer-form">
      <input
        name="message"  
        id="message-input"
        className="message-input"
        value={value}
        onChange={handleInputChange} 
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