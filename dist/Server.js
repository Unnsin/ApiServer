'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./db/index');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use('', _index2.default);

app.listen(process.env.SERVER_PORT, function () {
    console.log('Api Server listening on port ', process.env.SERVER_PORT);
});