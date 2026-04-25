import { useState, useEffect } from 'react';
import { socket } from '../socket';

function ManageConnection() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, []);

  const handleConnectClick = () => {
    socket.connect();
  };

  const handleDisconnectClick = () => {
    socket.disconnect();
  };

  return (
    <div>
      <button onClick={handleConnectClick} disabled={isConnected}>
        Connect
      </button>

      <button onClick={handleDisconnectClick} disabled={!isConnected}>
        Disconnect
      </button>
    </div>
  );
}

export default ManageConnection;