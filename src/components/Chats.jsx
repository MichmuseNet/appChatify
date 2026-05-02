import { useState, useEffect } from 'react';
import { socket } from '../socket';

function Chats({ currentRoom, currentUsername }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([]);

    const handleLoadMessages = (history) => {
      console.log('Historial cargado:', history);
      setMessages(history);
    };

    const handleChatMessage = (msgData) => {
      console.log('Nuevo mensaje recibido:', msgData);
      if (msgData.room === currentRoom) {
        setMessages((prev) => [...prev, msgData]);
      }
    };

    socket.on('load messages', handleLoadMessages);
    socket.on('chat message', handleChatMessage);

    return () => {
      socket.off('load messages', handleLoadMessages);
      socket.off('chat message', handleChatMessage);
    };
  }, [currentRoom]);

  return (
    <div className="messages-area">
      {messages.length === 0 && (
        <p style={{ color: '#8e9297', textAlign: 'center' }}>
          No hay mensajes en #{currentRoom} aún...
        </p>
      )}

      <ul>
        {messages.map((m, index) => {
          const isMe = m.username === currentUsername;

          return (
            <li
              key={m.id || index}
              style={{
                background: isMe ? '#5865f2' : '#4e5058',
                color: 'white',
                margin: '4px 0',
                padding: '10px',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignSelf: isMe ? 'flex-end' : 'flex-start',
                maxWidth: '75%',
                wordBreak: 'break-word'
              }}
            >
              <span
                style={{
                  fontSize: '0.75rem',
                  color: isMe ? '#d1d5ff' : '#00aff4',
                  fontWeight: 'bold',
                  marginBottom: '2px'
                }}
              >
                {isMe ? 'Tú' : (m.username || 'Anónimo')}
              </span>

              <span>{m.content}</span>

              {m.created_at && (
                <small
                  style={{
                    color: isMe ? '#e0e0e0' : '#b9bbbe',
                    marginTop: '4px',
                    fontSize: '0.65rem',
                    textAlign: 'right'
                  }}
                >
                  {new Date(m.created_at).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </small>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Chats;
/*
por nomas
*/