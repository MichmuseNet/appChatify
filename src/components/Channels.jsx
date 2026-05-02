function Channels({ currentRoom, setRoom }) {
  const rooms = [
    { id: 'general', name: 'General' },
    { id: 'tech-talk', name: 'Tech Talk' },
    { id: 'random', name: 'Random' },
    { id: 'gaming', name: 'Gaming' }
  ];
//trying to merge 
  return (
    <div className="channels-container">
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}
      >
        {rooms.map((room) => (
          <li
            key={room.id}
            onClick={() => setRoom(room.name)}
            className={currentRoom === room.name ? 'channel-active' : ''}
            style={{
              padding: '12px 16px',
              margin: '4px 8px',
              cursor: 'pointer',
              borderRadius: '4px',
              transition: 'all 0.2s ease',
              backgroundColor: currentRoom === room.name ? '#404249' : 'transparent',
              color: currentRoom === room.name ? '#ffffff' : '#96989d',
              fontWeight: currentRoom === room.name ? '600' : '400',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <span
              style={{
                marginRight: '8px',
                fontSize: '20px',
                color: currentRoom === room.name ? '#ffffff' : '#6a6d71'
              }}
            >
              #
            </span>

            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Channels;