var  express =require( 'express');
var router = express.Router();
var mongoose = require('mongoose');
const Client = require('../db/model/Clients');

mongoose.connect('mongodb://localhost/Clients');
const db = mongoose.connection;

router.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    next();
});

db.on('error', err => {
    console.log('error', err)
})


db.once('open', () => {
    console.log('we are connected')
})

router.get('/users',(req,res)=>{
    console.log('Get request for users');
    const client = Client.find({}, (err,data)=>{
        res.json(data);
    });
    
});

router.get('/user/:id', (req,res)=>{
    console.log(req.params.id);
    Client.findById(req.params.id, (err,client)=>{
        if(err) console.log(err);
        console.log(client);
        res.json(client);
    })
});

router.get('/search/:id', (req,res)=>{
    console.log('search request');
    var regExp =  new RegExp('(^|.*)'+req.params.id+'.*','i');
    Client.find({$or:[{'general.firstName':regExp}, {'general.lastName':regExp}]}, (err,clients)=>{
        if(err) console.log(err);
        console.log(clients);
        res.json(clients);
    });
});

router.post('/edit/:id', (req,res)=>{
    Client.findByIdAndUpdate(req.params.id, req.body,(err)=>{
        if(err) console.log(err);
        console.log(req.body);
        res.json(req.body);
    });
});

router.post('/create', (req,res)=>{
    console.log('Post Request');
    const client = new Client(req.body);
    client.save((err,res)=>{
        if(err){
            console.log(err);
        }
    });
    res.send('hello');
});


router.get('/delete/:id', (req,res)=>{
    Client.remove({_id:req.params.id},(err, doc)=>{
        res.send();
    })
});

module.exports = router;