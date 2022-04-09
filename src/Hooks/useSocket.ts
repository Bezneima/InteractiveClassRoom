import {io} from "socket.io-client";

export const useSocket = (setIsConnected: (isConnected:boolean) => void) => {

    return io('http://localhost:3001').on('connect', () => {
        setIsConnected(true);
    });

}