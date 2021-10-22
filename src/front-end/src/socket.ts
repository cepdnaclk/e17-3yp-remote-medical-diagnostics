import { io } from "socket.io-client";

const socketUri = process.env.REACT_APP_USE_MOCK_API as string;
export const socket = io(socketUri); //host must be specified if the backend is at a different address
