var  express =require( 'express');
var mongoose = require('mongoose');
var app = express();
var router = require('./routes/index');
var db = require('./db/index');

app.use('', router);



app.listen(4200,function(){
    console.log("Server start work on 4200 port");
});