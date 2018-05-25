'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Clients = require('../db/model/Clients');

var _Clients2 = _interopRequireDefault(_Clients);

var _db = require('../db/db.metod');

var _db2 = _interopRequireDefault(_db);

var _socets = require('../sockets/socets');

var _socets2 = _interopRequireDefault(_socets);

var _gravatar = require('gravatar');

var _gravatar2 = _interopRequireDefault(_gravatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var editClient = require('../sockets/sockets.method').editClient;
var deleteClient = require('../sockets/sockets.method').deleteClient;
var createClient = require('../sockets/sockets.method').createClient;

var router = _express2.default.Router();

var saltRounds = 10;

var Authorization = _db2.default.Authorization;
var GetClients = _db2.default.GetClients;
var GetClient = _db2.default.GetClient;
var EditClient = _db2.default.EditClient;
var DeleteClient = _db2.default.DeletClient;
var CreateClient = _db2.default.CreateClient;
var FilterClient = _db2.default.FilterClient;
var CreateUser = _db2.default.CreateUser;
var GetUser = _db2.default.GetUser;
var getOnlineUsers = _db2.default.getOnlineUsers;

router.use(_express2.default.json());

router.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    var now = new Date();
    var houre = now.getHours();
    var minuts = now.getMinutes();
    var second = now.getSeconds();
    console.log('\u0412\u0440\u0435\u043C\u044F: ' + houre + ':' + minuts + ':' + second + ' \u041C\u0435\u0442\u043E\u0434:' + req.method + ' \u0410\u0434\u0440\u0435\u0441: ' + req.path);
    next();
});
router.get('/users', function (req, res) {
    GetClients().then(function (respons) {
        res.json(respons);
    });
});

router.use((0, _expressJwt2.default)({ secret: process.env.SECRET_KEY }).unless({ path: ['/users', /\/user\/.*/, /\/search\/.*/, '/signin', '/signup', '/clients'] }));

router.get('/clients', function (req, res) {
    getOnlineUsers().then(function (respons) {
        res.json(respons);
    });
});

router.post('/signin', function (req, res) {
    Authorization(req.body.email).then(function (respons) {
        _bcrypt2.default.compare(req.body.password, respons.password).then(function (resp) {
            resp ? res.status(200).json(respons) : res.status(401).send();
        });
    });
});

router.post('/signup', function (req, res) {
    _bcrypt2.default.hash(req.body.password, saltRounds).then(function (hash) {
        req.body.avatar = _gravatar2.default.url(req.body.Email, { protocol: 'http', s: '100' });
        req.body.password = hash;
        req.body.online = false;
        req.body.role = 1;
        _jsonwebtoken2.default.sign({ role: req.body.role, email: req.body.email }, process.env.SECRET_KEY, function (err, token) {
            req.body.token = token;
            CreateUser(req.body).then(function (respons) {
                res.json(respons);
            });
        });
    });
});

router.get('/user/:id', function (req, res) {
    GetClient(req.params.id).then(function (respons) {
        res.json(respons);
    });
});

router.get('/search/:id', function (req, res) {
    FilterClient(req.params.id).then(function (respons) {
        res.json(respons);
    });
});

router.post('/edit/:id', function (req, res) {
    EditClient(req.params.id, req.body).then(function (respons) {
        editClient(respons);return respons;
    }).then(function (respons) {
        res.json(respons);
    });
});

router.post('/create', function (req, res) {
    CreateClient(req.body).then(function (respons) {
        createClient(respons);return respons;
    }).then(function (respons) {
        res.json(respons);
    });
});

router.get('/delete/:id', function (req, res) {
    if (req.user.role === 2) {
        DeleteClient(req.params.id).then(function (respons) {
            deleteClient(req.params.id);return respons;
        }).then(function (respons) {
            res.status(200).send();
        });
    } else {
        res.status(403).send();
    }
});

module.exports = router;