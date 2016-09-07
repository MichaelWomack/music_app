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
app.use('/uploads', express.static(__dirname + '/../uploads'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST');
    res.setHeader('Access-Controll-Allow-Headers', 'X-Requested-With', 'content-type', 'Authorization');
    next();
});


const usersRoute = require('./routes/users')(app, express);
const loginRoute = require('./routes/authenticate')(app, express);
const artistsRoute = require('./routes/artists')(app, express);
const tracksRoute = require('./routes/tracks')(app, express);
const albumsRouter = require('./routes/albums')(app, express);

app.use('/api/authenticate', loginRoute);


app.use('/api', (req, res, next) => {
    let token = req.body.token || req.params.token || req.headers['x-access-token'];
    console.log(token);
    console.log("In Middleware...");
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {

                return res.status(403).json({
                    sucess: false,
                    message: 'Failed to authenticate token.'
                });

            } else {
                console.log("Token Decoded fine...");
                req.decoded = decoded;
                next();
            }
        });
        console.log('Email Param: ' + req.params.email);
    } else {
        res.status(403).json({
            sucess: false,
            message: 'No token provided'
        });
    }
});

app.use('/api/users', usersRoute);
app.use('/api/artists', artistsRoute);
app.use('/api/tracks', tracksRoute);
app.use('/api/albums', albumsRouter);


app.get('*', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
});

app.listen('8000', () => console.log('Listening on port 8000'));
