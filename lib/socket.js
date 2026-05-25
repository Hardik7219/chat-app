import { io } from "socket.io-client";

let socket;

function getSocketUrl() {
    if (process.env.NEXT_PUBLIC_SOCKET_URL) {
        return process.env.NEXT_PUBLIC_SOCKET_URL;
    }
    if (typeof window !== "undefined") {
        return window.location.origin;
    }
    return "http://localhost:3000";
}

export function getSocket() {
    if (!socket) {
        socket = io(getSocketUrl(), {
            transports: ["websocket", "polling"],
            autoConnect: true,
        });
    }
    return socket;
}

export default getSocket();
