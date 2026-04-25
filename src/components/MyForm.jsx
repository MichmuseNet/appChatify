import { useState } from 'react';
import { socket } from '../socket';

function MyForm({ currentRoom, username }) {
  const [value, setValue] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (value.trim()) {
      const messageData = {
        content: value,
        username: username || 'Anónimo',
        room: currentRoom
      };

      console.log('Enviando:', messageData);
      socket.emit('chat message', messageData);
      setValue('');
    }
  };

  return (
    <form onSubmit={onSubmit} className="footer-form"> 
      <input 
        className="message-input" 
        value={value} 
        onChange={e => setValue(e.target.value)} 
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