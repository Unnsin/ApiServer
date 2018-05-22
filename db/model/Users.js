var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    "Name":String,
    "Email":String,
    "password":String,
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
