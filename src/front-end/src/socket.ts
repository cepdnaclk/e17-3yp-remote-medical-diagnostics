import { io } from 'socket.io-client';

export const socket = io("http://localhost:8080"); //host must be specified if the backend is at a different address