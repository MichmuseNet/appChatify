import { io } from 'socket.io-client';
import { io } from 'socket.io-client';

// Tu URL de Railway (asegúrate de que no tenga una "/" al final)
const URL = 'https://serverchatify-production-f701.up.railway.app';

export const socket = io(URL, {
  // 1. Esto es lo más importante: evita el error "Cannot set properties of undefined"
  auth: {
    serverOffset: 0,
    ackTimeout: 10000,
    retries: 3,
  },
  
  // 2. Permitimos que use tanto WebSocket como Polling (como el de tu amiga)
  // Quitar el transport: ['websocket'] fijo ayuda a que conecte más fácil
  autoConnect: true 
});