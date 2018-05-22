var  express =require( 'express');
var router = express.Router();
var mongoose = require('mongoose');
const Client = require('../db/model/Clients');
var DBMethod = require('../db/db.metod');


var GetClients = DBMethod.GetClients;
var GetClient = DBMethod.GetClient;
var EditClient = DBMethod.EditClient;
var DeleteClient = DBMethod.DeletClient;
var CreateClient = DBMethod.CreateClient;
var FilterClient = DBMethod.FilterClient;
var CreateUser = DBMethod.CreateUser;

router.use(express.json());

router.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    next();
});

router.get('/users', (req, res) => {
    GetClients()
        .then(respons => { res.json(respons) });    
});

router.post('/signin', (req, res) => {
    console.log(req.body)
    res.send();
});

router.post('/signup', (req, res) => {
    console.log(req.body);
    CreateUser(req.body)
        .then(respons => { res.json(respons); });
});

router.get('/user/:id', (req, res) => {
    GetClient(req.params.id)
        .then(respons => { res.json(respons) });
});

router.get('/search/:id', (req, res) => {
    FilterClient(req.params.id)
        .then(respons => { res.json(respons) });
});

router.post('/edit/:id', (req, res) => {
    EditClient(req.params.id, req.body)
        .then(respons => {res.json(respons)});
});

router.post('/create', (req, res) => {
    CreateClient(req.body)
        .then(respons => { res.json(respons) });
});


router.get('/delete/:id', (req, res) => {
    DeleteClient(req.params.id)
        .then(respons => { res.send() });
});

module.exports = router;