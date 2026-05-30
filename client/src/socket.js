import { io } from "socket.io-client";

export const socket = io(
    "https://kalakshepahub.onrender.com"
);