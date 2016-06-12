'use strict';

let mongoUtil = require('../server/mongoUtil');
let router = require('express').Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Hello Users Route!'
    });
});


router.get('/:id', (req, res) => {
    let userId = req.params.id;
    let users = mongoUtil.users();

    if (mongoUtil.isValidObjectId(id)) {
      users.findOne({_id: mongoUtil.toObjectId(userId)}, (err, doc) => {
          if (err) {
              res.sendStatus(400);
          }
          console.log(doc);
          res.send(doc);
      });
   }
   console.log(`Object Id ${userId} is invalid\n`);
   res.send(`Object Id ${userId} is invalid\n`);
});


router.post('/register', (req, res) => {
  let userName = req.body.userName;
  let password = req.body.password;
});



module.exports = router;
