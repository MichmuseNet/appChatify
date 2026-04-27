import { useState, useEffect } from 'react';
import './App.css';
import { socket } from './socket';
import ManageConnection from './components/ManageConnection';
import MyForm from './components/MyForm';
import Channels from './components/Channels';
import Chats from './components/Chats';
import Users from './components/Users';
import UsernamePrompt from './components/UsernamePrompt';

function App() {
  const [currentRoom, setCurrentRoom] = useState('General');
  const [username, setUsername] = useState('');
  const [showModal, setShowModal] = useState(false)

  const getUsernameForRoom=(room)=>{
    const savedNames = localStorage.getItem('chatify_usernames');
    const namesMap = savedNames ? JSON.parse(savedNames) : {};

    return namesMap[room]||null;
  };

  const saveUsernameForRoom = (room, newName) =>{
    const savedNames = localStorage.getItem('chatify_usernames');
    const namesMap = savedNames ? JSON.parse(savedNames) : {};

    namesMap[room] = newName;
    localStorage.setItem('chatify_usernames', JSON.stringify(namesMap))
  }

  useEffect(() => {
    const name= getUsernameForRoom (currentRoom)
    if (!name){
      setUsername('')
      setShowModal(true)
    } else {
      setUsername(name)
      setShowModal(false)
    }
  }, [currentRoom]);

  const handleSaveName= (newName) => {
    saveUsernameForRoom(currentRoom, newName);
    setUsername(newName);
    setShowModal(false)
  }

  useEffect(() => {
    if (!username) return;

    const joinCurrentRoom = () => {
      console.log('Entrando a room:', currentRoom, 'as: ', username);
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
          socket.emit('leave room', { room: currentRoom });
          socket.off('connect', joinCurrentRoom);
        };
  }, [currentRoom, username]);

  return (
    <div className="app-container">
      {showModal && (
        <UsernamePrompt room={currentRoom} onSave={handleSaveName}/>
      )}
      <aside className='sidebar channels-sidebar'>
        <h2>Channels</h2>
        <Channels currentRoom={currentRoom} setRoom={setCurrentRoom}/>
      </aside>
      <main className='chat-main'>
        <header className='chat-header'>
          <h1>Chatify-#{currentRoom}</h1>
          <ManageConnection/>
        </header>

      {username ? (
        <>
        <section className='messages-area'>
          <Chats currentRoom={currentRoom}/>
        </section>
        <footer className='footer-form'>
          <MyForm currentRoom={currentRoom} username={username}/>
        </footer>
        </>
        ) : ( 
          <div className='waiting-screen'>
            <p>Please set a username to start the chat</p>
          </div>
        )}
      </main>
      <Users currentRoom={currentRoom}/>
    </div>
  );
}

export default App;