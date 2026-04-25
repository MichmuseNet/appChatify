import { useEffect, useState } from 'react';
import { socket } from '../socket';

function Users({ currentRoom }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handleRoomUsers = (roomUsers) => {
      console.log('Usuarios en room:', roomUsers);
      setUsers(roomUsers);
    };

    socket.on('room users', handleRoomUsers);

    return () => {
      socket.off('room users', handleRoomUsers);
    };
  }, [currentRoom]);

  return (
    <aside className="users-sidebar">
      <h2>Users</h2>

      {users.length === 0 ? (
        <p className="empty-users">No users connected</p>
      ) : (
        <ul className="users-list">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              <span className="online-dot"></span>
              {user.username}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default Users;