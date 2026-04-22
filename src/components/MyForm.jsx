import { useState } from 'react';
import { socket } from '../socket';

function MyForm() {
  const [value, setValue] = useState('');

  const onSubmit = (e) => {
    e.preventDefault(); // Detiene el refresco de página
    
    if (value.trim()) { // .trim() evita enviar solo espacios
      console.log('📤 Enviando mensaje:', value);
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