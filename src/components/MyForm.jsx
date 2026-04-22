import { useState } from 'react';
import { socket } from '../socket';

function MyForm() {
  const [value, setValue] = useState('');

  const onSubmit = (e) => {
    e.preventDefault(); // Evita que la página se refresque
    
    if (value.trim()) {
      console.log('Intentando enviar:', value); // Esto aparecerá en tu consola (F12)
      socket.emit('chat message', value);
      setValue('');
    }
  };

  return (
    <form onSubmit={onSubmit} className="my-form">
      <input 
        value={value} 
        onChange={e => setValue(e.target.value)} 
        placeholder="Escribe un mensaje..."
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default MyForm;