'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let morgan = require('morgan');

app.use(express.static(__dirname + '/../public'));
app.use(morgan('dev'));
app.use(bodyParser.json());


app.get('/artist', (req, res) => {
  res.send('Artists!');
});

app.listen('8000', () => console.log('Listening on port 8000'));
