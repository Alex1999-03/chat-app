import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

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
