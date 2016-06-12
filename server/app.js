'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let morgan = require('morgan');
let mongoUtil = require('./mongoUtil');

mongoUtil.connect();

app.use(express.static(__dirname + '/../public'));
app.use(morgan('dev'));
app.use(bodyParser.json());

let usersRoute = require('./../routes/users');

app.use('/users', usersRoute);

app.listen('8000', () => console.log('Listening on port 8000'));
