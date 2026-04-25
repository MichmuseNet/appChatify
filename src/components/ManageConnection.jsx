import { useEffect, useState } from 'react';
import { socket } from '../socket';

function ManageConnection() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const onConnect = () => {
      console.log('Conectado desde ManageConnection');
      setIsConnected(true);
    };

    const onDisconnect = () => {
      console.log('Desconectado desde ManageConnection');
      setIsConnected(false);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  const handleConnect = () => {
    if (!socket.connected) {
      socket.connect();
    }
  };

  const handleDisconnect = () => {
    if (socket.connected) {
      socket.disconnect();
    }
  };

  return (
    <div className="connection-buttons">
      <button
        className="connect-button"
        onClick={handleConnect}
        disabled={isConnected}
      >
        Connect
      </button>

      <button
        className="disconnect-button"
        onClick={handleDisconnect}
        disabled={!isConnected}
      >
        Disconnect
      </button>
    </div>
  );
}

export default ManageConnection;