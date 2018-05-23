var  express =require( 'express');
var mongoose = require('mongoose');
var app = express();
var router = require('./routes/index');
var db = require('./db/index');

app.use('', router);

const port = 4200;


app.listen(port, () => {
    console.log('Api Server listening on port ', port);
});