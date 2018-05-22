var mongoose = require('mongoose');
const Client = require('./model/Clients');

mongoose.connect('mongodb://localhost/Clients');

const db = mongoose.connection;

db.on('error', err => {
    console.log('error', err)
})


db.once('open', () => {
    console.log('we are connected')
})


module.exports = db;
