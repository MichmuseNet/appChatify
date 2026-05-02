import { useState, useEffect } from 'react';
import './App.css';
import { socket } from './socket';
import ManageConnection from './components/ManageConnection';
import MyForm from './components/MyForm';
import Channels from './components/Channels';
import Chats from './components/Chats';
import Users from './components/Users';

function App() {
  const [currentRoom, setCurrentRoom] = useState('General');
  const [username, setUsername] = useState(localStorage.getItem('chatify_user') || '');
  const [showModal, setShowModal] = useState(!localStorage.getItem('chatify_user'));

  useEffect(() => {
    if (!username) return;

    const joinCurrentRoom = () => {
      socket.emit('join room', {
        username,
        room: currentRoom
      });
    };

    if (socket.connected) {
      joinCurrentRoom();
    }

    socket.on('connect', joinCurrentRoom);

    return () => {
      socket.emit('leave room', {
        room: currentRoom
      });
      socket.off('connect', joinCurrentRoom);
    };
  }, [currentRoom, username]);

  const handleSaveUsername = (e) => {
    e.preventDefault();
    const inputName = e.target.username.value.trim();
    if (inputName) {
      setUsername(inputName);
      localStorage.setItem('chatify_user', inputName);
      setShowModal(false);
    }
  };

  return (
    <div className="app-container">
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center',
          alignItems: 'center', zIndex: 9999
        }}>
          <form onSubmit={handleSaveUsername} style={{
            background: '#36393f', padding: '30px', borderRadius: '8px', 
            display: 'flex', flexDirection: 'column', gap: '15px', width: '300px'
          }}>
            <h2 style={{ color: 'white', textAlign: 'center', fontSize: '1.2rem' }}>Tu Nombre</h2>
            <input 
              name="username"
              type="text" 
              autoFocus
              placeholder="Escribe tu nombre..."
              style={{ padding: '12px', borderRadius: '4px', border: 'none', outline: 'none' }}
            />
            <button type="submit" style={{
              padding: '10px', background: '#5865f2', color: 'white', 
              border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer'
            }}>
              Entrar
            </button>
          </form>
        </div>
      )}

      <aside className="sidebar channels-sidebar">
        <h2>Channels</h2>
        <Channels currentRoom={currentRoom} setRoom={setCurrentRoom} />
      </aside>

      <main className="chat-main">
        <header className="chat-header">
          <h1>Chatify - #{currentRoom}</h1>
          <ManageConnection />
        </header>

        <section className="messages-area">
          <Chats currentRoom={currentRoom} currentUsername={username} />
        </section>

        <footer className="footer-form">
          <MyForm currentRoom={currentRoom} username={username} />
        </footer>
      </main>

      <Users currentRoom={currentRoom} />
    </div>
  );
}

export default App;