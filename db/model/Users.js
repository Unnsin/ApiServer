var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    "Name":String,
    "Email":String,
    "password":String,
    "role": Number,
    "token": String,
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
