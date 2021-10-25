import { io, Socket } from "socket.io-client";

const socketUri = process.env.REACT_APP_USE_MOCK_API as string;
let socket: Socket | undefined;

/**
 * Lazy create a socket object
 * @returns Socket.io client object
 */
export function useSocket() {
  return socket || io(socketUri);
}
