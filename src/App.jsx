import { useEffect } from 'react'
import './App.css'
import { socket } from '../socket';
import ManageConnection from './components/ManageConnection';
import MyForm from './components/MyForm';
import Channels from './components/Channels'
import Users from './components/Users'
import Chats from './components/Chats'


function App() {
  useEffect(() => {
    const onConnect = () => {
      console.log('Conectado');
    }
    socket.on('connect', onConnect);
    return () => {
      socket.off('disconnect')
      socket.off('connect', onConnect);
    }
  }, []);

  return (
    <div className='app-container'>
      <aside className='sidebar channels-sidebar'>
        <h2>Channels</h2>
        <Channels/>
      </aside>

      <main className='chat-main'>
        <header className='chat-header'>
          <h1>Chatify</h1>
          <ManageConnection/>
        </header>
        <section className='message-area'>
          <Chats/>
        </section>
        <footer className='footer-form'>
          <MyForm/>
        </footer>
      </main>

      <aside className='sidebar users-sidebar'>
        <h2>Users</h2>
        <Users/>
      </aside>
    </div>
  );
}

export default App;
