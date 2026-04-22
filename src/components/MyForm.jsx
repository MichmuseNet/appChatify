import { useState } from 'react';
import { socket } from '../socket';

function MyForm() {
  const [value, setValue] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (value) {
      // Enviamos el mensaje al servidor
      socket.emit('chat message', value);
      setValue('');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <button type="submit">Enviar</button>
    </form>
  );
}