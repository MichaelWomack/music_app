'use strict';

let mongoUtil = require('./../mongoUtil');
let bcrypt = require('bcrypt-nodejs');
let router = require('express').Router();

// Chain together some of these using router.route().post().get() etc...

router.get('/', (req, res) => {
    let users = mongoUtil.users();
    users.find({}).toArray((err, users) => {
      if (err) res.json({success: false, message: err});
      res.json(users);
    })
});


router.get('/:id', (req, res) => {
    let userId = req.params.id;
    let users = mongoUtil.users();

    if (mongoUtil.isValidObjectId(id)) {
      users.find({_id: mongoUtil.toObjectId(userId)}).limit(1).next((err, doc) => {
          if (err) res.json({success: false, message: err});
          res.json(doc);
      });
   }
   console.log(`Object Id ${userId} is invalid\n`);
   res.send(`Object Id ${userId} is invalid\n`);
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

router.delete('/:email', (req, res) => {
  let email = req.params.email;
  let users = mongoUtil.users();

  users.deleteOne({email: email}, (err, result) => {
    if (err) res.send(err);
    res.json(result);
  });
});



module.exports = router;
