var io = require('socket.io')();
import dotenv from 'dotenv';
dotenv.config();
var ofLine = require('../db/db.metod').ofLine;
var onLine = require('../db/db.metod').onLine;
io.listen(process.env.SOCKET_PORT);
console.log('Socket.io listening on port ', process.env.SOCKET_PORT);

setInterval(()=>{io.emit('getOnline')},5000);

io.on('connection', (client) => {
    client.emit('giveMeToken');
    client.on('message', (token) => {
        client.token = token;
        onLine(client.token);
    })
    console.log('connaction for sokects')
    client.on('edit', (user)=>{
        client.broadcast.emit('edit', user);
    })
    client.on('delete', (id)=> {
        client.broadcast.emit('delete', id);
    });
    client.on('create', (user) => {
        client.broadcast.emit('create', user);
    });
    client.on('disconnect', (token) => {
        console.log('disconnect');
        ofLine(client.token);
    })
});



module.exports = io;