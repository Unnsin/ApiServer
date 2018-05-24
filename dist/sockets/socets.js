'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var io = require('socket.io')();

_dotenv2.default.config();

io.listen(process.env.SOCKET_PORT);
console.log('Socket.io listening on port ', process.env.SOCKET_PORT);

io.on('connection', function (client) {
    console.log('connaction for sokects');
    client.on('edit', function (user) {
        client.broadcast.emit('edit', user);
    });
    client.on('delete', function (id) {
        client.broadcast.emit('delete', id);
    });
    client.on('create', function (user) {
        client.broadcast.emit('create', user);
    });
});

module.exports = io;