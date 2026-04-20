import { socket } from "../../socket";
import React, { useState } from "react";

const MyForm = () => {
    const [message,setMessage] = useState('');
    
    const handleOnChange = (e) => {
        setMessage(e.target.value);
    };

        const handleClick = (e) => {
            e.preventDefault()
            socket.emit('chat message', message)
        }
    
    return (
        <div>
            <input 
                name="message"
                type="text" 
                value={message} 
                onChange={handleOnChange} 
                placeholder="Escribe un mensaje..." 
            />
            <button onClick={handleClick}>Enviar</button> 
        </div>
    )
}

export default MyForm