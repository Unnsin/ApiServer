import  express from 'express';
import mongoose from 'mongoose';
var app = express();
mongoose.connect('mongodb://localhost:27017');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});

app.use(express.static('public'));

app.get('/users',(req,res)=>{
    res.send('Users');
});

app.get('/',(req,res)=>{
    res.send('hello world');
});

app.listen(4200,function(){
    console.log("Server start work on 4200 port");
});