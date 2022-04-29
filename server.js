const express = require('express');
const socketIo = require('socket.io');

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const server = app.listen(3000, () => {
    console.log('server listen on port 3000');
});


const io = socketIo(server, {
    cors: {
        origin: "http://localhost:8887",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"]
    }
});

io.on('connection', (socket) => {
    console.log('client connected with id', socket.id);
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


setInterval(() => io.emit('time', new Date().toISOString()), 1000);
