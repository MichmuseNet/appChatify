// src/components/MyForm.jsx
import { useState } from 'react';
import { socket } from '../socket';

function MyForm() {
  const [value, setValue] = useState('');

  const onSubmit = (e) => {
    e.preventDefault(); // IMPORTANTE: evita que la página se recargue
    if (value.trim()) {
      socket.emit('chat message', value);
      setValue('');
    }
  };

  return (
    /* REVISA ESTA CLASE: debe ser my-form */
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