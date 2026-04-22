import { useEffect } from 'react'
import './App.css'
import { socket } from './socket';
import ManageConnection from './components/ManageConnection';
import MyForm from './components/MyForm';
import Channels from './components/Channels'
import Users from './components/Users'
import Chats from './components/Chats'


function App() {
  useEffect(() => {
    const onConnect = () => {
      console.log('✅ Conectado al servidor');
    }
    
    const onDisconnect = () => {
      console.log('❌ Desconectado');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      // LIMPIEZA EXACTA: Esto evita que la conexión se vuelva loca
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
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
        <section className='messages-area'>
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
