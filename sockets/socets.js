var io = require('socket.io')();

const ioport = 8080;

io.listen(ioport);
console.log('Socket.io listening on port ', ioport);

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