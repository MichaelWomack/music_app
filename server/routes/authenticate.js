'use strict';

let mongoUtil = require('./../mongoUtil');
let bcrypt = require('bcrypt-nodejs');
let jwt = require('jsonwebtoken');
let secret = require('../config').secret;

module.exports = (app, express) => {
let router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello from the authenticate route!');
});

router.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let users = mongoUtil.users();
    console.log(email);
    console.log(password);

    users.find({email: email}).limit(1).next((err, doc) => {

        if (err) {
          console.log("There was a damn error");
          res.json({success: false, message: err});
        }
        if (doc) {
          if (bcrypt.compareSync(password, doc.password)) {
            let token = jwt.sign({
              email: email,
              password: password
            }, secret);
            console.log('Made it!');
            res.json({
              success: true,
              message: 'Successfully logged in!',
              token: token
            });

          }
          else {
            res.json({success: false, message: 'Incorrect password'});
          }
        }
        else {
          res.json({success: false, message: 'That email address was not found'});
        }
    });
});


router.post('/register', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let users = mongoUtil.users();

  users.find({email: email}).limit(1).next((err, doc) => {
    if (err) res.json({success: false, message: err});
    if (doc) res.json({success: false, message:`Email ${email} is already registered`});
    else {

      bcrypt.hash(password, null, null, (err, hash) => {
        if (err) res.json({success: false, message: err});

        users.insert({email: email, password: hash}, (err, result) => {
          if (err) res.json({success: false, message: err});
          res.json({success: true, message:`Successfully registered ${email}!`});
        });
      });
    }
  });
});

// app.use((req, res, next) => {
//   console.log("Used middleware !!!!");
//   let token = req.body.token || req.params.token || req.headers['x-access-token'];
//   if (token) {
//     jwt.verify(token, secret, (err, decoded) => {
//       if (err)
//         return res.status(403).send({
//             sucess: false,
//             message: 'Failed to authenticate token.'
//         });
//       else {
//         req.decoded = decoded;
//         next();
//       }
//     });
//   }
//   else {
//     return res.status(403).send({
//       sucess: false,
//       message: 'No token provided'
//     });
//   }
// });
//
//
// router.get('/me', (req, res) => {
//   res.send(req.decoded);
// });

return router;

}
