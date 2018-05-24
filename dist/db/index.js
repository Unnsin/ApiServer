'use strict';

var mongoose = require('mongoose');
var Client = require('./model/Clients');

mongoose.connect(process.env.DB_HOST);

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('error', err);
});

db.once('open', function () {
    console.log('we are connected');
});

module.exports = db;