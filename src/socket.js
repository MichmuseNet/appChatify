import { io } from 'socket.io-client';

const URL = 'https://serverchatify-production-f701.up.railway.app';

export const socket = io(URL, {
  autoConnect: true,
  transports: ['websocket', 'polling'],
  timeout: 10000
});

socket.on('connect', () => {
  console.log('Socket conectado:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('Socket desconectado:', reason);
});

socket.on('connect_error', (err) => {
  console.error('rror de conexión socket:', err.message);
});