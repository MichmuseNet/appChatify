import { io } from 'socket.io-client';

const URL = 'https://serverchatify-production-f701.up.railway.app';

export const socket = io(URL, {
  // 1. Esto evita el error de "serverOffset"
  auth: {
    serverOffset: 0
  },
  // 2. Esto soluciona los problemas de conexión en Railway
  transports: ['websocket']
});