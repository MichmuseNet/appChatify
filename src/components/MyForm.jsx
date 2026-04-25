import { useState } from 'react';
import { socket } from '../socket';

function MyForm({ currentRoom, username }) {
  const [value, setValue] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      // ENVIAR COMO OBJETO (Crucial para el servidor)
      socket.emit('chat message', {
        content: value,
        username: username || 'Anónimo',
        room: currentRoom
      });
      setValue('');
    }
  };

  return (
    <form onSubmit={onSubmit} className="footer-form">
      <input 
        value={value} 
        onChange={e => setValue(e.target.value)} 
        placeholder={`Enviar mensaje a #${currentRoom}`}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
export default MyForm;