import { io } from 'socket.io-client';

// La URL debe ser la de tu proyecto en Railway
const URL = 'https://serverchatify-production-f701.up.railway.app'; 

export const socket = io(URL, {
  transports: ['websocket'] // <-- ESTA ES LA PIEZA QUE FALTA
});