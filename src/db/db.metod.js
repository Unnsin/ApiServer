const Client = require('../db/model/Clients');
const User = require('../db/model/Users');
var mongoose = require('mongoose');
var passwordHash = require('password-hash');

function CreateUser(body){
    const user = new User(body);
    return user.save();
}

function authorization(email){
    User.findOneAndUpdate({"Email" : email}, {  $set: {"online":true} }, () => {
        
    });
    return User.findOne({"Email" : email});    
}

function ofLine(token){
    User.findOneAndUpdate({"token" : token}, {  $set: {"online":false} }, (user)=>{
    });
}

function onLine(token){
    User.findOneAndUpdate({"token" : token}, {  $set: {"online":true} }, (user)=>{
    });
}

function getOnlineUsers() {
    return User.find({ "online":true });
}

function GetClients(){
    return Client.find({});
};

function GetClient(id){
    return Client.findById(id);
}

function FilterClient(id){
    var regExp =  new RegExp('(^|.*)'+id+'.*','i');
    return Client.find({$or:[{'general.firstName':regExp}, {'general.lastName':regExp}]});
}

function EditClient(id, body){
    return Client.findByIdAndUpdate(id,body, {new:true});
}

function DeletClient(id){
    return Client.remove({_id:id});
}

function CreateClient(body){
    const client = new Client(body);
    return client.save();
}

module.exports = {
    GetClients:GetClients,
    GetClient:GetClient,
    EditClient:EditClient,
    DeletClient:DeletClient,
    CreateClient:CreateClient,
    FilterClient:FilterClient,
    CreateUser: CreateUser,
    Authorization:authorization,
    getOnlineUsers:getOnlineUsers,
    ofLine:ofLine,
    onLine:onLine
};
