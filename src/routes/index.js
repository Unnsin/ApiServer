import express from  'express';
import bcrypt from 'bcrypt';
import ExpressJwt from 'express-jwt';
import JWT from 'jsonwebtoken';
import mongoose from 'mongoose';
import Client from '../db/model/Clients';
import DBMethod from '../db/db.metod';
import io from '../sockets/socets';
import gravatar from 'gravatar';


var editClient= require('../sockets/sockets.method').editClient;
var deleteClient = require('../sockets/sockets.method').deleteClient;
var createClient = require('../sockets/sockets.method').createClient;

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
var GetUser = DBMethod.GetUser;
var getOnlineUsers = DBMethod.getOnlineUsers;

router.use(express.json());

router.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    let now = new Date();
    let houre = now.getHours();
    let minuts = now.getMinutes();
    let second = now.getSeconds();
    console.log(`Время: ${houre}:${minuts}:${second} Метод:${req.method} Адрес: ${req.path}`)
    next();
});
router.get('/users', (req, res) => {
    GetClients()
        .then(respons => { res.json(respons) });    
});

router.use(ExpressJwt({ secret: process.env.SECRET_KEY}).unless({path: ['/users', /\/user\/.*/, /\/search\/.*/, '/signin', '/signup', '/clients']}));


router.get('/clients', (req, res)=>{
    getOnlineUsers()
        .then(respons => {res.json(respons)});
});

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
        req.body.avatar = gravatar.url(req.body.Email, {protocol: 'http', s: '100'});
        req.body.password = hash;
        req.body.online = false;
        req.body.role = 1;
        JWT.sign({role:req.body.role, email: req.body.email},  process.env.SECRET_KEY, (err,token) => {
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
    FilterClient(req.params.id)
        .then(respons => { res.json(respons) });
});

router.post('/edit/:id', (req, res) => {
    EditClient(req.params.id, req.body)
        .then(respons => {editClient(respons); return respons;})
        .then(respons => {res.json(respons)});
});

router.post('/create', (req, res) => {
    CreateClient(req.body)
        .then(respons => { createClient(respons); return respons;})
        .then(respons => { res.json(respons) });
});


router.get('/delete/:id', (req, res) => {
    if(req.user.role === 2){
        DeleteClient(req.params.id)
            .then(respons => { deleteClient(req.params.id); return respons;})
            .then(respons => { res.status(200).send() });
    }else{
        res.status(403).send();
    }
});

module.exports = router;