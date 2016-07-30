'use strict';

let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let jwt = require('jsonwebtoken');
let mongoUtil = require('./mongoUtil');
let config = require('./config');
let secret = config.secret;

mongoUtil.connect();

app.use(express.static(__dirname + '/../public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST');
  res.setHeader('Access-Controll-Allow-Headers', 'X-Requested-With', 'content-type', 'Authorization');
  next();
});

let usersRoute = require('./routes/users')(app, express);
let loginRoute = require('./routes/authenticate')(app, express);
let artistsRoute = require('./routes/artists')(app, express);
// let authWare = require('./routes/auth');

app.use('/api/authenticate', loginRoute);


app.use('/api', (req, res, next) => {
  let token = req.body.token || req.params.token || req.headers['x-access-token'];
  console.log(token);
  console.log("In Middleware...")
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {

        return res.status(403).json({
            sucess: false,
            message: 'Failed to authenticate token.'
        });
        // console.log('Error verifying token.')
        // res.redirect('/');
      }
      else {
        console.log("Token Decoded fine...");
        req.decoded = decoded;
        next();
      }
    });
  }
  else {
    res.status(403).json({
      sucess: false,
      message: 'No token provided'
    });
    // console.log("Token not found");
    // res.redirect('/');


  }
});

app.use('/api/users', usersRoute);
app.use('/api/artists', artistsRoute);


app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

app.listen('8000', () => console.log('Listening on port 8000'));
