var io = require('socket.io')();
import dotenv from 'dotenv';
dotenv.config();

io.listen(process.env.SOCKET_PORT);
console.log('Socket.io listening on port ', process.env.SOCKET_PORT);

io.on('connection', (client) => {
    console.log('connaction for sokects');
    client.on('edit', (user)=>{
        client.broadcast.emit('edit', user);
    })
    client.on('delete', (id)=> {
        client.broadcast.emit('delete', id);
    });
    client.on('create', (user) => {
        client.broadcast.emit('create', user);
    });
    
});

module.exports = io;