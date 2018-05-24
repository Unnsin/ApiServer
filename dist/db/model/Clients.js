"use strict";

var mongoose = require('mongoose');

var clientSchema = mongoose.Schema({
    "general": {
        "firstName": String,
        "lastName": String,
        "avatar": String
    },
    "job": {
        "company": String,
        "title": String
    },
    "contact": {
        "email": String,
        "phone": String
    },
    "address": {
        "street": String,
        "city": String,
        "zipCode": String,
        "country": String
    }
});

var Client = mongoose.model('Client', clientSchema);

module.exports = Client;