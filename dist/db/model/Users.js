"use strict";

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    "Name": String,
    "Email": String,
    "password": String,
    "role": Number,
    "token": String,
    "avatar": String,
    "online": Boolean
});

var User = mongoose.model('Users', userSchema);

module.exports = User;