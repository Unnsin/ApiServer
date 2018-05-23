const io = require('../sockets/socets');


function editClient(data){
    io.emit('edit', data);
}
function deleteClient(id){
    io.emit('delete', id);
}
function createClient(user){
    io.emit('create', user);
}
module.exports = {
    editClient: editClient,
    deleteClient: deleteClient,
    createClient: createClient,
}