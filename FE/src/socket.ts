import { io } from 'socket.io-client';

export const socket = io(import.meta.env.VITE_SOCKET_DOMAIN, {
  autoConnect: true,
  reconnection: true,
  transports: ['websocket'],
});