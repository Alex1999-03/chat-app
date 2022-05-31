const { Server } = require('socket.io')
const io = {};

function connectSocket(server) {
    io.socket = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
          }
    });
}

module.exports = {
    connectSocket,
    io
}