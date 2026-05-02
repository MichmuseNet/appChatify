import { io } from 'socket.io-client';


const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const socket = io(URL, {
  autoConnect: true,
  transports: ['websocket', 'polling'],
  timeout: 10000,
  reconnectionAttempts: 5
});

socket.on('connect', () => {
  console.log(' Socket conectado:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log(' Socket desconectado:', reason);
});

socket.on('connect_error', (err) => {
  console.error(' Error de conexión:', err.message);
});