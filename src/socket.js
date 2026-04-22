import { io } from 'socket.io-client';

const URL = 'https://serverchatify-production-f701.up.railway.app';

// Creamos la instancia con el objeto auth ya definido
export const socket = io(URL, {
  auth: {
    serverOffset: 0 // <--- Asegúrate de que esto NO falte
  },
  transports: ['websocket']
});