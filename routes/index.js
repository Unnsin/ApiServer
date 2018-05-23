var  express =require( 'express');
var bcrypt = require('bcrypt');
var ExpressJwt = require('express-jwt');
var JWT = require('jsonwebtoken');
var mongoose = require('mongoose');
const Client = require('../db/model/Clients');
var DBMethod = require('../db/db.metod');

var router = express.Router();

const saltRounds = 10;

var Authorization = DBMethod.Authorization;
var GetClients = DBMethod.GetClients;
var GetClient = DBMethod.GetClient;
var EditClient = DBMethod.EditClient;
var DeleteClient = DBMethod.DeletClient;
var CreateClient = DBMethod.CreateClient;
var FilterClient = DBMethod.FilterClient;
var CreateUser = DBMethod.CreateUser;

const publicKey = 'secret';

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

router.use(ExpressJwt({ secret: publicKey}).unless({path: ['/users', /\/user\/.*/, /\/search\/.*/, '/signin', '/signup']}));

router.post('/signin', (req, res) => {
    Authorization(req.body.email)
       .then(function(respons){
           bcrypt.compare(req.body.password, respons.password).then(function(resp) {
                resp ? res.status(200).json(respons): res.status(401).send();
           });
       });
});

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
        req.body.password = hash;
        req.body.role = 1;
        JWT.sign({role:req.body.role, email: req.body.email}, publickKey, (err,token) => {
            req.body.token = token;
            CreateUser(req.body)
                .then(respons => { res.json(respons); });
        });
    });
});

router.get('/user/:id', (req, res) => {
    GetClient(req.params.id)
        .then(respons => { res.json(respons) });
});

router.get('/search/:id', (req, res) => {
    console.log(req.params.id);
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
    if(req.user.role === 2){
        DeleteClient(req.params.id)
            .then(respons => { res.status(200).send() });
    }else{
        res.status(403).send();
    }
});

module.exports = router;