import { io } from 'socket.io-client';

// Asegúrate de que esta URL sea la de tu servicio en Railway
const URL = 'https://serverchatify-production-f701.up.railway.app';

export const socket = io(URL, {
  transports: ['websocket']
});