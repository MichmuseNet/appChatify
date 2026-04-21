import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

export const socket = io(URL, {
    auth: {
        serverOffset: 0,
        ackTimeout: 10000,
        retries: 3,
    }
});