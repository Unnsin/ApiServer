var mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    "general":{
        "firstName":String,
        "lastName":String,
        "avatar":String
    },
    "job":{
        "company":String,
        "title":String
    },
    "contact":{
        "email":String,
        "phone":String
    },
    "address":{
        "street":String,
        "city":String,
        "zipCode":String,
        "country":String
    }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;

