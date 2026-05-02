import { io } from 'socket.io-client';

// Usamos la variable de entorno de Vite, y si no existe (producción), la de Railway
const URL = import.meta.env.VITE_BACKEND_URL || 'https://serverchatify-production-f701.up.railway.app';

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