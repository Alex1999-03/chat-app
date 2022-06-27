import { io } from "socket.io-client";

const Socket = (() => {
    let instance;

    const getInstance = () => {
        if(!instance) {
            instance = io("http://localhost:8080", { autoConnect: false });
        }
        return instance;
    }

    return {
        getInstance
    }
})()

export default Socket
