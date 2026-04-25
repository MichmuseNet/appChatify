import { useState, useEffect } from 'react';
import './App.css';
import { socket } from './socket';
import ManageConnection from './components/ManageConnection';
import MyForm from './components/MyForm';
import Channels from './components/Channels';
import Chats from './components/Chats';

function App() {
  const [currentRoom, setCurrentRoom] = useState('General');
  const [username] = useState('Usuario-' + Math.floor(Math.random() * 100));

  useEffect(() => {
    const joinCurrentRoom = () => {
      console.log('Entrando a room:', currentRoom);
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

  return (
    <div className="app-container">
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
          <Chats currentRoom={currentRoom} />
        </section>

        <footer className="footer-form">
          <MyForm currentRoom={currentRoom} username={username} />
        </footer>
      </main>
    </div>
  );
}

export default App;